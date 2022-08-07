import { NgModule } from '@angular/core';
import { canActivate, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';

import { LoginGuard } from '../guards/login.guard';

const redirectLoggedIn = () => redirectLoggedInTo(['']);

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    canActivate: [LoginGuard],
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationModule),
    ...canActivate(redirectLoggedIn)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule),
    ...canActivate(redirectLoggedIn)
  },
  {
    path: 'new-password',
    loadChildren: () => import('./new-password/new-password.module').then(m => m.NewPasswordModule),
    ...canActivate(redirectLoggedIn)
  },
  {
    path: 'choose-library',
    loadChildren: () => import('./choose-library/choose-library.module').then(m => m.ChooseLibraryModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'choose-level',
    loadChildren: () => import('./choose-level/choose-level.module').then(m => m.ChooseLevelModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'email-sent',
    loadChildren: () => import('./email-sent/email-sent.module').then(m => m.EmailSentModule)
  },
  {
    path: 'email-action',
    loadChildren: () => import('./email-action/email-action.module').then(m => m.EmailActionModule)
  },
  { path: '**', pathMatch: 'full', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [LoginGuard]
})
export class AuthRoutingModule {}
