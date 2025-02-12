import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//import { HeroListComponent } from './heroes/hero-list/hero-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
//import { HeroDetailComponent } from './heroes/hero-detail/hero-detail.component';
import { CrisisComponent } from './crisis/crisis.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'crisis', component: CrisisComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
