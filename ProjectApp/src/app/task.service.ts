import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, snapshotChanges } from '@angular/fire/database';
import { ITask } from './shared/task'
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { firebase, firebaseui, FirebaseUIModule } from 'firebaseui-angular';
import { IRate } from './shared/rating';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  taskRef!: AngularFireList<any>;
  histiryRef!: AngularFireList<any>;
  rateRef!: AngularFireList<any>;
  createdTasksRef!: AngularFireList<any>;
  completedTasksRef!: AngularFireList<any>;
  uid!: string;
  username!: string | any
  email!: string | any;
  key!: string | any; 
  revKey!: string | any; 
  taskCreatedLifeTime!: any
  
  
  constructor(private db: AngularFireDatabase, private auth: AngularFireAuth) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        var database = firebase.database()
        
        this.uid = user.uid
        this.email = user.email
        this.username = user.displayName
        if (this.username == "Den4o Ludiq")
          alert('NAI LUDIQ VLEZNA')


        this.taskRef = db.list('/task/' + this.uid);
        this.histiryRef = db.list(`/history/${this.uid}/secretKey`)
        this.rateRef = db.list(`/rate/`)
        
        //created task lifetime
        this.createdTasksRef =db.list(`/task/${this.uid}tasksCreated`)
        this.completedTasksRef =db.list(`/task/${this.uid}tasksCompleted`)
        
        
        
      } else {
        console.log('User Not Logged In!')
      }
    })
    
    
  }
  
  createTask(task: ITask): void {
    this.key = this.taskRef.push(task).key
    this.db.object(`/task/${this.uid}/${this.key}`).update({ 'key': this.key })
    this.histiryRef.push(task.title)

    //created task lifetime 
    this.db.object(`/task/${this.uid}`).update({ 'tasksCreated': firebase.database.ServerValue.increment(1) })
    //done tasks lifetime
    this.db.object(`/task/${this.uid}`).update({ 'tasksCompleted': firebase.database.ServerValue.increment(0) })
  }

  createRating(rate: IRate): void {
    this.revKey = this.rateRef.push(rate).key
    this.db.object(`/rate/${this.revKey}`).update({ 'key': this.revKey })
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
  deleteRate(key: string): Promise<void> {
    return this.rateRef.remove(key);
  }

}
