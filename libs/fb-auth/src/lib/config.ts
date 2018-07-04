import { InjectionToken } from '@angular/core';

export declare interface AuthOptions {
  providers: string[];
  [key: string]: any;
}

export const AuthOptionsToken = new InjectionToken<AuthOptions>(
  'FirebaseConfig'
);
