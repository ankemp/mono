import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

import { Observable } from 'rxjs';
import { switchMap, map, distinctUntilChanged } from 'rxjs/operators';
import { SetSmallScreen } from './sidenav.actions';

@Injectable()
export class SideNavEffects {
  constructor(
    private breakpointObserver: BreakpointObserver,
    private actions$: Actions,
    private store: Store<any>
  ) {
    this.listenToBreakpointObserver();
  }

  private listenToBreakpointObserver(): void {
    this.breakpointObserver
      .observe('(max-width: 786px)')
      .pipe(
        map((state: BreakpointState) => state.matches),
        distinctUntilChanged()
      )
      .subscribe(isSmallScreen =>
        this.store.dispatch(new SetSmallScreen(isSmallScreen))
      );
  }
}
