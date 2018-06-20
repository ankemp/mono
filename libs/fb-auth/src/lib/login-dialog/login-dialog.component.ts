import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'mono-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public providers: string[],
    private snackBar: MatSnackBar,
    private authApi: AuthService
  ) { }

  selectProvider(provider: string): void {
    this.authApi.oAuthLogin(provider).then(_ => {
      this.dialogRef.close();
    }).catch(error => {
      this.snackBar.open(error.message, '', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    });
  }

  ngOnInit() {
  }

}
