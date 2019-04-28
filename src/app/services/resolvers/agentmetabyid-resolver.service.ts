import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { take, mergeMap, catchError} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Result } from '../../data-structures/GeneralResult';
import { AgentMeta } from '../../data-structures/AgentMeta';
import {server_addr, url_prefix} from '../config';
@Injectable({
  providedIn: 'root'
})
export class AgentmetabyidResolverService {

  urlprefix:string = server_addr + url_prefix;
  constructor(
    private http: HttpClient
    ) { 

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AgentMeta> | Observable<never> {
    let id = route.params['agent-id'];
    let queryUrl = `${this.urlprefix}/agent/query/${id}`;
    return this.http.get<any>(queryUrl, {withCredentials: true}).pipe(
      catchError(err => {
        console.log(err.error);
        return EMPTY;
      }), 
      mergeMap((data) => {
        let t_ = data as Result;
        console.log(t_.value);
        return of(t_.value);
      })
    );
  }
}
