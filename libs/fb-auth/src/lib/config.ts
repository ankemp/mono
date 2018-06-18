import { InjectionToken } from '@angular/core';

export declare interface AuthOptions {
  [key: string]: any;
};

export const AuthOptionsToken = new InjectionToken<AuthOptions>('FirebaseConfig');
