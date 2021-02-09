import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, pipe } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from '../message.service';
import { Crisis } from './crisis';
import { CRISIS } from './mock.crisis';

@Injectable({
  providedIn: 'root'
})
export class CrisisService {

  private crisisUrl = 'api/crisis';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  }

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) { }

  getAllCrisis(): Observable<Crisis[]> {
    //this.messageService.add('HeroService: fetched heroes');
    return this.http.get<Crisis[]>(this.crisisUrl)
      .pipe(
        tap(() => this.log('fetched crisis')),    // success on Observable
        catchError(this.handleError<Crisis[]>('getCrisis', [])) // catch on Observable
      )
  }

  getCrisis(id: number): Observable<Crisis> {
    const url = `${this.crisisUrl}/${id}`;
    return this.http.get<Crisis>(url)    
      .pipe(
        tap(() => this.log(`fetcher crisis id=${id}`)),
        catchError(this.handleError<Crisis>(`getCrisis id=${id}`))
      );
  }

  updateCrisis(crisis: Crisis): Observable<any> {
    return this.http.put(this.crisisUrl, crisis, this.httpOptions)
      .pipe(
        tap(() => this.log(`update crisis id=${crisis.id}`)),
        catchError(this.handleError<any>(`updateCrisis id=${crisis.id}`))
      );
  }

  addCrisis(crisis: Crisis): Observable<Crisis> {
    return this.http.post<Crisis>(this.crisisUrl, crisis, this.httpOptions)
      .pipe(
        tap( newCrisis => this.log(`added new crisis ${newCrisis.name}`)),
        catchError(this.handleError<Crisis>(`addCrisis name=${crisis.name}`))
      );
  }

  deleteCrisis(crisis: Crisis | number): Observable<Crisis> {
    const id = typeof crisis === 'number' ? crisis : crisis.id;
    const url = `${this.crisisUrl}/${id}`;
    return this.http.delete<Crisis>(url, this.httpOptions)
      .pipe(
        tap( () => this.log(`deleted crisis id=${id}`)),
        catchError(this.handleError<Crisis>(`deleteCrisis id=${id}`))
      );
  }

  searchCrisis(term: string): Observable<Crisis[]> {
    if(!term.trim()) {
      return of([]);
    }
    return this.http.get<Crisis[]>(`${this.crisisUrl}/?name=${term}`)
      .pipe(
        tap( result => this.log( result.length ? `found crisis matching "${term}"` : `no crisis matching "${term}"`)),
        catchError(this.handleError<Crisis[]>('searchCrisis', []))
      );
  }

/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

  private log(message: string): void {
    this.messageService.add(`CrisisService: ${message}`);
  }
}
