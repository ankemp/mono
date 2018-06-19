import { Component, OnInit, Input } from '@angular/core';
import { ScrollDispatcher, CdkScrollable } from '@angular/cdk/scrolling';

import { Observable } from 'rxjs';
import { map, pairwise } from 'rxjs/operators';
import { WindowRef } from '../window-ref.service';
import { MenuItem } from '../../models';

@Component({
  selector: 'mono-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss']
})
export class BottomNavComponent implements OnInit {
  @Input() menuItems: MenuItem[];
  private scrollEvent: Observable<CdkScrollable | void>;
  private nativeWindow: Window;
  pageYOffset: Observable<number>;
  showNav = true;

  constructor(
    private dispatcher: ScrollDispatcher,
    windowRef: WindowRef
  ) {
    this.scrollEvent = this.dispatcher.scrolled();
    this.nativeWindow = windowRef.nativeWindow;
  }

  ngOnInit() {
    this.pageYOffset = this.scrollEvent.pipe(map(_ => this.nativeWindow.pageYOffset));
    this.pageYOffset.pipe(pairwise()).subscribe(([newYOffset, oldYOffset]) => {
      this.showNav = (newYOffset >= oldYOffset);
    });
  }

}
