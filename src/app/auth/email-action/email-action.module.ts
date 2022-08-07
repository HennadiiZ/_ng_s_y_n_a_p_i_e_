import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailActionRoutingModule } from './email-action-routing.module';
import { EmailActionComponent } from './email-action.component';

@NgModule({
  declarations: [
    EmailActionComponent
  ],
  imports: [
    CommonModule,
    EmailActionRoutingModule
  ]
})
export class EmailActionModule { }
