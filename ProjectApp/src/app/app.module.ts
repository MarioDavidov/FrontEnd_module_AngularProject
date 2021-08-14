import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {firebase, firebaseui, FirebaseUIModule} from 'firebaseui-angular';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { TasksComponent } from './tasks/tasks.component';

import { ClockComponent } from './clock/clock.component';
import { HistoryComponent } from './history/history.component';


const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInSuccessUrl: 'tasks',
  signInOptions: [
    {
      requireDisplayName: false,
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID
    },
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,    
  ],
  tosUrl: '<your-tos-url>',
  //privacyPolicyUrl: '<your-privacyPolicyUrl-link>',
  credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO
  
};



@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    TasksComponent,
    
    ClockComponent,
          HistoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CoreModule,    
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    AngularFireDatabaseModule,
    AppRoutingModule,
    
  ],exports:[
    TasksComponent,
    ClockComponent
  ],
  providers: [TasksComponent, ClockComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
