import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, Event as NavigationEvent } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnDestroy {
  public showSideMenu = false;

  private subscription =  new Subscription();

  constructor(private router: Router) {
    this.subscription.add(
      this.router.events.subscribe((event: NavigationEvent) => {
        if (event instanceof NavigationEnd) {
          this.showSideMenu = !event.url.includes('auth');
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
