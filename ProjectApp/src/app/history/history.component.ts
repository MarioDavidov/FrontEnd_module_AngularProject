import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { TaskService } from '../task.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  taskTitles: any
  uid!:string;

  constructor(public afAuth: AngularFireAuth,private taskService: TaskService,private db: AngularFireDatabase) {
    this.uid = taskService.uid
    db.list(`/history/${this.uid}/secretKey`).valueChanges().subscribe(taskTitles=>{this.taskTitles=taskTitles})
  }

  ngOnInit(): void {
  }

  ClearHistory(event: any) {
    this.db.object(`/history/${this.uid}/secretKey`).set("No task to show") 
        
  }
}
