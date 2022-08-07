import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-login-with-button',
  templateUrl: './login-with-button.component.html',
  styleUrls: ['./login-with-button.component.scss']
})
export class LoginWithButtonComponent {
  @Input() isFB = true;
  @Input() disabled = false;
}
