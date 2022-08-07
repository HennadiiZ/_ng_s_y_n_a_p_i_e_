import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChooseLevelRoutingModule } from './choose-level-routing.module';
import { ChooseLevelComponent } from './choose-level.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ChooseLevelComponent
  ],
  imports: [
    CommonModule,
    ChooseLevelRoutingModule,
    SharedModule
  ]
})
export class ChooseLevelModule { }
