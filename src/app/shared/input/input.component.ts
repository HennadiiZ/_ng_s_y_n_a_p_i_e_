import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() control: FormControl = new FormControl();
  @Input() inputType = 'text';
  @Input() label = '';
  @Input() placeholder = '';

  public showPass = false;

  constructor() {}

  public get errorKey() {
    return this.control && this.control.errors && Object.keys(this.control.errors)[0];
  }
}
