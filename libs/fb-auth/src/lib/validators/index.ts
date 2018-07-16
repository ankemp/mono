import { AbstractControl } from '@angular/forms';

import { switchMap, map, take, debounceTime } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

export class AuthValidators {
  static email(authApi: AuthService) {
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        debounceTime(300),
        switchMap(email => authApi.checkEmail(email)),
        take(1),
        map(providers => (providers.length ? { used: true } : null))
      );
    };
  }
}
