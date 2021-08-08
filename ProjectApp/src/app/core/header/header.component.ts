import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, RouterModule, Routes } from '@angular/router';
import {firebase, firebaseui, FirebaseUIModule} from 'firebaseui-angular';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(public afAuth: AngularFireAuth, private router: Router) { }
  
  
  ngOnInit(): void {
  }
  

  logout(){
    this.afAuth.signOut();
    this.router.navigate(['/']);
  }
  
}
