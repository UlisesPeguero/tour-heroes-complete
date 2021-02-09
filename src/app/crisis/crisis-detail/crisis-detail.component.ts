import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Crisis } from '../crisis';
import { CrisisService } from '../crisis.service';
import { UrlService } from 'src/app/url.service';

@Component({
  selector: 'app-crisis-detail',
  templateUrl: './crisis-detail.component.html',
  styleUrls: ['./crisis-detail.component.css']
})
export class CrisisDetailComponent implements OnInit {

  crisis: Crisis;
  crisis$: Observable<Crisis>;
  previousUrl: string;

  constructor(
    private crisisService: CrisisService,
    private route: ActivatedRoute,
    private urlService: UrlService,
    private router: Router
  ) { }

  ngOnInit(): void {
    //this.getHero();
    this.crisis$ = this.route.paramMap.pipe(
      switchMap( (params: ParamMap) =>
        this.crisisService.getCrisis(+params.get('id'))
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
    this.crisisService.getCrisis(id)
        .subscribe(crisis => this.crisis = crisis);
  }

  save(crisis: Crisis): void {
    this.crisisService.updateCrisis(crisis)
      .subscribe(() => this.goBack(crisis.id));   
  }

  goBack(id: number): void {
    //this.location.back();
    this.router.navigate([this.previousUrl, {id: id}]);
  }

}
