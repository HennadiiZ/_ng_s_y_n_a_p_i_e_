import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-email-action',
  templateUrl: './email-action.component.html'
})
export class EmailActionComponent implements OnInit {
  private oobCode!: string;
  private mode!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.oobCode = this.route.snapshot.queryParams['oobCode'];
    this.mode = this.route.snapshot.queryParams['mode'];

    if (this.mode === 'verifyEmail') {
      this.authService.confirmEmail(this.oobCode);
    } else if (this.mode === 'resetPassword') {
      this.router.navigate(['/auth/new-password/new-password'], { queryParams: { oobCode: this.oobCode }});
    }
  }
}
