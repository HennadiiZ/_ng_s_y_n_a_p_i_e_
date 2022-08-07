import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChooseLibraryComponent } from './choose-library.component';

const routes: Routes = [{ path: '', component: ChooseLibraryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChooseLibraryRoutingModule { }
