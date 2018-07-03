import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatSnackBarModule
} from '@angular/material';
import { NgStringPipesModule } from 'ngx-pipes';

import { AuthOptions, AuthOptionsToken } from './config';
import { reducer } from './state/auth.reducer';
import { AuthEffects } from './state/auth.effects';

import { AuthActionsComponent } from './auth-actions/auth-actions.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';
import { UserDropdownComponent } from './user-dropdown/user-dropdown.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    StoreModule.forFeature('auth', reducer),
    EffectsModule.forFeature([AuthEffects]),
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSnackBarModule,
    NgStringPipesModule
  ],
  entryComponents: [LoginDialogComponent, RegisterDialogComponent],
  declarations: [AuthActionsComponent, LoginDialogComponent, RegisterDialogComponent, UserDropdownComponent],
  exports: [AuthActionsComponent]
})
export class FbAuthModule {
  static config(options: AuthOptions): ModuleWithProviders {
    return {
      ngModule: FbAuthModule,
      providers: [
        { provide: AuthOptionsToken, useValue: options }
      ]
    }
  }
}
