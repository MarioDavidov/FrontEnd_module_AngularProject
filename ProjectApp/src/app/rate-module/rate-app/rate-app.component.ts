import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { IRate } from 'src/app/shared/rating';
import { TaskService } from 'src/app/task.service';

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
  Rate(event:any){    
    this.rate.userPushKey = this.taskService.uid
    this.rate.nameOfCreator = this.taskService.username
    this.rate.key = ""    
    this.rate.likes = 0
    this.rate.dislikes = 0
    
    this.create()
  }


  deleteRev(){   
    console.log('works')                                        
    let userPushKey =  this.taskService.uid
    let key = (<HTMLInputElement>document.getElementById("userPKey")).innerText;
    console.log(key)
     if (userPushKey == key){
       
     }else{
       
     }

  }
}
