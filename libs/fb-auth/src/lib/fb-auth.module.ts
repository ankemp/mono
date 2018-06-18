import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthOptions, AuthOptionsToken } from './config';

@NgModule({
  imports: [
    CommonModule
  ]
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
