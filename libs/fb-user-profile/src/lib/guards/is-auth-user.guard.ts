import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map, skipWhile, withLatestFrom } from 'rxjs/operators';

import { AuthState, getCurrentUser, getIsAuthLoading } from '@mono/fb-auth';

@Injectable({
  providedIn: 'root'
})
export class IsAuthUserGuard implements CanActivate {
  constructor(private router: Router, private store: Store<AuthState>) {}

  canActivate(next: ActivatedRouteSnapshot): Observable<boolean> {
    const routeUid = next.params['uid'];
    const loading = this.store.pipe(select(getIsAuthLoading));
    return this.store.pipe(
      select(getCurrentUser),
      withLatestFrom(loading),
      skipWhile(([, isLoading]) => isLoading),
      map(([user]) => user),
      map(user => user.uid),
      map(uid => {
        if (uid === routeUid) {
          return true;
        }
        this.router.navigate(['profile', routeUid, 'public']);
        return false;
      })
    );
  }
}
