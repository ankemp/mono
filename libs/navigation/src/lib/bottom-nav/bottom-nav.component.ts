import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Input,
  ChangeDetectorRef
} from '@angular/core';
import { ScrollDispatcher, CdkScrollable } from '@angular/cdk/scrolling';

import { Observable } from 'rxjs';
import {
  map,
  pairwise,
  startWith,
  distinctUntilChanged,
  tap
} from 'rxjs/operators';

import { WindowRef } from '../window-ref.service';
import { MenuItem } from '../../models';

@Component({
  selector: 'mono-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BottomNavComponent implements OnInit {
  @Input() menuItems: MenuItem[];
  private scrollEvent$: Observable<CdkScrollable | void>;
  private nativeWindow: Window;
  showNav$: Observable<boolean>;

  constructor(
    private ref: ChangeDetectorRef,
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
      distinctUntilChanged(),
      tap(_ => this.ref.detectChanges())
    );
  }
}
