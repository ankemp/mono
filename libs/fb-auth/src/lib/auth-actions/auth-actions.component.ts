import { Component } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';
import { takeUntil, skipWhile } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';
import { State } from '../state/auth.reducer';
import { getCurrentUser } from '../state';
import { Logout, GetUser } from '../state/auth.actions';
import { User } from '../../models';

@Component({
  selector: 'mono-auth-actions',
  templateUrl: './auth-actions.component.html',
  styleUrls: ['./auth-actions.component.css']
})
export class AuthActionsComponent {
  currentUser$: Observable<User>;

  constructor(
    private store: Store<State>,
    private authApi: AuthService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.currentUser$ = store.pipe(
      select(getCurrentUser),
      skipWhile(user => !user.uid)
    );
    this.store.dispatch(new GetUser());
  }

  private showToast(message: string): void {
    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
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
    this.currentUser$.pipe(
      skipWhile(user => !user && !user.uid),
      takeUntil(dialog.afterClosed())
    ).subscribe(user => {
      dialog.close();
      this.showToast(`Welcome back, ${user.displayName}!`);
    });
  }

  private openOAuthDialog(): void {
    const dialog = this.dialog.open(LoginDialogComponent, { data: this.oAuthProviders });
    this.closeDialog(dialog);
  }

  private openRegisterDialog(): void {
    const dialog = this.dialog.open(RegisterDialogComponent, { data: this.manualProviders });
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
