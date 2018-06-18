import { Component, OnInit, Input } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MenuItem } from '../models';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {
  @Input() appName: string;
  @Input() menuItems: MenuItem[];
  isSmallScreen: Observable<boolean>;
  menuMode: Observable<'side' | 'over'>;

  constructor(
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit() {
    this.isSmallScreen = this.breakpointObserver.observe('(max-width: 786px)').pipe(
      map((state: BreakpointState) => state.matches)
    );
    this.menuMode = this.isSmallScreen.pipe(
      map(matches => !matches ? 'side' : 'over')
    );
  }

}
