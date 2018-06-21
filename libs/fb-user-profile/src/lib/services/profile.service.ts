import { Injectable } from '@angular/core';

import { firebase } from '@firebase/app';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from '@mono/fb-auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '@firebase/auth-types';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private afs: AngularFirestore,
    private authApi: AuthService
  ) { }

  lookupProfile(uid: string): Observable<any> {
    return this.afs.doc<any>(`profiles/${uid}`).valueChanges();
  }

}
