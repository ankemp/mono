import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { OauthDialogComponent } from '../oauth-dialog/oauth-dialog.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'mono-auth-actions',
  templateUrl: './auth-actions.component.html',
  styleUrls: ['./auth-actions.component.css']
})
export class AuthActionsComponent {

  constructor(
    public authApi: AuthService,
    private dialog: MatDialog
  ) { }

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

}
