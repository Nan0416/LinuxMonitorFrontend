import { Component, OnInit } from '@angular/core';
import {UserOperationService} from '../services/user-operation.service';
import { Router } from '@angular/router';
import { User } from '../data-structures/User';
@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['../styles/general.scss','./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  user: User = null;
  constructor(
    private userOperator: UserOperationService,
    private router: Router,
  ) { 
    this.user = this.userOperator.user;
  }

  ngOnInit() {
    
  }
  
  logout(){
    this.userOperator.logout().subscribe(data=>{
      if(data.success){
      }else{
        //show err
        alert(JSON.stringify(data.reasons));
      }
    });
  }
}
