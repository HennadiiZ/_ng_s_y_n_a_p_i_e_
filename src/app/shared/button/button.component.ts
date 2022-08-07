import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() callback = () => { return; };
  @Input() disabled = false;
  @Input() loading = false;

  constructor() {}
}
