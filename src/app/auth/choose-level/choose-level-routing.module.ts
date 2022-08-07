import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChooseLevelComponent } from './choose-level.component';

const routes: Routes = [{ path: '', component: ChooseLevelComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChooseLevelRoutingModule { }
