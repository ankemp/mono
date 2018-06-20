import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Observable } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';
import { User } from '@firebase/auth-types';

const MANUAL_PROVIDERS = ['email', 'phone'];

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

  get manualProviders(): string[] {
    return this.authApi.providers.filter(p => MANUAL_PROVIDERS.includes(p));
  }

  get oAuthProviders(): string[] {
    return this.authApi.providers.filter(p => !MANUAL_PROVIDERS.includes(p));
  }

  get showRegister(): boolean {
    return !!this.oAuthProviders.length;
  }

  private openOAuthDialog(): void {
    this.dialog.open(LoginDialogComponent, { data: this.oAuthProviders });
  }

  private openRegisterDialog(): void {
    this.dialog.open(RegisterDialogComponent, { data: this.manualProviders })
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
