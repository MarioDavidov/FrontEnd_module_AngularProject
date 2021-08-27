
import { RouterModule, Routes } from '@angular/router';
import { RateAppComponent } from './rate-app/rate-app.component';

const routes: Routes = [

    { path: 'app', component: RateAppComponent },
    
];



export const CoreRoutingModule = RouterModule.forChild(routes)
