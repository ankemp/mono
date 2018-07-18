import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivationEnd } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import { Observable, empty } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

import { RouterActionTypes, RouterGo, RouterChange } from './router.actions';

@Injectable()
export class RouteEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location,
    private store: Store<any>
  ) {
    this.listenToRouter();
  }

  @Effect({ dispatch: false })
  navigate$ = this.actions$.pipe(
    ofType(RouterActionTypes.Go),
    map((action: RouterGo) => action.payload),
    tap(({ path, queryParams, extras }) =>
      this.router.navigate(path, { queryParams, ...extras })
    ),
    map(() => empty())
  );

  @Effect({ dispatch: false })
  navigateBack$: Observable<Action> = this.actions$.pipe(
    ofType(RouterActionTypes.Back),
    tap(() => this.location.back())
  );

  @Effect({ dispatch: false })
  navigateForward$: Observable<Action> = this.actions$.pipe(
    ofType(RouterActionTypes.Forward),
    tap(() => this.location.forward())
  );

  private listenToRouter() {
    this.router.events
      .pipe(filter(event => event instanceof ActivationEnd))
      .subscribe((event: ActivationEnd) =>
        this.store.dispatch(
          new RouterChange({
            params: { ...event.snapshot.params },
            path: event.snapshot.routeConfig.path
          })
        )
      );
  }
}
