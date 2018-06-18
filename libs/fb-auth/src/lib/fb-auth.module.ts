import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material';

import { AuthOptions, AuthOptionsToken } from './config';
import { AuthActionsComponent } from './auth-actions/auth-actions.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule
  ],
  declarations: [AuthActionsComponent],
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
