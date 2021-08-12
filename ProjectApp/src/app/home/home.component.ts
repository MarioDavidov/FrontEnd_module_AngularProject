import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { TaskService } from '../task.service';
import { AngularFireDatabase } from '@angular/fire/database';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {
  task: any
  uid!:string;
  constructor(public afAuth: AngularFireAuth,private taskService: TaskService,private db: AngularFireDatabase) {
    this.uid = taskService.uid
    db.list('/task/' + this.uid).valueChanges().subscribe(task=>{this.task=task})
  }

}
  
