import { Component , OnInit} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import { UserOperationService } from './services/user-operation.service';
import { WindowResizeService } from './services/window-resize.service';
import { User } from './data-structures/User';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  verticalWidth: Number = 560;
  isVertical: boolean = true;
  user: User = null;

  constructor(
    private router: Router,
    private userOperator: UserOperationService,
    private windowResize: WindowResizeService,
  ){ 
    this.user = new User(); 
    this.user.username = "qinnan";
    this.user.email = "qinnan0416@gmail.com";
    this.user.status = 1;
    this.user.profile = "../assets/img/temp-profile.jpg";
    
  }

  
  /**
   * The initialization of the app
   * 1. setup subscriber. listen user login, user logout
   *                      listen the modification of url.
   * 
   * 2. test if a valid user session exist, auto login.
   *  */
  ngOnInit(){
    this.isVertical = this.windowResize.getWidth() < this.verticalWidth;
    this.windowResize.listenWidthThreshold(this.verticalWidth).subscribe(width=>{
      console.log("invoked");
      if(width >= this.verticalWidth){
        this.isVertical = false;
      }else{
        this.isVertical = true;
      }
    });
    this.router.events.subscribe((evt)=>{
      if(!(evt instanceof NavigationEnd)){
        return;
      }
     
    });
    this.userOperator.userMount$.subscribe(data=>{
     
      //this.targetOperator.ws_open();
      //this.targetOperator.ws_subscribe();
      //this.targetOperator.queryTargets();
      //this.dataContainer.init();
    });
    this.userOperator.userUnMount$.subscribe(data=>{
     
      //this.dataContainer.clear();
      //this.targetOperator.ws_close();
    });
    this.userOperator.queryUserWithSession();
    //this.targetOperator.queryTargets();
  }

  logout(){
    this.userOperator.logout().subscribe(data=>{
      if(data.success){
        this.router.navigate(["login"]);
        //this.targetOperator.ws_close();
        // clear
      }else{
        //show err
        alert(JSON.stringify(data.reasons));
      }
    });
  }
}
