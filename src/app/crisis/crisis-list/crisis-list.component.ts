import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../../message.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css']
})
export class HeroListComponent implements OnInit {

  heroes$: Observable<Hero[]>;
  selectedId: number;
  
  constructor(
    private heroService: HeroService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.heroes$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.selectedId = +params.get('id');
        this.messageService.add(`HeroListComponent: get selected hero id=${this.selectedId}`);
        return this.heroService.getHeroes();        
      })
    );
  }
  
  onSelect(hero: Hero): void {
    this.messageService.add(`HeroesListComponent: Selected hero id=${hero.id}`)
  }

  add(name: string): void {
    name = name.trim();
    if(!name) return;
    // this.heroService.addHero({name} as Hero)
    //   .subscribe( hero => this.heroes$.push(hero));
  }

  delete(hero: Hero): void {
    // this.heroService.deleteHero(hero)
    //     .subscribe( () => this.Heroes = this.Heroes.filter( _hero => _hero !== hero));
  }

}
