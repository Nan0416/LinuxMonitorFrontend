import { Component, OnInit , OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { CommonAgentInstanceService } from '../service/common-agent-instance.service';
import { CommonMetrics } from '../data-structure/common-metrics';
@Component({
  selector: 'app-common-agent-instance',
  templateUrl: './common-agent-instance.component.html',
  styleUrls: ['./common-agent-instance.component.scss']
})
export class CommonAgentInstanceComponent implements OnInit, OnDestroy {

  agentId: string = null;
  handle = null;
  data: CommonMetrics[] = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private agentService: CommonAgentInstanceService
  ) { }

  ngOnInit() {
    this.agentId = this.route.snapshot.paramMap.get('agent-id');
    this.repeatQuery(2000);
  }
  ngOnDestroy(){
    this.stopQuery();
  }

  _lastTimeStamp: number = -1;
  repeatQuery(period: number){
    this.handle = setInterval(()=>{
      this.agentService.queryData(this.agentId, this._lastTimeStamp).subscribe(data=>{
        console.log(data);
      });
    }, period);
  }
  stopQuery(){
    if(this.handle != null){
      clearInterval(this.handle);
    }
  }
  draw(){
    
  }
}
