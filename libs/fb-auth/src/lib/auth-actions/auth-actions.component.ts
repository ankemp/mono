import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'mono-auth-actions',
  templateUrl: './auth-actions.component.html',
  styleUrls: ['./auth-actions.component.css']
})
export class AuthActionsComponent implements OnInit {

  constructor(
    public authApi: AuthService,
  ) { }

  ngOnInit() {
  }

}
