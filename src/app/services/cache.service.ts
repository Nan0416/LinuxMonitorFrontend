import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  public map: Map<string, any> = null;
  constructor() {
    this.reset();
  }
  saveRedirect(url: string){
    // let seg = url.split('/'); // [''], ['', ''], ['', 'x'], ['x','y']
    this.map.set('redirect', url.split('/'));
  }
  reset(){
    this.map = new Map<string, any>();
    this.map.set('redirect',['dashboard']);
  }
}
