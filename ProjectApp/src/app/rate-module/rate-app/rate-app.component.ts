import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { IRate } from 'src/app/shared/rating';
import { TaskService } from 'src/app/task.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-rate-app',
  templateUrl: './rate-app.component.html',
  styleUrls: ['./rate-app.component.css']
})
export class RateAppComponent implements OnInit {
  rate!: IRate;
  ratings!: any;
  uid!:string;
  PushKey!: string;
  
  constructor(private db: AngularFireDatabase, private taskService: TaskService) {
    this.uid = taskService.uid
    db.list('/rate/').valueChanges().subscribe(ratings=>{this.ratings=ratings})
    
    
    
   }
  
  ngOnInit(): void {
    this.rate = new IRate();
  }
  create() {
    this.taskService.createRating(this.rate);
    
  }
  Rate(form: NgForm):void {
    if(form.invalid){
      (<HTMLInputElement>document.getElementById("add-validator")).style.color = "red";
      (<HTMLInputElement>document.getElementById("add-validator")).style.display = "block";
      setTimeout(function(){
        (<HTMLInputElement>document.getElementById("add-validator")).style.display = "none";
      }, 900);
      
      return
    }    
    this.rate.userPushKey = this.taskService.uid
    this.rate.nameOfCreator = this.taskService.username
    this.rate.key = ""    
    this.rate.likes = 0
    this.rate.dislikes = 0
    this.create()
    form.resetForm()
  }


  deleteRev(event: any){       
    let keyToDel  = event.target.previousElementSibling.innerText                                        
    let userPushKey =  this.taskService.uid
    let key = event.target.previousSibling.previousSibling.innerText

     if (userPushKey == key){      
      keyToDel = (keyToDel).replace(/\s/g, '')
      this.taskService.deleteRate(keyToDel)
     }else{
       alert('ur not owner')
     }

  }
}
