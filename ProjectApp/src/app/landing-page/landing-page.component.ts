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

    let newArrt:any = e('article', "", "")
    let p = e('p', `${title}`, `${task}`)
    let m = e('p', `${task}`, `${task}`)
    let dlt_btn = e("button", "Delete","")
    let done_btn = e("button", "Done", "")  
    newArrt.appendChild(p)
    newArrt.appendChild(m)
    newArrt.appendChild(dlt_btn)
    newArrt.appendChild(done_btn)
    art_to_append!.appendChild(newArrt)

    dlt_btn.addEventListener('click', klikBuy)
    function klikBuy(event:any){                                               
        console.log(event)
        let del = event.target.parentNode
        del.remove()                
    }
    done_btn.addEventListener('click', klik)
    function klik(event:any){
      let art_to_append2 = document.getElementById("articleDone")        
        let p = e('p', `${title}`, `${task}`)
        let m = e('p', `${task}`, `${task}`)
        let dlt_btn = e("button", "Delete","")         
        newArrt.appendChild(p)
        newArrt.appendChild(m)
        newArrt.appendChild(dlt_btn)        
        art_to_append2!.appendChild(newArrt)
        let del = (event.target.parentNode)
        del.remove()
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
