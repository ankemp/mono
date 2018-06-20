import { Component, OnInit, Input } from '@angular/core';
import { ScrollDispatcher, CdkScrollable } from '@angular/cdk/scrolling';

import { Observable, of } from 'rxjs';
import { map, pairwise, startWith, distinctUntilChanged } from 'rxjs/operators';
import { WindowRef } from '../window-ref.service';
import { MenuItem } from '../../models';

@Component({
  selector: 'mono-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss']
})
export class BottomNavComponent implements OnInit {
  @Input() menuItems: MenuItem[];
  private scrollEvent$: Observable<CdkScrollable | void>;
  private nativeWindow: Window;
  showNav$: Observable<boolean>;

  constructor(
    private dispatcher: ScrollDispatcher,
    windowRef: WindowRef
  ) {
    this.scrollEvent$ = this.dispatcher.scrolled();
    this.nativeWindow = windowRef.nativeWindow;
  }

  ngOnInit() {
    this.showNav$ = this.scrollEvent$.pipe(
      map(_ => this.nativeWindow.pageYOffset),
      pairwise(),
      map(([newYOffset, oldYOffset]) => newYOffset >= oldYOffset),
      startWith(true),
      distinctUntilChanged()
    );
    this.showNav$.subscribe(console.log);
  }

}
