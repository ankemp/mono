import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';

import {
  SNState,
  getSideNavMode,
  ToggleSideNav,
  getSideNavState
} from '@mono/ui-state';
import { MenuItem } from '../../models';

@Component({
  selector: 'mono-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  @Input() appName: string;
  @Input() menuItems: MenuItem[];
  @ViewChild('bottomNav') bottomNav: ElementRef<HTMLDivElement>;
  sidenavOpened$: Observable<boolean>;
  menuMode$: Observable<string>;

  constructor(private store: Store<SNState>) {
    this.menuMode$ = store.pipe(select(getSideNavMode));
    this.sidenavOpened$ = store.pipe(select(getSideNavState));
  }

  ngOnInit() {}

  toggleSidenav(): void {
    this.store.dispatch(new ToggleSideNav());
  }

  get bottomNavExists(): boolean {
    return this.bottomNav.nativeElement.childElementCount > 0;
  }
}
