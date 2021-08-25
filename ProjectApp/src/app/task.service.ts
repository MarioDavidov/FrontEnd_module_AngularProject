import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, snapshotChanges } from '@angular/fire/database';
import { ITask } from './shared/task'
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { firebase, firebaseui, FirebaseUIModule } from 'firebaseui-angular';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  taskRef!: AngularFireList<any>;
  histiryRef!: AngularFireList<any>;
  createdTasksRef!: AngularFireList<any>;
  uid!: string;
  username!: string | any
  email!: string | any;
  key!: string | any; 
  taskCreatedLifeTime!: any
  
  
  constructor(private db: AngularFireDatabase, private auth: AngularFireAuth) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        var database = firebase.database()
        
        this.uid = user.uid
        this.email = user.email
        this.username = user.displayName
        

        this.taskRef = db.list('/task/' + this.uid);
        this.histiryRef = db.list(`/history/${this.uid}/secretKey`)
        
        //created task lifetime logic atleast i try
        this.createdTasksRef =db.list(`/task/${this.uid}tasksCreated`)
        
        
        
      } else {
        console.log('User Not Logged In!')
      }
    })
    
    
  }
  
  createTask(task: ITask): void {
    this.key = this.taskRef.push(task).key
    this.db.object(`/task/${this.uid}/${this.key}`).update({ 'key': this.key })
    this.histiryRef.push(task.title)

    //created task lifetime logic atleast i try 
    this.db.object(`/task/${this.uid}`).update({ 'tasksCreated': firebase.database.ServerValue.increment(1) })
    
  }
  getTaskList(): AngularFireList<ITask> {
    return this.taskRef;
  }
  updateIsDone(key: string, value: any): Promise<void> {
    return this.taskRef.update(key, value)
  }
  deleteTask(key: string): Promise<void> {
    return this.taskRef.remove(key);
  }

}
