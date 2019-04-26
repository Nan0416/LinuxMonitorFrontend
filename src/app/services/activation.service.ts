import { Injectable } from '@angular/core';
import {server_addr, url_prefix} from './config';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Result } from '../data-structures/GeneralResult';
@Injectable({
  providedIn: 'root'
})
export class ActivationService {

  urlprefix:string = server_addr + url_prefix;
  constructor(
    private http: HttpClient
  ) { }
  
  activate(code: string){
    const req: Observable<Result> = new Observable((observable)=>{
      const httpObserver = {
       next: data=>{
         observable.next(data);
       },
       error: err=>{
         observable.next({success: false, reasons:[err.message], value:null});
       }
     };
     /////// login now ///////////
     let activationLink = `${this.urlprefix}/user/activate/${code}`;
     this.http.get(activationLink, {withCredentials: true}).subscribe(httpObserver);
   });
   return req;
  }
}
