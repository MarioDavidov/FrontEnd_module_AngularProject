import { Component, Input, OnInit , OnDestroy} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, RouterModule, Routes } from '@angular/router';
import { TaskService } from '../task.service';
import { ClockComponent } from 'src/app/clock/clock.component'
import { Subscription, timer } from "rxjs";
import { map, share } from "rxjs/operators";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
 
  get userEmail(): string{
    return this.taskService.email
  }
  get username(): string{
    return this.taskService.username
  }
  
  time = new Date();
  rxTime = new Date();
  intervalId!: any; 
  subscription!: Subscription;
 
  // time: any
  constructor(public afAuth: AngularFireAuth, private router: Router, private taskService: TaskService, private clock: ClockComponent) { 
    // this.time = clock.time
  }
  
  
  ngOnInit() {
    // Using Basic Interval
    this.intervalId = setInterval(() => {
      this.time = new Date();
    }, 1000);

    // Using RxJS Timer
    this.subscription = timer(0, 1000)
      .pipe(
        map(() => new Date()),
        share()
      )
      .subscribe(time => {
        this.rxTime = time;
      });
  }

  demoSection(){
    let el_to_toggle = document.getElementById("demo-togle")
    if (el_to_toggle!.style.display === "none") {
      el_to_toggle!.style.display = "block";
    } else {
      el_to_toggle!.style.display = "none";
    }
  }

  logout(){
    this.afAuth.signOut();
    this.router.navigate(['/landing']);
  }
  
  ngOnDestroy() {
    clearInterval(this.intervalId);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
