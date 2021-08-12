import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { ITask } from './shared/task'
import {AngularFireAuth, AngularFireAuthModule} from '@angular/fire/auth';
import {firebase, firebaseui, FirebaseUIModule} from 'firebaseui-angular';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  taskRef!: AngularFireList<any>;
  uid!: string;
  email!: any;
  taskCreated!: number | any;

  constructor(private db: AngularFireDatabase ,private auth: AngularFireAuth) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.uid = user.uid
        this.email = user.email
        this.taskCreated = 0
        console.log(this.taskCreated)
        console.log(this.uid)
        console.log(this.email)
        this.taskRef = db.list('/task/' + this.uid);
      } else {
        // User not logged in or has just logged out.
      }
    }) 
    console.log(this.uid)
    // this.taskRef = db.list(this.dbPath);
  }
  
  // private dbPath = '/task/'


  createTask(task: ITask): void {
    this.taskRef.push(task);
  }
  getTaskList(): AngularFireList<ITask> {
    return this.taskRef;
  }
}
