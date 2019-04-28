import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,of, Subscriber, Subject} from 'rxjs';
import { Result } from '../data-structures/GeneralResult';
import { User } from '../data-structures/User';
import {server_addr, url_prefix} from './config';

@Injectable({
  providedIn: 'root'
})

export class UserOperationService {


  urlprefix:string = server_addr + url_prefix;
  public user: User = null;

  // Observable string sources
  private userMountEvt_ = new Subject<User>();
  private userUnMountEvt_ = new Subject<null>();

  public userMount$ = this.userMountEvt_.asObservable();
  public userUnMount$ = this.userUnMountEvt_.asObservable();

  constructor(
    private http: HttpClient
  ) { 
    
  }
  __notifyUserMountSubscribers(user: User){
    this.userMountEvt_.next(user);
  }
  __notifyUserUnMountSubscribers(){
    this.userUnMountEvt_.next(null);
  }

  getUser(){
    return this.user;
  }
  /**
   * query user from backend
   */
  queryUserWithSession(){
    const httpObserver = {
      next: data=>{
        if(data.success && data.value){
          this.user = new User();
          this.user.username = data.value.username;
          this.user.email = data.value.email;
          this.user.profile = "../assets/img/temp-profile.jpg";
          this.user.status = data.value.status;
          this.__notifyUserMountSubscribers(this.user);
        }else{
          this.user = null;
          this.__notifyUserUnMountSubscribers();
        }
      },
      error: err=>{
        this.user = null;  
        this.__notifyUserUnMountSubscribers();
      }
    };
    let queryUserUrl = `${this.urlprefix}/user/query`;
    this.http.get(queryUserUrl, {withCredentials: true }).subscribe(httpObserver);
  }

  login(id: string, password): Observable<User>{
    const loginReq: Observable<User> = new Observable((observable)=>{
       const httpObserver = {
        next: data=>{
          if(data.success && data.value){
            this.user = new User();
            this.user.username = data.value.username;
            this.user.email = data.value.email;
            this.user.profile = "../assets/img/temp-profile.jpg";
            this.user.status = data.value.status;
            observable.next(this.user);
            this.__notifyUserMountSubscribers(this.user);

          }else{
            this.user = null;
            observable.next(null);
            this.__notifyUserUnMountSubscribers();
          }
        },
        error: err=>{
          this.user = null;
          observable.next(null);
          this.__notifyUserUnMountSubscribers();
        }
      };
      /////// login now ///////////
      let loginUrl = `${this.urlprefix}/user/login`;
      let value = {username: id, password: password};
      this.http.post(loginUrl, value, {withCredentials: true }).subscribe(httpObserver);
    });
    return loginReq;
  }

  logout(): Observable<Result>{
    const logoutReq: Observable<Result> = new Observable((observable)=>{
      const httpObserver = {
       next: data=>{
         this.__notifyUserUnMountSubscribers();
         this.user = null;
         if(data.success){
           observable.next(data);
         }else{
           observable.next(data);
         }
       },
       error: err=>{
        this.__notifyUserUnMountSubscribers();
         this.user = null;
         observable.next({
           success: false,
           reasons:[err.message],
           value:null
         });
       }
     };
     /////// login now ///////////
     let loginUrl = `${this.urlprefix}/user/logout`;
     this.http.get(loginUrl, {withCredentials: true }).subscribe(httpObserver);
     //
   });
   return logoutReq;
  }

  signup(username: string, email: string, password: string): Observable<User>{
    const loginReq: Observable<User> = new Observable((observable)=>{
      const httpObserver = {
       next: data=>{
         if(data.success && data.value){
          this.user = new User();
          this.user.username = data.value.username;
          this.user.email = data.value.email;
          this.user.profile = "../assets/img/temp-profile.jpg";
          this.user.status = data.value.status;
          observable.next(this.user);
          this.__notifyUserMountSubscribers(this.user);
         }else{
           this.user = null;
           observable.next(null);
           this.__notifyUserUnMountSubscribers();
         }
       },
       error: err=>{
         this.user = null;
         observable.next(null);
         this.__notifyUserUnMountSubscribers();
       }
     };
     /////// signup now ///////////
     let loginUrl = `${this.urlprefix}/user/signup`;
     let value = {username: username, email:email, password: password};
     this.http.post(loginUrl, value, {withCredentials: true }).subscribe(httpObserver);
     //
   });
   return loginReq;
    
  }
}
