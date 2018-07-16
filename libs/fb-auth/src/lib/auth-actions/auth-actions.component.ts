import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';
import { takeUntil, skipWhile } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { AuthState, getCurrentUser, Logout, GetUser } from '../state';
import { User } from '../../models';

import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';

@Component({
  selector: 'mono-auth-actions',
  templateUrl: './auth-actions.component.html',
  styleUrls: ['./auth-actions.component.css']
})
export class AuthActionsComponent {
  currentUser$: Observable<User>;

  constructor(
    private store: Store<AuthState>,
    private authApi: AuthService,
    private dialog: MatDialog
  ) {
    this.currentUser$ = store.pipe(
      select(getCurrentUser),
      skipWhile(user => !user.uid)
    );
    this.store.dispatch(new GetUser());
  }

  get manualProviders(): string[] {
    return this.authApi.manualProviders;
  }

  get oAuthProviders(): string[] {
    return this.authApi.oAuthProviders;
  }

  get showRegister(): boolean {
    return !!this.oAuthProviders.length;
  }

  private closeDialog(dialog): void {
    this.currentUser$
      .pipe(
        skipWhile(user => !user && !user.uid),
        takeUntil(dialog.afterClosed())
      )
      .subscribe(user => {
        dialog.close();
      });
  }

  private openOAuthDialog(): void {
    const dialog = this.dialog.open(LoginDialogComponent, {
      data: this.oAuthProviders
    });
    this.closeDialog(dialog);
  }

  private openRegisterDialog(): void {
    const dialog = this.dialog.open(RegisterDialogComponent, {
      data: this.manualProviders
    });
    this.closeDialog(dialog);
  }

  login(): void {
    this.openOAuthDialog();
  }

  register(): void {
    this.openRegisterDialog();
  }

  logout(): void {
    this.store.dispatch(new Logout());
  }
}
