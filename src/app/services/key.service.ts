import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,of, Subscriber, Subject} from 'rxjs';

import { Key } from '../data-structures/Key';
import { server_addr, url_prefix } from './config';

@Injectable({
  providedIn: 'root'
})
export class KeyService {
  urlprefix:string = server_addr + url_prefix;
  keys: Key[] = [];

  private keysUpdateEvt_ = new Subject<Key[]>();
  public keysUpdate$ = this.keysUpdateEvt_.asObservable();
  
  constructor(
    private http: HttpClient
  ) { 
    console.log("Key service is initialized.");
  }

  queryKeys(){
    const httpObserver = {
      next: data=>{
        if(data.success && data.value){
          // do different
          let temp = [];
          
          for(let i = 0; i < data.value.length; i++){
            let key_ = new Key();
            key_.value = data.value[i].value;
            key_._id = data.value[i]._id;
            key_.privileges = data.value[i].privileges;
            key_.status = data.value[i].status;
            key_.createdAt = new Date(data.value[i].createdAt);
            key_.updatedAt = new Date(data.value[i].updatedAt);
            temp.push(key_);
          }
          this.keys = temp;
          this.keysUpdateEvt_.next(this.keys);
        }else{
          this.keys = [];
          this.keysUpdateEvt_.next(this.keys);
        }
      },
      error: err=>{
        this.keys = [];  
        this.keysUpdateEvt_.next(this.keys);
      }
    };
    let queryUserUrl = `${this.urlprefix}/key/query`;
    this.http.get(queryUserUrl, {withCredentials: true }).subscribe(httpObserver);
  }
}
