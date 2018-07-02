import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { Banner } from '@mono/ui-state';

@Component({
  selector: 'mono-notification-banner',
  templateUrl: './notification-banner.component.html',
  styleUrls: ['./notification-banner.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationBannerComponent implements OnInit {
  @Input() banner: Banner;

  constructor() { }

  ngOnInit() { }

}
