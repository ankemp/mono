import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { OauthDialogComponent } from '../oauth-dialog/oauth-dialog.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'mono-auth-actions',
  templateUrl: './auth-actions.component.html',
  styleUrls: ['./auth-actions.component.css']
})
export class AuthActionsComponent implements OnInit {

  constructor(
    public authApi: AuthService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  private openOAuthDialog(): void {
    this.dialog.open(OauthDialogComponent, { data: this.authApi.providers });
  }

  login(): void {
    this.openOAuthDialog();
  }

  register(): void {
    this.openOAuthDialog();
  }

}
