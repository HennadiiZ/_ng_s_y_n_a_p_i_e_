import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  public registrationForm!: FormGroup;

  private subscriptions = new Subscription();

  constructor(private _authService: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      agreeCheckbox: [false, Validators.requiredTrue]
    });
    this.subscriptions.add(this.registrationForm.controls['password'].valueChanges.subscribe((passValue: string) => {
      this.registrationForm.controls['confirmPassword'].setValidators([
        Validators.required,
        Validators.pattern(passValue)
      ]);
      this.registrationForm.controls['confirmPassword'].updateValueAndValidity();
    }));
  }

  public get isAuthLoading(): boolean {
    return this._authService.isAuthLoading;
  }

  public getControl(controlName: string) {
    return this.registrationForm.get(controlName) as FormControl;
  }

  public registerByEmail(): void {
    this._authService.signUpByEmailAndPassword(
      this.getControl('email').value,
      this.getControl('password').value,
      this.getControl('fullName').value
    );
  }

  public registerByFB(): void {
    this._authService.signInByFacebook();
  }

  public registerByGoogle(): void {

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
