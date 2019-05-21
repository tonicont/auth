import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class WorkgroupService {

  constructor(public db: AngularFirestore,
              public afAuth: AngularFireAuth
  ) { }

  getUserGroups(userId) {
    const userRef = firebase.firestore().collection('users').doc(userId).collection('workgroups');
    return userRef.get();
  }
}
