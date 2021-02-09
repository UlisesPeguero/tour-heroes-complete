import { Component, OnInit } from '@angular/core';

import { Crisis } from '../crisis';
import { CrisisService } from '../crisis.service';
import { MessageService } from '../../message.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-crisis-list',
  templateUrl: './crisis-list.component.html',
  styleUrls: ['./crisis-list.component.css']
})
export class HeroListComponent implements OnInit {

  crisis$: Observable<Crisis[]>;
  selectedId: number;
  
  constructor(
    private crisisServive: CrisisService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.crisis$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.selectedId = +params.get('id');
        this.messageService.add(`HeroListComponent: get selected hero id=${this.selectedId}`);
        return this.crisisServive.getAllCrisis();        
      })
    );
  }
  
  onSelect(crisis: Crisis): void {
    this.messageService.add(`HeroesListComponent: Selected hero id=${crisis.id}`)
  }

  add(name: string): void {
    name = name.trim();
    if(!name) return;
    // this.heroService.addHero({name} as Hero)
    //   .subscribe( hero => this.heroes$.push(hero));
  }

  delete(crisis: Crisis): void {
    // this.heroService.deleteHero(hero)
    //     .subscribe( () => this.Heroes = this.Heroes.filter( _hero => _hero !== hero));
  }

}
