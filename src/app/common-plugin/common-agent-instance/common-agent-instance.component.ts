import { Component, OnInit , OnDestroy, ViewChild, ElementRef} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { CommonAgentInstanceService } from '../service/common-agent-instance.service';
import { CommonMetrics } from '../data-structure/common-metrics';
import {AgentService } from '../../services/agent.service';
import {AgentMeta} from '../../data-structures/AgentMeta';
import {WindowResizeService} from '../../services/window-resize.service';
import * as d3 from "d3";

@Component({
  selector: 'app-common-agent-instance',
  templateUrl: './common-agent-instance.component.html',
  styleUrls: ['../../styles/general.scss', './common-agent-instance.component.scss']
})
export class CommonAgentInstanceComponent implements OnInit, OnDestroy {

  period = 60; // seconds  

  agentId: string = null;
  handle = null;
  data: CommonMetrics[] = [];
  agentMeta: AgentMeta = null;

  padding_left = 30;
  padding_bottom = 17;
  padding_top = 10;
  padding_right = 0;
  
  loadPath = null;
  cpuPath = null;
  cpuUserPath = null;
  diskReadPath = null;
  diskWritePath = null;
  memoryUsedPath = null;

  timeScale = null; 
  
  loadScale = null; 
  cpuScale = null;
  diskScale = null;
  memoryScale = null; 
  
  loadFun: Function = null;
  cpuFun: Function = null;
  cpuUserFun: Function= null;
  diskReadFun: Function = null;
  diskWriteFun: Function = null;
  memoryUsedFun: Function = null;

  /* X axis */
  timeAxis = null;

  loadTimeAxisHtml = null;
  cpuTimeAxisHtml = null;
  diskTimeAxisHtml = null;
  memoryTimeAxisHtml = null;

  /* Y axis */
  cpuAxis = null;
  loadAxis = null;
  diskAxis = null;
  memoryAxis = null;

  cpuAxisHtml = null;
  loadAxisHtml = null;
  diskAxisHtml = null;
  memoryAxisHtml = null;
  
  /* = d3.line()
        .x((d)=>{ return this.timeScale(d.createdAt);})
        .y((d)=>{ return this.loadScale(d.loadavg[0]);})
        .curve(d3.curveBasis);*/
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private agentService: AgentService,
    private commonAgentService: CommonAgentInstanceService,
    private elRef:ElementRef,
    private windowResize: WindowResizeService
  ) { 
   
  }

  ngOnInit() {
    this.agentId = this.route.snapshot.paramMap.get('agent-id');
    this.route.data.subscribe((data) => {
      this.agentMeta = data['agentMeta'];
      console.log("load", this.agentMeta);
    });
  }
  ngOnDestroy(){
  }
  ngAfterViewInit(){
    let widthT = parseFloat(d3.select('#cpu-svg').style("width"));
    let heightT = parseFloat(d3.select('#cpu-svg').style("height"));
    
  
    let width = widthT - this.padding_left - this.padding_right;
    let height = heightT - this.padding_bottom - this.padding_top;

    this.loadPath = d3.select('#loadavg-svg').append('g').attr('transform', `translate(${this.padding_left},${this.padding_top})`).append('path');
    this.cpuPath = d3.select('#cpu-svg').append('g').attr('transform', `translate(${this.padding_left},${this.padding_top})`).append('path');
    this.cpuUserPath = d3.select('#cpu-svg').append('g').attr('transform', `translate(${this.padding_left},${this.padding_top})`).append('path');
    this.diskReadPath = d3.select('#disk-svg').append('g').attr('transform', `translate(${this.padding_left},${this.padding_top})`).append('path');
    this.diskWritePath = d3.select('#disk-svg').append('g').attr('transform', `translate(${this.padding_left},${this.padding_top})`).append('path');
    this.memoryUsedPath = d3.select('#memory-svg').append('g').attr('transform', `translate(${this.padding_left},${this.padding_top})`).append('path');

    this.loadPath.attr('class', 'line-plot').attr('fill', 'none').attr('stroke', "red").attr('stroke-width', '2px');
    this.cpuPath.attr('class', 'line-plot').attr('fill', 'none').attr('stroke', "red").attr('stroke-width', '2px');
    this.cpuUserPath.attr('class', 'line-plot').attr('fill', 'none').attr('stroke', "blue").attr('stroke-width', '2px');
    this.diskReadPath.attr('class', 'line-plot').attr('fill', 'none').attr('stroke', "red").attr('stroke-width', '2px');
    this.diskWritePath.attr('class', 'line-plot').attr('fill', 'none').attr('stroke', "red").attr('stroke-width', '2px');
    this.memoryUsedPath.attr('class', 'line-plot').attr('fill', 'none').attr('stroke', "red").attr('stroke-width', '2px');

    /** X axis html */
    this.loadTimeAxisHtml = d3.select('#loadavg-svg').append('g').attr('transform', `translate(${this.padding_left},${heightT - this.padding_bottom})`);
    this.cpuTimeAxisHtml = d3.select('#cpu-svg').append('g').attr('transform', `translate(${this.padding_left},${heightT - this.padding_bottom})`);
    this.diskTimeAxisHtml = d3.select('#disk-svg').append('g').attr('transform', `translate(${this.padding_left},${heightT - this.padding_bottom})`);
    this.memoryTimeAxisHtml = d3.select('#memory-svg').append('g').attr('transform', `translate(${this.padding_left},${heightT - this.padding_bottom})`);
    /* Y asix html */
    this.loadAxisHtml = d3.select('#loadavg-svg').append('g').attr('transform', `translate(${this.padding_left},${this.padding_top})`);
    this.cpuAxisHtml = d3.select('#cpu-svg').append('g').attr('transform', `translate(${this.padding_left},${this.padding_top})`);
    this.memoryAxisHtml = d3.select('#memory-svg').append('g').attr('transform', `translate(${this.padding_left},${this.padding_top})`);
    this.diskAxisHtml = d3.select('#disk-svg').append('g').attr('transform', `translate(${this.padding_left},${this.padding_top})`);


    this.timeScale = d3.scaleTime().range([0, width]);// .domain([])
    this.loadScale = d3.scaleLinear().range([height,0]).domain([0, 1]);
    this.cpuScale = d3.scaleLinear().range([height,0]).domain([0, 1]);
    this.diskScale = d3.scaleLinear().range([height,0]) ;//.domain([0, 1]);
    this.memoryScale = d3.scaleLinear().range([height,0]); //.domain([0, 1]); 
    
    this.timeAxis =d3.axisBottom(this.timeScale).ticks(6).tickFormat((d)=>{
      console.log(d);
      let i = d.getSeconds();
      if(i < 10){
        i = "0" + i;
      }
      return d.getMinutes() + ":" + i;
    });
    
    this.loadAxis = d3.axisLeft(this.loadScale).ticks(4).tickSizeInner(-width);
    this.memoryAxis = d3.axisLeft(this.memoryScale).ticks(6).tickSizeInner(-width);
    this.cpuAxis = d3.axisLeft(this.cpuScale).ticks(2).tickSizeInner(-width);
    this.diskAxis = d3.axisLeft(this.diskScale).ticks(4).tickSizeInner(-width)


    this.loadFun = d3.line()
      .x((d)=>{ return this.timeScale(d.createdAt);})
      .y((d)=>{ return this.loadScale(d.loadavg[0]);})
      .curve(d3.curveBasis);
    
    this.cpuFun = d3.line()
      .x((d)=>{ return this.timeScale(d.createdAt);})
      .y((d)=>{ return this.cpuScale(d.cpuuser + d.cpusys);})
      .curve(d3.curveBasis);
    
    this.cpuUserFun = d3.line()
      .x((d)=>{ return this.timeScale(d.createdAt);})
      .y((d)=>{ return this.cpuScale(d.cpuuser);})
      .curve(d3.curveBasis);

    this.diskReadFun = d3.line()
      .x((d)=>{ return this.timeScale(d.createdAt);})
      .y((d)=>{ return this.diskScale(d.disk[0].read);})
      .curve(d3.curveBasis);
    
    this.diskReadFun = d3.line()
      .x((d)=>{ return this.timeScale(d.createdAt);})
      .y((d)=>{ return this.diskScale(d.disk[0].write);})
      .curve(d3.curveBasis);

    this.memoryUsedFun = d3.line()
      .x((d)=>{ return this.timeScale(d.createdAt);})
      .y((d)=>{ return this.memoryScale(d.memtotal - d.memavail);})
      .curve(d3.curveBasis);

    
    this.windowResize.reasize$.subscribe(()=>{
      // resize
      console.log('resize');
      
      let widthT = parseFloat(d3.select('#cpu-svg').style("width"));
      let width = widthT - this.padding_left - this.padding_right;

      this.loadAxis.tickSizeInner(-width);
      this.cpuAxis.tickSizeInner(-width);
      this.memoryAxis.tickSizeInner(-width);
      this.diskAxis.tickSizeInner(-width);


      this.timeScale.range([0, width]);

      this.drawPaths();
    });
  }

  show(from: Date, to: Date){
    this.commonAgentService.queryData(this.agentId, from.getTime(), to.getTime()).subscribe((data: CommonMetrics[])=>{
      this.data = data;
      this.loopData();
      this.drawPaths();
    });
  }
  
  loopData(){
    if(this.data.length == 0){return;}
    // update time domain
    let begin = this.data[0].createdAt;
    let end = this.data[this.data.length - 1].createdAt;
    this.timeScale.domain([begin, end]);
    
    // update disk, memory scale
    let diskmax = 1000,  memtotal = 4194304, load = 1; // 4GB
    if(this.data.length > 0){
      memtotal = this.data[0].memtotal;
      load = this.data[0].corenum;
    }
    this.loadScale.domain([0, load]);
    this.memoryScale.domain([0, memtotal]);
    this.diskScale.domain([0, diskmax]);

  }

  drawPaths(){
    this.loadTimeAxisHtml.call(this.timeAxis);
    this.cpuTimeAxisHtml.call(this.timeAxis);
    this.diskTimeAxisHtml.call(this.timeAxis);
    this.memoryTimeAxisHtml.call(this.timeAxis);

    this.loadAxisHtml.call(this.loadAxis);
    this.cpuAxisHtml.call(this.cpuAxis);
    this.memoryAxisHtml.call(this.memoryAxis);
    this.diskAxisHtml.call(this.diskAxis);
    //console.log(this.timeAxisHtml);
    this.loadPath
      .datum(this.data)
      .attr('d', this.loadFun);
    this.cpuUserPath
      .datum(this.data)  
      .attr('d', this.cpuUserFun);
    this.cpuPath
      .datum(this.data)  
      .attr('d', this.cpuFun);
    this.memoryUsedPath
      .datum(this.data)  
      .attr('d', this.memoryUsedFun);
    this.diskReadPath
      .datum(this.data)  
      .attr('d', this.diskReadFun);
    this.diskWritePath
      .datum(this.data)  
      .attr('d', this.diskWriteFun);
  }
}
