import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import { ButtonComponent } from './button/button.component';
import { InputComponent } from './input/input.component';
import { ShowIconComponent } from './show-icon/show-icon.component';
import { HideIconComponent } from './hide-icon/hide-icon.component';
import { OrDividerComponent } from './or-divider/or-divider.component';
import { LoginWithButtonComponent } from './login-with-button/login-with-button.component';
import { MatInputModule } from "@angular/material/input";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HomeIconComponent } from './side-menu-icons/home-icon.component';
import { GamesIconComponent } from './side-menu-icons/games-icon.component';
import { AnalyticsIconComponent } from './side-menu-icons/analytics-icon.component';
import { SettingsIconComponent } from './side-menu-icons/settings-icon.component';

@NgModule({
  declarations: [
    ButtonComponent,
    InputComponent,
    ShowIconComponent,
    HideIconComponent,
    OrDividerComponent,
    LoginWithButtonComponent,
    HomeIconComponent,
    GamesIconComponent,
    AnalyticsIconComponent,
    SettingsIconComponent
  ],
  imports: [
    CommonModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    ButtonComponent,
    InputComponent,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    OrDividerComponent,
    LoginWithButtonComponent,
    HomeIconComponent,
    GamesIconComponent,
    AnalyticsIconComponent,
    SettingsIconComponent
  ]
})
export class SharedModule {}
