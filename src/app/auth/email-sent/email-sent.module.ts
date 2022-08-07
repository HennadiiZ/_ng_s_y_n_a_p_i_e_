import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailSentRoutingModule } from './email-sent-routing.module';
import { EmailSentComponent } from './email-sent.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    EmailSentComponent
  ],
  imports: [
    CommonModule,
    EmailSentRoutingModule,
    SharedModule
  ]
})
export class EmailSentModule {}
