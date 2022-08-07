import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public email = new FormControl('', [Validators.required, Validators.email]);
  public password = new FormControl('', [Validators.required]);

  constructor(private _authService: AuthService) {}

  public get isInputsHasErrors(): boolean {
    return !!this.email?.errors || !!this.password?.errors;
  }

  public get isAuthLoading(): boolean {
    return this._authService.isAuthLoading;
  }

  public loginByEmail(): void {
    this._authService.loginByEmailAndPassword(this.email.value, this.password.value);
  }

  public loginByFB(): void {
    this._authService.signInByFacebook();
  }

  public loginByGoogle(): void {

  }
}
