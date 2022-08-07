import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {
  public resetPasswordForm!: FormGroup;

  private oobCode!: string;
  private subscriptions = new Subscription();

  constructor(
    private _authService: AuthService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.oobCode = this.route.snapshot.queryParams['oobCode'];
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
    this.subscriptions.add(this.resetPasswordForm.controls['password'].valueChanges.subscribe((passValue: string) => {
      this.resetPasswordForm.controls['confirmPassword'].setValidators([
        Validators.required,
        Validators.pattern(passValue)
      ]);
      this.resetPasswordForm.controls['confirmPassword'].updateValueAndValidity();
    }));
  }

  public get isAuthLoading(): boolean {
    return this._authService.isAuthLoading;
  }

  public getControl(controlName: string) {
    return this.resetPasswordForm.get(controlName) as FormControl;
  }

  public resetPassword(): void {
    this._authService.confirmNewPassword(this.oobCode, this.getControl('confirmPassword').value);
  }
}
