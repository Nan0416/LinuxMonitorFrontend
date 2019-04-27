import { Injectable, HostListener } from '@angular/core';
import { PluginMeta } from '../data-structures/PluginMeta';
import { Observable, Observer, Subject, Subscriber } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WindowResizeService {
  /**
   * Only can server one component.
   */
  subscriber:Subscriber<Number> = null;
  targetWidth: Number = -1;
  isBigger: boolean = false; // current value >= target value
  private resizeEvt_ = new Subject();
  public reasize$ = this.resizeEvt_.asObservable();
  constructor() {
    console.log("WindowResizeService is initialized");
    window.onresize = (e) =>
    {
      this.resizeEvt_.next();
      if(this.targetWidth < 0){
        return;
      }
      if(this.isBigger && window.innerWidth < this.targetWidth){
        this.isBigger = false;
        this.subscriber.next(window.innerWidth);
      }else if(!this.isBigger && window.innerWidth >= this.targetWidth){
        this.isBigger = true;
        this.subscriber.next(window.innerWidth);
      }
    };
  }
  getWidth():Number{
    return window.innerWidth;
  }
  listenWidthThreshold(width: Number){
    const req: Observable<Number> = new Observable((observor: Subscriber<Number>)=>{
     this.isBigger = window.innerWidth >= width;
     this.targetWidth = width;
     this.subscriber = observor;
   });
   return req;
  }
}
