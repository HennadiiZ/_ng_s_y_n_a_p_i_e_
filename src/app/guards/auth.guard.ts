import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { filter, Observable, of, switchMap } from 'rxjs';

import { ExtendedUser } from '../models/extended-user.model';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      return this.authService._currentUser.pipe(
        filter((user) => user !== false),
        switchMap((currentUser: ExtendedUser | null | false ) => {
          const isUserCompletedRegistration = !!currentUser
            && currentUser.emailVerified
            && !!currentUser.library
            && !!currentUser.level;

          if (!isUserCompletedRegistration) {
            this.router.navigateByUrl('auth/login');
          }
          return of(isUserCompletedRegistration);
        })
      );
  }
}
