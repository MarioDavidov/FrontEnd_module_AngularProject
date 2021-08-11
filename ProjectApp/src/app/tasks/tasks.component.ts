import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {

  constructor() { }

  ngOnInit(): void {
  } 

  taskHandler(form: NgForm): void{
    if (form.invalid) {return; }
    console.log(form)
  }

}
