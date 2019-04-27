import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,of, Subscriber, Subject} from 'rxjs';
import { CommonMetrics} from '../data-structure/common-metrics';
import {server_addr, url_prefix} from '../../services/config';

@Injectable({
  providedIn: 'root'
})
export class CommonAgentInstanceService {
  urlprefix:string = server_addr + url_prefix;
  data: CommonMetrics[] = [];

  // Observable string sources
  /*private agentUpdateEvt_ = new Subject<CommonMetrics[]>();
  public agentUpdate$ = this.agentUpdateEvt_.asObservable();*/
  
  constructor(
    private http: HttpClient
  ) { 
    
  }
  
  queryData(agentid: string, timestamp: number){
    const loginReq: Observable<CommonMetrics[]> = new Observable((observable)=>{
      const httpObserver = {
       next: data=>{
         if(data.success && data.value){
           this.data = data.value;
           for(let i = 0; i < this.data.length; i++){
              this.data[i].createdAt = new Date(this.data[i].createdAt);
              this.data[i].updatedAt = new Date(this.data[i].updatedAt);
            }
           observable.next(data.value);
         }else{ 
           this.data = [];
           observable.next([]);
         }
       },
       error: err=>{
         this.data = [];
         observable.next([]);
       }
     };
     /////// login now ///////////
     let loginUrl = `${this.urlprefix}/plugin/query/common`;
     let value = {"agent-id": agentid};
     if(timestamp > 0){
      value['timestamp'] = timestamp;
     }
     this.http.post(loginUrl, value, {withCredentials: true }).subscribe(httpObserver);
   });
   return loginReq;
  }
}
