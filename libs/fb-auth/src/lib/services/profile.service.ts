import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

import { Observable, of, from } from 'rxjs';
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
      .pipe(
        switchMap(profile => {
          if (!profile) {
            this.afs.doc(`profiles/${uid}`).set({ uid, public: false });
          }
          return of(profile);
        })
      );
  }

  updateProfile(uid: string, profile): Observable<void> {
    return from(
      this.afs
        .doc<any>(`profiles/${uid}`)
        .set(profile)
        .then(() => profile)
    );
  }
}
