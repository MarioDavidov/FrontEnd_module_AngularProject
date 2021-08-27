import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { RateAppComponent } from './rate-app/rate-app.component';
import { RouterModule } from '@angular/router';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [ 
    RateAppComponent,
  ],
  imports: [
    CommonModule,    
    RouterModule,
    FormsModule,
    CoreRoutingModule
  ],
  exports:[
    RateAppComponent
  ]
})
export class RateModuleModule { }
