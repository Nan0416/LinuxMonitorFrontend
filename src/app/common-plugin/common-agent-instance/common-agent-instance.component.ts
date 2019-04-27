import { Component, OnInit , OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { CommonAgentInstanceService } from '../service/common-agent-instance.service';
import { CommonMetrics } from '../data-structure/common-metrics';
import * as d3 from "d3";
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
  ) { 
    
  }

  ngOnInit() {
    this.agentId = this.route.snapshot.paramMap.get('agent-id');
    this.scaleTimeRange();

    this.repeatQuery(2000);
  }
  ngOnDestroy(){
    this.stopQuery();
  }
  ngAfterViewInit(){
    this.loadPath = d3.select('#loadavg-svg').append('g').append('path');
  }

  _lastTimeStamp: number = -1;
  repeatQuery(period: number){
    this.handle = setInterval(()=>{
      this.agentService.queryData(this.agentId, this._lastTimeStamp).subscribe((data: CommonMetrics[])=>{
        this.scaleTimeDomain(data);
        this.drawLoad(data);
        
      });
    }, period);
  }
  stopQuery(){
    if(this.handle != null){
      clearInterval(this.handle);
    }
  }


  //UI
  //window resize

  timeScale = d3.scaleTime(); //.range([0, this.chartWidth]); .domain([])
  loadScale = d3.scaleLinear().range([200,0]).domain([0, 1]);
  
  scaleTimeRange(){
    // set listen
    /*window.onresize = (e) =>
    {
      let width = d3.select('#loadavg-svg').style('width');
      let widthnum = parseFloat(width);
      this.timeScale.range([0, widthnum]);
    };*/
  }

  scaleTimeDomain(data: CommonMetrics[]){
    let begin = data[0].createdAt;
    let end = data[data.length - 1].createdAt;
    this.timeScale.domain([begin, end]);

  }
  __loadFun: Function = d3.line()
        .x((d)=>{ return this.timeScale(d.createdAt);})
        .y((d)=>{ return this.loadScale(d.loadavg[0]);})
        .curve(d3.curveBasis);
  loadPath = null; 
  
  drawLoad(pathdata){
    this.loadPath
      .datum(pathdata)
      .attr('class', 'line-plot')
      .attr('fill', 'none')
      .attr('stroke', "red")
      .attr('stroke-width', '2px')
      .attr('d', this.__loadFun);
  }
}
