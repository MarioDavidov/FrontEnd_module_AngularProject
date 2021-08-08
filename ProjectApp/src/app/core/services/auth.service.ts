// import { Injectable } from '@angular/core';

// import { AngularFireAuth } from '@angular/fire/auth';
// import { Router } from '@angular/router';

// @Injectable({
//     providedIn: 'root'
// })
// export class AuthService {

//     userLoggedIn: boolean;      // other components can check on this variable for the login status of the user

//     constructor(private router: Router, private afAuth: AngularFireAuth) {
//         this.userLoggedIn = false;

//         this.afAuth.onAuthStateChanged((user) => {              // set up a subscription to always know the login status of the user
//             if (user) {
//                 this.userLoggedIn = true;
//             } else {
//                 this.userLoggedIn = false;
//             }
//         });
//     }

//     loginUser(email: string, password: string): Promise<any> {
//         return this.afAuth.signInWithEmailAndPassword(email, password)
//             .then(() => {
//                 console.log('Auth Service: loginUser: success');
//                 this.router.navigate(['/home']);
//             })

//     }

//     signupUser(user: any): Promise<any> {
//         return this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
//             .then((result) => {
//                 let emailLower = user.email.toLowerCase();
//                 result.user!.sendEmailVerification();                    // immediately send the user a verification email
//             })

//     }
// }
