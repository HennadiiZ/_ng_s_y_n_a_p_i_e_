import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailActionComponent } from './email-action.component';

const routes: Routes = [{ path: 'email-action', component: EmailActionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailActionRoutingModule {}
