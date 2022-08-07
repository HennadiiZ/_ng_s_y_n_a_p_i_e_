import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { filter, mergeMap, Observable, of } from 'rxjs';

import { ExtendedUser } from '../models/extended-user.model';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      return this.authService._currentUser.pipe(
        filter((user) => user !== false),
        mergeMap((currentUser: ExtendedUser | null | false) => {
          if (!currentUser) {
            return of(true);
          }
          if (currentUser.emailVerified) {
            if (!currentUser.library) {
              if (state.url.includes('choose-library')) {
                return of(true);
              } else {
                this.router.navigateByUrl('auth/choose-library');
              }
            } else if (!currentUser.level) {
              if (state.url.includes('choose-level')) {
                return of(true);
              } else {
                this.router.navigateByUrl('auth/choose-level');
              }
            }
          }

          const isUserCompletedRegistration = currentUser.emailVerified
            && !!currentUser.library
            && !!currentUser.level;

          if (isUserCompletedRegistration) {
            this.router.navigateByUrl('');
            return of(false);
          }
          return of(false);
        })
      );
  }
}
