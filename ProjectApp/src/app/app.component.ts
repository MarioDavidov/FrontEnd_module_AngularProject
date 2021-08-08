import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
//import { ITheme } from './shared/interfaces';

//import { firebaseConf } from './app.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  
  constructor(public afAuth: AngularFireAuth) {
    
    
      //create(theme: ITheme): void{
        
      //}

  }
}
