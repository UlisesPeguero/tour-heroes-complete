import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { UrlService } from 'src/app/url.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  hero: Hero;
  hero$: Observable<Hero>;
  previousUrl: string;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private urlService: UrlService,
    private router: Router
  ) { }

  ngOnInit(): void {
    //this.getHero();
    this.hero$ = this.route.paramMap.pipe(
      switchMap( (params: ParamMap) =>
        this.heroService.getHero(+params.get('id'))
      )
    );
    // get previous url
    this.urlService.previousUrl$
      .subscribe( (previousUrl: string) => {
        this.previousUrl = previousUrl;
      });
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');    
    this.heroService.getHero(id)
        .subscribe(hero => this.hero = hero);
  }

  save(hero: Hero): void {
    this.heroService.updateHero(hero)
      .subscribe(() => this.goBack(hero.id));   
  }

  goBack(id: number): void {
    //this.location.back();
    this.router.navigate([this.previousUrl, {id: id}]);
  }

}
