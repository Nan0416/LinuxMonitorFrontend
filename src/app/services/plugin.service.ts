import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import {PluginMeta} from '../data-structures/PluginMeta';
@Injectable({
  providedIn: 'root'
})
export class PluginService {

  constructor() { }
  getAvailablePlugin(){
    const req: Observable<PluginMeta[]> = new Observable((observable)=>{
      // this data should acquired from server.
      const availablePlugins: PluginMeta[] = [
        {
          name: "common",
          description: "Monitor basic metrics of a linux system",
          required_privilege: "common",
          url:"https://github.com/Nan0416/LinuxMonitorAgent",
          installation: "How to install."
        }
      ];
      observable.next(availablePlugins);
       
   });
   return req;
  }
}
