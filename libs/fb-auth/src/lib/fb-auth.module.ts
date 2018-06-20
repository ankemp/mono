import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
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
import { AuthActionsComponent } from './auth-actions/auth-actions.component';
import { OauthDialogComponent } from './oauth-dialog/oauth-dialog.component';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';
import { UserDropdownComponent } from './user-dropdown/user-dropdown.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSnackBarModule,
    NgStringPipesModule
  ],
  entryComponents: [OauthDialogComponent, RegisterDialogComponent],
  declarations: [AuthActionsComponent, OauthDialogComponent, RegisterDialogComponent, UserDropdownComponent],
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
