import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

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
    private snackBar: MatSnackBar,
    private authApi: AuthService
  ) { }

  selectProvider(provider: string): void {
    this.authApi.login(provider).then(_ => {
      this.dialogRef.close();
    }).catch(error => {
      this.snackBar.open(error.message, '', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    });
  }

}
