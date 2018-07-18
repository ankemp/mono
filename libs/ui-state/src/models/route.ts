import { NavigationExtras } from '@angular/router';

export interface RouteGoModel {
  path: any[];
  queryParams?: object;
  extras?: NavigationExtras;
}

export interface RouteChangeModel {
  params: any;
  path: string;
}
