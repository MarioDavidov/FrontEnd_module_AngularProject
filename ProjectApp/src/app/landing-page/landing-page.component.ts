import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth) { }

  ngOnInit(): void {
  }

 

  add(event: any){
    console.log(event)
    let title = (<HTMLInputElement>document.getElementById("title"))?.value
    let task = (<HTMLInputElement>document.getElementById("task"))?.value
    let art_to_append = document.getElementById("article")

    let newArrt:any = e('article', "", "card")
    let p = e('p', `Title: ${title}`, "demo-input")
    let m = e('p', `Task: ${task}`, "demo-input")
    let dlt_btn = e("button", "Delete","demo-dlt-btn")
    let done_btn = e("button", "Done", "demo-dlt-btn")
   
    newArrt.appendChild(p)
    newArrt.appendChild(m)
    newArrt.appendChild(dlt_btn)
    newArrt.appendChild(done_btn)
    art_to_append!.appendChild(newArrt)
    dlt_btn.className = 'demo-dlt-btn'
    done_btn.classList.add('demo-dlt-btn') 
    dlt_btn.addEventListener('click', klikBuy)
    function klikBuy(event:any){                                           
        
        let del = event.target.parentNode
        del.remove()                
    }


    done_btn.addEventListener('click', klik)
    function klik(event:any){
      let del = (event.target.parentNode)
      del.remove()
      
      let art_to_append2 = document.getElementById("articleDone")
      let newArrt2:any = e('article', "", "card")
        let p = e('p', `Title: ${title}`, "demo-input")
        let m = e('p', `Task: ${task}`, "demo-input")
        let dlt_btn = e("button", "Delete","demo-dlt-btn")
       
        newArrt2.appendChild(p)
        newArrt2.appendChild(m)
        newArrt2.appendChild(dlt_btn)        
        art_to_append2!.appendChild(newArrt2)
        // .classList.add("demo-input")
        
        dlt_btn.addEventListener('click', klik)
        function klik(event:any){
          let del2 = (event.target.parentNode)
           del2.remove()
        }
    }
    function e(type:any, content:any, className:any){
      const result = document.createElement(type)
      result.textContent = content
      if(className){
          result.className = className
      }
      return result
  }
  }
}
