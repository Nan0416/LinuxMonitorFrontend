import { Injectable } from '@angular/core';
import { AgentService } from '../agent.service';
import { AgentMeta} from '../../data-structures/AgentMeta';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable ,of, Subscriber, Subject} from 'rxjs';
import {server_addr, url_prefix} from '../config';
import {Result} from '../../data-structures/GeneralResult';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { take, map, mergeMap, catchError} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class AgentmetaResolverService implements Resolve<AgentMeta>{
  urlprefix: string = server_addr + url_prefix;
  constructor(
    private http: HttpClient
  ) { 

  }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<AgentMeta>{
    console.log("resovler running", route.params['agent-id']);
    let id = route.params['agent-id'];
    let queryUrl = `${this.urlprefix}/agent/query/${id}`;
    let observable = new Observable<AgentMeta>();
    return observable;
   }
}