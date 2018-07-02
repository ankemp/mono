import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { Banner, NBState, DoBannerAction } from '@mono/ui-state';

@Component({
  selector: 'mono-notification-banner',
  templateUrl: './notification-banner.component.html',
  styleUrls: ['./notification-banner.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationBannerComponent {
  @Input() banner: Banner;

  constructor(
    private store: Store<NBState>
  ) { }

  doBannerAction(): void {
    this.store.dispatch(new DoBannerAction(this.banner));
  }

}
