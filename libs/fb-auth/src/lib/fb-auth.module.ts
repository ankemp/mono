import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDialogModule } from '@angular/material';
import { NgStringPipesModule } from 'ngx-pipes';

import { AuthOptions, AuthOptionsToken } from './config';
import { AuthActionsComponent } from './auth-actions/auth-actions.component';
import { OauthDialogComponent } from './oauth-dialog/oauth-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    NgStringPipesModule
  ],
  entryComponents: [OauthDialogComponent],
  declarations: [AuthActionsComponent, OauthDialogComponent],
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
