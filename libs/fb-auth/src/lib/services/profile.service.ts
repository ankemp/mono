import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, of, empty } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private afs: AngularFirestore) {}

  lookupProfile(uid: string): Observable<{ [key: string]: any }> {
    return this.afs
      .doc<any>(`profiles/${uid}`)
      .valueChanges()
      .pipe(switchMap(profile => (!!profile ? empty() : of(profile))));
  }

  updateProfile(uid: string, profile): Promise<any> {
    return this.afs.doc<any>(`profiles/${uid}`).set(profile);
  }
}