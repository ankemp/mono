import { Action } from '@ngrx/store';

import { OperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';

import { RouterActionTypes, RouterChange } from './router.actions';

export function ofRoute(
  route: string | string[]
): OperatorFunction<Action, Action> {
  return filter((action: Action) => {
    const isRouteAction = action.type === RouterActionTypes.Change;
    if (isRouteAction) {
      const routeAction = action as RouterChange;
      const routePath = routeAction.payload.path;
      if (Array.isArray(route)) {
        return route.includes(routePath);
      } else {
        return routePath === route;
      }
    }
    return isRouteAction;
  });
}
