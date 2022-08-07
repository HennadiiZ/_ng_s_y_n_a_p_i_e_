import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChooseLibraryRoutingModule } from './choose-library-routing.module';
import { ChooseLibraryComponent } from './choose-library.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ChooseLibraryComponent
  ],
  imports: [
    CommonModule,
    ChooseLibraryRoutingModule,
    SharedModule
  ]
})
export class ChooseLibraryModule { }
