import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from './state';
import { NotificationBannerEffects } from './notification-banner/effects';
import { SnackBarEffects } from './snackbar/effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('ui', reducers),
    EffectsModule.forFeature([NotificationBannerEffects, SnackBarEffects])
  ]
})
export class UiStateModule {}
