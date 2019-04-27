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
  isShowingDropdown: boolean = false;
  constructor(
    private router: Router,
    private userOperator: UserOperationService,
    private windowResize: WindowResizeService,
  ){ 
    /*this.user = new User(); 
    this.user.username = "qinnan";
    this.user.email = "qinnan0416@gmail.com";
    this.user.status = 1;
    this.user.profile = "../assets/img/temp-profile.jpg";*/
    
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
    // set resize listener
    this.windowResize.listenWidthThreshold(this.verticalWidth).subscribe(width=>{
      console.log("app.component windows resize invoked");
      if(width >= this.verticalWidth){
        this.isVertical = false;
      }else{
        this.isVertical = true;
        this.isShowingDropdown = false;
      }
    });
    console.log(this.router.url);
    // set login listener
    this.userOperator.userMount$.subscribe(user=>{
      this.user = user;
      console.log(this.user);
      if(this.router.url == '/'){ 
        this.router.navigate(["dashboard"]);
      }
    });

    // set logout listener
    this.userOperator.userUnMount$.subscribe(()=>{
      // go to welcome page
      this.user = null;
      this.router.navigate(["/"]);
    });

    // query initialial state.
    this.userOperator.queryUserWithSession();
  }

  _isloggingout: boolean = false;
  logout(){
    if(this._isloggingout){
      return;
    }
    this._isloggingout = true;
    this.userOperator.logout().subscribe(data=>{
      this._isloggingout = false;
      if(data.success){
        // do nothing, nagivate to / is done by the above listener.
      }else{
        // alert(JSON.stringify(data.reasons));
      }
    });
  }



  // UI event handler
  toggleDropdown(evt){
    evt.stopPropagation();
    this.isShowingDropdown = !this.isShowingDropdown;
  }
  
  closeDropdown(){
    this.isShowingDropdown = false;
  }
}
