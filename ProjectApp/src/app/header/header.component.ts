import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, RouterModule, Routes } from '@angular/router';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 
  get userEmail(): string{
    return this.taskService.email
  }
  
  constructor(public afAuth: AngularFireAuth, private router: Router, private taskService: TaskService) { 
  
  }
  
  
  ngOnInit(): void {
  }
  

  logout(){
    this.afAuth.signOut();
    this.router.navigate(['/landing']);
  }
  
}
