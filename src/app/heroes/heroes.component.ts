import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  Heroes?: Hero[];
  
  constructor(
    private heroService: HeroService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.Heroes = heroes);
  }

  onSelect(hero: Hero): void {
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`)
  }

  add(name: string): void {
    name = name.trim();
    if(!name) return;
    this.heroService.addHero({name} as Hero)
      .subscribe( hero => this.Heroes.push(hero));
  }

  delete(hero: Hero): void {
    this.heroService.deleteHero(hero)
        .subscribe( () => this.Heroes = this.Heroes.filter( _hero => _hero !== hero));
  }

}