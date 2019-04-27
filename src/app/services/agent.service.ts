import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,of, Subscriber, Subject} from 'rxjs';
import { Result } from '../data-structures/GeneralResult';
import { AgentMeta } from '../data-structures/AgentMeta';
import {server_addr, url_prefix} from './config';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  urlprefix:string = server_addr + url_prefix;
  agentMeta: AgentMeta[] = [];

  // Observable string sources
  private agentUpdateEvt_ = new Subject<AgentMeta[]>();
  public agentUpdate$ = this.agentUpdateEvt_.asObservable();
  
  constructor(
    private http: HttpClient
  ) { 
    
  }
  queryAgentMetaById(id: string):  Observable<AgentMeta>{
    const queryReq: Observable<AgentMeta> = new Observable((observable)=>{
      console.log("query by id" + id + " running");
      const httpObserver = {
       next: data=>{
         if(data.success && data.value){
          console.log(data.value);
          observable.next(data.value);
         }else{
          observable.next(null);
         }
       },
       error: err=>{
         observable.next(null);
       }
     };
     /////// login now ///////////
     let loginUrl = `${this.urlprefix}/agent/query/${id}`;
     
     this.http.get(loginUrl, {withCredentials: true }).subscribe(httpObserver);
   });
   return queryReq;
  }
  queryAgentMetaAll(){
    // GET https://monitor.sousys.com/web-api/agent/query
    const httpObserver = {
      next: data=>{
        if(data.success && data.value){
          this.agentMeta = data.value;  
          /**
           * ToDo: compare change, if not modification, does not change.
           */
          this.agentUpdateEvt_.next(this.agentMeta);
        }else{
          this.agentMeta = [];  
          this.agentUpdateEvt_.next(this.agentMeta);
        }
      },
      error: err=>{
        this.agentMeta = [];  
        this.agentUpdateEvt_.next(this.agentMeta);
      }
    };
    let queryUserUrl = `${this.urlprefix}/agent/query`;
    this.http.get(queryUserUrl, {withCredentials: true }).subscribe(httpObserver);
  }
  
}
