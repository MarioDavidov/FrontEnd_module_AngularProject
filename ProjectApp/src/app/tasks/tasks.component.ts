import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ITask } from '../shared/task';
import { TaskService } from '../task.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { HomeComponent } from '../home/home.component';
import { HeaderComponent } from '../header/header.component';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {

  task!: ITask;
  btn!: string
  get createdAtTime(): any{
    return this.header.time
    
  }
  
  constructor(private taskService: TaskService,private db: AngularFireDatabase, private header: HeaderComponent){
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
  
  onSubmit(form: NgForm):void {
    if(form.invalid){
      (<HTMLInputElement>document.getElementById("add-validator")).style.color = "red";
      (<HTMLInputElement>document.getElementById("add-validator")).style.display = "block";
      setTimeout(function(){
        (<HTMLInputElement>document.getElementById("add-validator")).style.display = "none";
      }, 900);
      
      return
    }
    
    //(<HTMLInputElement>document.getElementById("add-btn")).disabled = true;
    const time = JSON.stringify(this.createdAtTime)
    this.task.isDone = false
    this.task.key = ""
    this.task.createdAt = time.substring(1, 11)    
    
    this.create();
    form.resetForm()
    
    
  }
  
  
}
