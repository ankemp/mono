import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'mono-oauth-dialog',
  templateUrl: './oauth-dialog.component.html',
  styleUrls: ['./oauth-dialog.component.css']
})
export class OauthDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<OauthDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public providers: string[],
    private authApi: AuthService
  ) { }

  selectProvider(provider: string): void {
    this.authApi.login(provider);
  }

}
