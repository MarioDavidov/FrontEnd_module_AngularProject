import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { ITask } from './shared/task'
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { firebase, firebaseui, FirebaseUIModule } from 'firebaseui-angular';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  taskRef!: AngularFireList<any>;
  histiryRef!: AngularFireList<any>;
  uid!: string;
  email!: any;
  key!: string | any;
  // taskCreatedLifeTime: number = 0


  constructor(private db: AngularFireDatabase, private auth: AngularFireAuth) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {

        this.uid = user.uid
        this.email = user.email

        this.taskRef = db.list('/task/' + this.uid);
        this.histiryRef = db.list(`/history/${this.uid}/secretKey`)

      } else {
        console.log('User Not Logged In!')
      }
    })


  }

  createTask(task: ITask): void {
    this.key = this.taskRef.push(task).key
    this.db.object(`/task/${this.uid}/${this.key}`).update({ 'key': this.key })
    this.histiryRef.push(task.title)
    

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
