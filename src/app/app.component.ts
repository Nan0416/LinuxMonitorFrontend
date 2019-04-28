import { Component , OnInit} from '@angular/core';
import {Router, Event, NavigationEnd, ActivatedRoute} from '@angular/router';
import { UserOperationService } from './services/user-operation.service';
import { WindowResizeService } from './services/window-resize.service';
import { User } from './data-structures/User';
import { filter } from 'rxjs/operators';
import { CacheService } from './services/cache.service';
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
  currentUrl: string = '';
  isShowUI: boolean = false;
  isWelcomePage: boolean = true;
  nonuservalidpage: Set<string> = new Set<string>();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cacheService: CacheService,
    private userOperator: UserOperationService,
    private windowResize: WindowResizeService,
  ){ 
    this.nonuservalidpage.add('');
    this.nonuservalidpage.add('docs');
    this.nonuservalidpage.add('news');
    this.nonuservalidpage.add('activate');
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
    this.router.events.pipe(
      filter((e: Event)=> e instanceof NavigationEnd)
    ).subscribe((e: NavigationEnd)=>{
      this.currentUrl = e.urlAfterRedirects;
      if(this.currentUrl == '/'){
        this.isWelcomePage = true;
      }else{
        this.isWelcomePage = false;
      }
    });

    // set login listener
    this.userOperator.userMount$.subscribe(user=>{
      this.user = user;
      this.isShowUI = true;
      // go everywhere, ** if it goes to /, then / will do the redirection.
    });

    // set logout listener
    this.userOperator.userUnMount$.subscribe(()=>{
      this.user = null;
      this.isShowUI = true;
      // this.cacheService.reset();
      let page = this.currentUrl.split('/')[1];
      if(this.nonuservalidpage.has(page)){
        return;
      }
      // this.currentUrl is a membership required page.
      this.cacheService.saveRedirect(this.currentUrl);
      this.router.navigate(['']); // go to login
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
