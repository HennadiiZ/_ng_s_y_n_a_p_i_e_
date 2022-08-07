import { Injectable } from '@angular/core';
import {
  Auth,
  applyActionCode,
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
  user,
  signInWithPopup,
  FacebookAuthProvider
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { sendEmailVerification, User, UserCredential } from '@firebase/auth';
import { BehaviorSubject } from 'rxjs';

import { confirmationSentMessage, notRecievedMessage, resetPassSentMessage } from '../constants/success-messages.constant';
import { mapFirebaseError } from '../helpers/map-firebase-error.helper';
import { ExtendedUser } from '../models/extended-user.model';
import { FirestoreService } from './firestore.service';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuthLoading = false;
  public _currentUser = new BehaviorSubject<ExtendedUser | null | false>(false);
  public providerFB = new FacebookAuthProvider();

  constructor(
    private auth: Auth,
    private fs: FirestoreService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {
    user(this.auth).subscribe(
      (authUser: User | null) => {
        if (authUser) {
          this.fs.getUserData(authUser.uid)
            .then((userData) => this._currentUser.next({ ...authUser, ...userData }));
        } else {
          this._currentUser.next(null);
        }
      }
    );
  }

  public loginByEmailAndPassword(email: string, password: string): void {
    this.isAuthLoading = true;
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential: UserCredential) => {
        this.fs.getUserData(userCredential.user.uid)
          .then((userData) => {
            this._currentUser.next({ ...userCredential.user, ...userData });
            this.isAuthLoading = false;
            if (!userCredential.user.emailVerified) {
              this.router.navigate(['auth/email-sent'], { state: { message: notRecievedMessage } });
            } else if (!userData?.['library']) {
              this.router.navigateByUrl('auth/choose-library');
            } else if (!userData?.['level']) {
              this.router.navigateByUrl('auth/choose-level');
            } else {
              this.router.navigateByUrl('');
            }
          });
      })
      .catch((err: any) => this.errorHandler(err));
  }

  public signUpByEmailAndPassword(email: string, password: string, displayName: string): void {
    this.isAuthLoading = true;
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential: UserCredential) => {
        const userData = userCredential?.user;
        if (userData) {
          this.fs.setUserData(userData.uid, { library: null, level: null })
            .then(() => {
              this.sendEmailVerification(userData)
                .then(() => {
                  this.isAuthLoading = false;
                  this.router.navigate(['auth/email-sent'], { state: { message: confirmationSentMessage } });
                });
              updateProfile(userCredential.user, { displayName });
              this.auth.signOut();
            });
        }
      })
      .catch((err: any) => this.errorHandler(err));
  }

  public resetPassword(email: string): void {
    this.isAuthLoading = true;
    sendPasswordResetEmail(this.auth, email)
      .then(() => {
        this.isAuthLoading = false;
        this.router.navigate(['auth/email-sent'], { state: { message: resetPassSentMessage } });
      })
      .catch((err: any) => this.errorHandler(err));
  }

  public confirmEmail(code: string): void {
    applyActionCode(this.auth, code)
      .then(() => {
        this.router.navigateByUrl('auth/login');
        this.snackbarService.showSuccess('Email verified!');
      })
      .catch((err: any) => this.errorHandler(err));
  }

  public confirmNewPassword(code: string, newPassword: string): void {
    this.isAuthLoading = true;
    confirmPasswordReset(this.auth, code, newPassword)
      .then(() => {
        this.isAuthLoading = false;
        this.router.navigateByUrl('auth/login');
        this.snackbarService.showSuccess('Password changed!');
      })
      .catch((err: any) => this.errorHandler(err));
  }

  public updateUserData(data: { [key: string]: any }): void {
    if (this._currentUser.value) {
      const updatedUser = { ...this._currentUser.value, ...data };

      this._currentUser.next(updatedUser);
    }
  }

  public logOut(): void {
    this.auth.signOut().then(() => {
      this._currentUser.next(null);
      this.router.navigateByUrl('auth/login');
    });
  }

  public errorHandler(err: any): void {
    this.snackbarService.showError(mapFirebaseError(err.code.split('/')[1]));
    this.isAuthLoading = false;
  }

  public signInByFacebook(): void {

  }

  public sendEmailVerification(userData?: any) {
    const user = userData || this.auth.currentUser;
    return sendEmailVerification(user);
  }
}


