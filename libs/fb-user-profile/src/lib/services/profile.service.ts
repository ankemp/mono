import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from '@mono/fb-auth';
import { Observable, of, empty } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private afs: AngularFirestore,
    private authApi: AuthService
  ) { }

  lookupProfile(uid: string): Observable<any> {
    return this.afs.doc<any>(`profiles/${uid}`).valueChanges().pipe(
      switchMap(profile => !!profile ? empty() : of(profile))
    )
  }

}
