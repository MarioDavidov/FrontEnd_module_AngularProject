import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, RouterModule, Routes } from '@angular/router';
import { TaskService } from '../task.service';
import { ClockComponent } from 'src/app/clock/clock.component'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 
  get userEmail(): string{
    return this.taskService.email
  }
  time: any
  constructor(public afAuth: AngularFireAuth, private router: Router, private taskService: TaskService, private clock: ClockComponent) { 
    this.time = clock.rxTime
  }
  
  
  ngOnInit(): void {
  }
  demoSection(){
    let el_to_togle = document.getElementById("demo-togle")
    if (el_to_togle!.style.display === "none") {
      el_to_togle!.style.display = "block";
    } else {
      el_to_togle!.style.display = "none";
    }
  }

  logout(){
    this.afAuth.signOut();
    this.router.navigate(['/landing']);
  }
  
}
