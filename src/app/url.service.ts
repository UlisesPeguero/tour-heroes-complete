import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  private previousUrl: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public previousUrl$: Observable<string> = this.previousUrl.asObservable();

  constructor() { }

  setPreviousUrl(url: string): void {    
    console.log(`PreviousUrl: ${url} ${typeof url}`); 
    url = this.getBaseUrl(url);
    console.log(`PreviousUrl ?: ${url}`); 
    this.previousUrl.next(url);
       
  }

  getBaseUrl(url: string): string {
    if(!url) return '';
    let indexSemi = url.indexOf(';');
    if(indexSemi !== -1) {
      url = url.substring(0, indexSemi);
    }
    return url;
  }
}
