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
  key!: string | any;

  constructor(private db: AngularFireDatabase ,private auth: AngularFireAuth) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        
        this.uid = user.uid
        this.email = user.email      
        
        console.log(this.uid)
        console.log(this.email)
        this.taskRef = db.list('/task/' + this.uid);
        this.db.object('/task/' + this.uid).update({'taskCreated': 0})
        this.db.object('/task/' + this.uid).update({'completed': 0})
      } else {
        // User not logged in or has just logged out.
      }
    }) 
    
    // this.taskRef = db.list(this.dbPath);
  }
  
  // private dbPath = '/task/'


  createTask(task: ITask): void {    
    //console.log(this.taskRef.push(task).key)
    this.key = this.taskRef.push(task).key
    //let id = JSON.stringify(this.key)
     let dbtest = firebase.database().ref('task/'+this.uid)
     dbtest.on("child_added", snap =>{
       console.log(snap.key)
      })
      this.db.object(`/task/${this.uid}/${this.key}`).update({'key': this.key})
    //console.log(firebase.database().ref('task/' + this.uid).once("child_added"))
    //this.key = JSON.stringify(this.key = this.taskRef.push(task).key)
    //this.db.object(`/task/${this.uid}/${this.key}`).update({'key': this.key})
       
  }
  getTaskList(): AngularFireList<ITask> {
    return this.taskRef;
  }
  updateIsDone(key: string, value: any): Promise<void>{    
    return this.taskRef.update(key, value)
  }
   deleteTask(key: string): Promise<void> {
     return this.taskRef.remove(key);
  }
  
}
