import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule } from '@angular/material';

import { BannerContainerComponent } from './banner-container/banner-container.component';
import { NotificationBannerComponent } from './notification-banner/notification-banner.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule
  ],
  declarations: [BannerContainerComponent, NotificationBannerComponent],
  exports: [BannerContainerComponent]
})
export class NotificationBannerModule { }
