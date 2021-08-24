import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userLoggedIn: boolean;     

  constructor(private router: Router, private afAuth: AngularFireAuth, private afs: AngularFirestore) {
      this.userLoggedIn = false;

      this.afAuth.onAuthStateChanged((user) => {             
          if (user) {
              this.userLoggedIn = true;
          } else {
              this.userLoggedIn = false;
          }
      });
  }

}