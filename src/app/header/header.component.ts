import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, Event as NavigationEvent } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public isAuth!: boolean;
  public showUser!: string;

  private subscription =  new Subscription();

  constructor(private _authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.subscription.add(
      this._authService._currentUser.subscribe((user) => {
        if (user && user.emailVerified) {
          this.showUser = user.displayName || '';
        } else {
          this.showUser = '';
        }
      })
    );
    this.subscription.add(
      this.router.events.subscribe((event: NavigationEvent) => {
        if (event instanceof NavigationEnd) {
          this.isAuth = event.url.includes('auth');
        }
      })
    );
  }

  public logOut(): void {
    this._authService.logOut();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
