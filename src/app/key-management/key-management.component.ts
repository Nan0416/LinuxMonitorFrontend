import { Component, OnInit, OnDestroy } from '@angular/core';
import { Key } from '../data-structures/Key';
import { KeyService } from '../services/key.service';
@Component({
  selector: 'app-key-management',
  templateUrl: './key-management.component.html',
  styleUrls: ['../styles/general.scss', './key-management.component.scss']
})
export class KeyManagementComponent implements OnInit, OnDestroy {

  keys: Key[] = [];
  uiStatus: Map<string, boolean> = new Map();
  constructor(
    private keyService: KeyService
  ) { }
  
  // monitor
  ngOnInit() {
    this.keyService.keysUpdate$.subscribe((keys: Key[])=>{
      this.keys = keys;
      this.uiStatus.clear();
      for(let index = 0; index < keys.length; index++){
        this.uiStatus.set(this.keys[index]._id, false);
      }
    });
    this.keyService.queryKeys();
  }

  ngOnDestroy(){
    
  }

  // UI
  getValue(key){
    if(this.uiStatus.get(key._id)){
      return key.value;
    }else{
      return key.value.substr(0, 5) + " ******";
    }
  }
  toggleVisiblity(id: string, viewbtn){
    console.log(id, viewbtn);
    if(this.uiStatus.get(id)){
      // it is viewing, hide.
      this.uiStatus.set(id, false);
      viewbtn.innerHTML = "View";
    }else{
      this.uiStatus.set(id, true);
      viewbtn.innerHTML = "Hide";
    }
  }
  disableKey(id: string, disablebtn){
    alert("Not implemented.");
  }
  deleteKey(id: string, deletebtn){
    alert("Not implemented.");
  }
  addKey(){
    alert("Not implemented.");
  }
}
