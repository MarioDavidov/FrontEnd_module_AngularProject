import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { TaskService } from '../task.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { ITask } from '../shared/task';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('itemAnim', [
      transition('void=> *', [
        style({
          height: 0,
          opacity: 0,
          transform: 'scale(0.85)',
          'margin-bottom': 0,

          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight:0,
        }),
        animate('80ms', style({
          height: '*',
          'margin-bottom' : '*',
          paddingTop: '*',
          paddingBottom: '*',
          paddingLeft: '*',
          paddingRight:'*', 
        })),
        animate(60)
      ]),

    ]),

  ],
  
})
export class HomeComponent  {
 
  task: any
  uid!:string;
  tasksCreated!:string | Array<any>

  get userEmail(): string{
    return this.taskService.email
  }
  get username(): string{
    return this.taskService.username
  }
  // taskCompleted: number = 0
  
  constructor(public afAuth: AngularFireAuth,private taskService: TaskService,private db: AngularFireDatabase) {
    this.uid = taskService.uid
    db.list('/task/' + this.uid).valueChanges().subscribe(task=>{this.task=task})
    db.list(`/task/${this.uid}`).valueChanges().subscribe(tasksCreated=>{this.tasksCreated=tasksCreated})
    
    
  }

Done(event:any){
    let key = event.srcElement.parentElement.childNodes[2].innerText
    key = (key).replace(/\s/g, '')   
    this.db.object(`/task/${this.uid}/${key}`).update({'isDone': true})
        
  }
  NotDone(event: any) {
    let key = event.srcElement.parentElement.childNodes[2].innerText
    key = (key).replace(/\s/g, '')
    this.db.object(`/task/${this.uid}/${key}`).update({ 'isDone': false })
  }
  deleteTask(event: any) {
    let key = event.srcElement.previousSibling.innerText
    key = (key).replace(/\s/g, '')
    this.taskService.deleteTask(key)
  }
}

  