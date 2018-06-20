import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Observable } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { OauthDialogComponent } from '../oauth-dialog/oauth-dialog.component';
import { User } from '@firebase/auth-types';

@Component({
  selector: 'mono-auth-actions',
  templateUrl: './auth-actions.component.html',
  styleUrls: ['./auth-actions.component.css']
})
export class AuthActionsComponent {
  currentUser$: Observable<User>;

  constructor(
    private authApi: AuthService,
    private dialog: MatDialog
  ) {
    this.currentUser$ = authApi.authState.pipe(
      skipWhile((state: User) => state === null)
    );
  }

  get showRegister(): boolean {
    return !!this.authApi.providers.filter(p => ['email', 'phone', 'anonymous'].indexOf(p) > -1).length
  }

  private openOAuthDialog(): void {
    this.dialog.open(OauthDialogComponent, { data: this.authApi.providers });
  }

  private openRegisterDialog(): void {
    //
  }

  login(): void {
    this.openOAuthDialog();
  }

  register(): void {
    this.openRegisterDialog();
  }

  logout(): void {
    this.authApi.logout();
  }

}
