import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ActivationService} from '../services/activation.service';
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
    private activation: ActivationService
  ) { }
  
  ngOnInit() {
    let code = this.route.snapshot.paramMap.get('code');
    this.activation.activate(code).subscribe((data: Result)=>{
      this.result = data;
    });
  }

}
