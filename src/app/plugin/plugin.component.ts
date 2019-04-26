import { Component, OnInit } from '@angular/core';
import { PluginMeta } from '../data-structures/PluginMeta';
import { PluginService } from '../services/plugin.service';
@Component({
  selector: 'app-plugin',
  templateUrl: './plugin.component.html',
  styleUrls: ['./plugin.component.scss']
})
export class PluginComponent implements OnInit {
  pluginMetaArr: PluginMeta[];
  constructor(
    private pluginService: PluginService
  ) { }

  ngOnInit() {
    this.pluginService.getAvailablePlugin().subscribe((data: PluginMeta[])=>{
      if(data == null) return;
      this.pluginMetaArr = data;
    });
  }

}
