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
  //taskCreatedByuser!: number
  taskCreatedLifeTime: number = 0


  constructor(private db: AngularFireDatabase ,private auth: AngularFireAuth) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        //this.taskCreatedByuser = 0
        this.uid = user.uid
        this.email = user.email      
        
        console.log(this.uid)
        console.log(this.email)
        this.taskRef = db.list('/task/' + this.uid);
       
        
      } else {
        // User not logged in or has just logged out.
      }
    }) 
    
    // this.taskRef = db.list(this.dbPath);
  }
  
  // private dbPath = '/task/'


  createTask(task: ITask): void {
    if (this.taskCreatedLifeTime == 0){
        this.db.object('/task/' + this.uid).update({'taskCreated': 0})
        this.taskCreatedLifeTime +=1
    }else{
      this.taskCreatedLifeTime +=1
    }
    this.key = this.taskRef.push(task).key      
    this.db.object(`/task/${this.uid}/${this.key}`).update({'key': this.key})
    this.db.object(`/task/${this.uid}`).update({'taskCreated': this.taskCreatedLifeTime})
      
       
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
