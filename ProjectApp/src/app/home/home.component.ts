import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { TaskService } from '../task.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { ITask } from '../shared/task';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { firebase } from 'firebaseui-angular';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  //ENTRY DATE ANIMATION
  animations: [
    //metadates for animation
    trigger('itemAnim', [
      //transition -> from not existing in dom to any state
      transition('void=> *', [
        // list s metadannite za samata animaciq
        style({
          //initial state
          height: 0,
          opacity: 0,
          transform: 'scale(0.85)',
          'margin-bottom': 0,

          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight:0,
        }),
        //inicializirame  animaciq za otstoqniqta
        animate('200ms', style({
          height: '*',
          'margin-bottom' : '*',
          paddingTop: '*',
          paddingBottom: '*',
          paddingLeft: '*',
          paddingRight:'*', 
        })),
        //inicializirame samata animaciq
        animate(150)
      ]),

    ]),

  ],
  
})


export class HomeComponent  {
 
  task: any
  uid!:string;
  tasksCreated!:string | Array<any>
  tasksCompleted!:string | Array<any>

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
    db.list(`/task/${this.uid}`).valueChanges().subscribe(tasksCompleted=>{this.tasksCompleted=tasksCompleted})
    
    
  }

Done(event:any){
    let key = event.srcElement.parentElement.childNodes[2].innerText
    key = (key).replace(/\s/g, '')   
    this.db.object(`/task/${this.uid}/${key}`).update({'isDone': true})
    this.db.object(`/task/${this.uid}`).update({ 'tasksCompleted': firebase.database.ServerValue.increment(1) })   
  }
  NotDone(event: any) {
    let key = event.srcElement.parentElement.childNodes[2].innerText
    key = (key).replace(/\s/g, '')
    this.db.object(`/task/${this.uid}/${key}`).update({ 'isDone': false })
    this.db.object(`/task/${this.uid}`).update({ 'tasksCompleted': firebase.database.ServerValue.increment(-1) })
  }
  deleteTask(event: any) {
    let key = event.srcElement.previousSibling.innerText
    key = (key).replace(/\s/g, '')
    this.taskService.deleteTask(key)
  }
  
  resCreated(event: any){
    this.db.object(`/task/${this.uid}`).update({ 'tasksCreated': 0 })
  }
  resCompleted(event: any){
    this.db.object(`/task/${this.uid}`).update({ 'tasksCompleted': 0 })
  }
}

  