import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ITask } from '../shared/task';
import { TaskService } from '../task.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {

  task!: ITask;
  
  constructor(private taskService: TaskService,private db: AngularFireDatabase){
  //   db.list('/task')
  //   .valueChanges()
  //   .subscribe(task =>{
  //     this.task = task;      
      
  //   })
  }

  ngOnInit(): void {
    this.task = new ITask();
  }

  taskHandler(form: NgForm): void{
    if (form.invalid) {return; }
    console.log(form)
  }


  create() {
      this.taskService.createTask(this.task);
  }
 

  reset(){
    this.task = new ITask();
  }

  onSubmit() {
    this.task.isDone = Boolean(false)
    this.create();
    this.reset();
  }

}
