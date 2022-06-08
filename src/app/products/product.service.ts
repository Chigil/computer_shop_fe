import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from '../message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient,
              private messageService: MessageService,
              private router: Router
  ) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAZ21haWwuY29tIiwiaWQiOiJjZDRlNmIzYi1kZDYwLTQ0NmMtODBhMC0zZTFlYWY2YTk2NTciLCJyb2xlIjp7ImlkIjoiZWM1N2NmOTEtNWVhNy00Yjg0LWE5YTItMmQzZGM4YjU5ZThmIiwiaWRlbnQiOiJDTElFTlQiLCJjcmVhdGVkQXQiOiIyMDIyLTA1LTEwVDA4OjA4OjQ5LjA0N1oiLCJ1cGRhdGVkQXQiOiIyMDIyLTA1LTEwVDA4OjA4OjQ5LjA0N1oifSwiaWF0IjoxNjU0NTk2OTIyLCJleHAiOjE2NTQ2ODMzMjJ9.-ns5t0K6S71hzVu1_40Y7-alnvCjWiMjJJjsTmJE5Pk'  },
      ),
  };

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  private heroesUrl = 'http://localhost:5000/product';

  getProducts(): Observable<Product[]> {
    const url = `${this.heroesUrl}/all`;
    return this.http.post<Product[]>(url,{}, this.httpOptions)
      .pipe(
        tap(_ => this.log('fetched products')),
        catchError(this.handleError<Product[]>('getHeroes', [])),
      );
  }

  getProduct(id: string): Observable<Product> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Product>(url,this.httpOptions).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Product>(`getHero id=${id}`)),
    );
  }

  updateHero(hero: Product): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero')),
    );
  }

  addHero(hero: Product): Observable<Product> {
    return this.http.post<Product>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Product) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Product>('addHero')),
    );
  }

  deleteHero(id: number): Observable<Product> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Product>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Product>('deleteHero')),
    );
  }

  searchHeroes(term: string): Observable<Product[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Product[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found heroes matching "${term}"`) :
        this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Product[]>('searchHeroes', [])),
    );
  }
}
