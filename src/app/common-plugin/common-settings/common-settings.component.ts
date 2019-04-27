import { Component, OnInit , OnDestroy} from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

import { AgentService } from '../../services/agent.service';
import { AgentMeta} from '../../data-structures/AgentMeta';

@Component({
  selector: 'app-common-settings',
  templateUrl: './common-settings.component.html',
  styleUrls: ['../../styles/general.scss', './common-settings.component.scss']
})
export class CommonSettingsComponent implements OnInit {

  agentId: string = null;
  agentMeta: AgentMeta = null;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private agentService: AgentService,
    // private commonAgentService: CommonAgentInstanceService
  ) { 
    
  }
  ngOnInit() {
    this.agentId = this.route.snapshot.paramMap.get('agent-id');
    this.agentService.queryAgentMetaById(this.agentId).subscribe(meta=>{
      this.agentMeta = meta;
    });

  }
}
