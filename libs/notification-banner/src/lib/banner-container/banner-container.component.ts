import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';
import { Banner, NBState, getTopBanner } from '@mono/ui-state';

@Component({
  selector: 'mono-banner-container',
  templateUrl: './banner-container.component.html',
  styleUrls: ['./banner-container.component.css']
})
export class BannerContainerComponent implements OnInit {
  banner$: Observable<Banner>;

  constructor(store: Store<NBState>) {
    this.banner$ = store.pipe(select(getTopBanner));
  }

  ngOnInit() {
  }

}
