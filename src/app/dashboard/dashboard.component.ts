import { Component, OnInit } from '@angular/core';
import { AgentService } from "../services/agent.service";
import { AgentMeta } from '../data-structures/AgentMeta';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../styles/general.scss', './dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  agents: AgentMeta[] = [];
  constructor(
    private agentService: AgentService
  ) { }

  ngOnInit() {
    this.agentService.agentUpdate$.subscribe((agents:AgentMeta[])=>{
      console.log(agents);
      this.agents = agents;
    });
    this.agentService.queryAgentMeta();
  }

}
