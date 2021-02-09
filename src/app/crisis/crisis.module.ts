import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { HeroesRoutingModule } from './crisis-routing.module';
import { HeroListComponent } from './hero-list/hero-list.component';
import { HeroDetailComponent } from './crisis-detail/crisis-detail.component';


@NgModule({
  declarations: [
    HeroListComponent,
    HeroDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HeroesRoutingModule
  ]
})
export class HeroesModule { }
