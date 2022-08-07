import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-email-sent',
  templateUrl: './email-sent.component.html',
  styleUrls: ['./email-sent.component.scss']
})
export class EmailSentComponent {
  @Input() text = '';

  constructor(private _authService: AuthService, private router: Router) {
    this.text = this.router.getCurrentNavigation()?.extras?.state?.['message'] || '';
  }

  resendVerification() {
    this._authService.sendEmailVerification();
  }
}
