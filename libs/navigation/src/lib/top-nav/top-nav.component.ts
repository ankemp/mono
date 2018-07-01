import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { MenuItem } from '../../models';
import { SNState, getSideNavMode, ToggleSideNav, getSideNavState, SetSmallScreen } from '@mono/ui-state';

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

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<SNState>
  ) {
    this.menuMode$ = store.pipe(select(getSideNavMode));
    this.sidenavOpened$ = store.pipe(select(getSideNavState));
  }

  ngOnInit() {
    this.breakpointObserver.observe('(max-width: 786px)').pipe(
      map((state: BreakpointState) => state.matches),
      distinctUntilChanged()
    ).subscribe(isSmallScreen => this.store.dispatch(new SetSmallScreen(isSmallScreen)))
  }

  toggleSidenav(): void {
    this.store.dispatch(new ToggleSideNav);
  }

  get bottomNavExists(): boolean {
    return this.bottomNav.nativeElement.childElementCount > 0;
  }

}
