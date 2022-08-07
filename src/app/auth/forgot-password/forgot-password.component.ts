import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  public email = new FormControl('', [Validators.required, Validators.email]);

  constructor(private _authService: AuthService) {}

  public get isAuthLoading(): boolean {
    return this._authService.isAuthLoading;
  }

  public resetPassword(): void {
    this._authService.resetPassword(this.email.value);
  }
}
