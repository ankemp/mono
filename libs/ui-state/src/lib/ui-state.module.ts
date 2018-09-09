import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from './state';
import { NotificationBannerEffects } from './notification-banner/notification-banner.effects';
import { SnackBarEffects } from './snackbar/snackbar.effects';
import { RouteEffects } from './router/router.effects';
import { SideNavEffects } from './sidenav/sidenav.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('ui', reducers),
    EffectsModule.forFeature([
      NotificationBannerEffects,
      SnackBarEffects,
      RouteEffects,
      SideNavEffects
    ])
  ]
})
export class UiStateModule {}
