import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CrisisListComponent } from './crisis-list/crisis-list.component';
import { CrisisDetailComponent } from './crisis-detail/crisis-detail.component';

const heroesRoutes: Routes = [
  { path: 'crisis', component: CrisisListComponent, data: { animation: 'heroes' } },
  { path: 'crisis/:id', component: CrisisDetailComponent, data: { animation: 'hero' } }
];

@NgModule({
  imports: [RouterModule.forChild(heroesRoutes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule {}
