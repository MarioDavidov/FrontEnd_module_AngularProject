import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { TaskService } from '../task.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { ITask } from '../shared/task';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('itemAnim', [
      transition('void => *', [
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
        transition('* => void', [
          animate(50, style({
            transform: 'scale(1.05)'
          })),
          animate(50, style({
            transform: 'scale(1)',
            opacity: 0.75
          })),
          animate('120ms ease-out', style({
            transform: 'scale(0.68)',
            opacity: 0,
          })),
          animate('150ms ease-out', style({
            
            height: 0,          
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 0,
            paddingRight:0,
            'margin-bottom' : '0',
          }))
        ])
    ]),
    
  ]
})
export class HomeComponent  {
 
  task: any
  uid!:string;
  // taskCompleted: number = 0
  
  constructor(public afAuth: AngularFireAuth,private taskService: TaskService,private db: AngularFireDatabase) {
    this.uid = taskService.uid
    db.list('/task/' + this.uid).valueChanges().subscribe(task=>{this.task=task})
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

  