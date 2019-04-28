import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Result} from '../data-structures/GeneralResult';
@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['../styles/general.scss', './activate.component.scss']
})
export class ActivateComponent implements OnInit {
  result: Result = null;
  constructor(
    private route: ActivatedRoute,
  ) { 
    
  }
  
  ngOnInit() {
    this.result = this.route.snapshot.data['activationResult'];
    console.log(this.result);
  }

}
