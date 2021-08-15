import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TasksComponent } from './tasks/tasks.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HistoryComponent } from './history/history.component';
import { AuthGuard } from './service-guards/auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/landing'
},
{ path: 'history', component: HistoryComponent, canActivate:[AuthGuard]},
{ path: 'landing', component: LandingPageComponent },
{ path: 'tasks', component: TasksComponent, canActivate:[AuthGuard]},
{ path: 'home', component: HomeComponent, canActivate:[AuthGuard]},
{ path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
