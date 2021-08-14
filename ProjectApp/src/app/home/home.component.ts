import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { TaskService } from '../task.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { ITask } from '../shared/task';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {
 
  task: any
  uid!:string;
  taskCompleted: number = 0
  
  constructor(public afAuth: AngularFireAuth,private taskService: TaskService,private db: AngularFireDatabase) {
    this.uid = taskService.uid
    db.list('/task/' + this.uid).valueChanges().subscribe(task=>{this.task=task})
  }

Done(event:any){
  console.log(event)  
  if (this.taskCompleted == 0){
      this.db.object('/task/' + this.uid).update({'taskCompleted': 0})
      this.taskCompleted +=1
  }else{
      this.taskCompleted +=1
  }
    let key = event.srcElement.parentElement.childNodes[2].innerText
    key = (key).replace(/\s/g, '')   
    this.db.object(`/task/${this.uid}/${key}`).update({'isDone': true})
    this.db.object(`/task/${this.uid}`).update({'taskCompleted': this.taskCompleted})
}
NotDone(event:any){
  let key = event.srcElement.parentElement.childNodes[2].innerText
  key = (key).replace(/\s/g, '')   
  this.db.object(`/task/${this.uid}/${key}`).update({'isDone': false})
}
  deleteTask(event:any){
     let key = event.srcElement.previousSibling.innerText
     key = (key).replace(/\s/g, '')    
    this.taskService.deleteTask(key)  
    }    
}

  