import { Injectable } from '@angular/core';
import {Resolve, ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { take, mergeMap, catchError} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Result } from '../../data-structures/GeneralResult';
import {server_addr, url_prefix} from '../config';
@Injectable({
  providedIn: 'root'
})
export class ActivationResolverService {
  urlprefix:string = server_addr + url_prefix;
  constructor(
    private http: HttpClient
    ) { 

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Result> | Observable<never> {
    let code = route.params['code'];
    let activationLink = `${this.urlprefix}/user/activate/${code}`;
    return this.http.get<Result>(activationLink, {withCredentials: true}).pipe(
      catchError(err => {
        console.log(err.error);
        return of(err.error as Result);
      }), 
      mergeMap((data: Result) => {
        return of(data);
      })
    );
  }
}
