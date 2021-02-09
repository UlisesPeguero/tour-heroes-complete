import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { slideInAnimation } from './animations';
import { UrlService } from './url.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ slideInAnimation ]
})
export class AppComponent implements OnInit {
  title = 'Tour of the Heroes';

  public previousUrl: string = null;
  public currentUrl: string = null;

  constructor(
    private router: Router,
    private urlService: UrlService
  ) {}

  ngOnInit() {
    this.router.events
      .pipe(filter( event => event instanceof NavigationEnd))
      .subscribe( (event: NavigationEnd)   => {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
        console.log(`Url: ${this.currentUrl} | PreviousUrl: ${this.previousUrl}`)
        this.urlService.setPreviousUrl(this.previousUrl);
      });
  }

  getAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
