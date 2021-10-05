import { Component, Input, OnInit } from '@angular/core';
import { Plugin } from 'src/app/models/Plugin';

@Component({
  selector: 'app-plugin-card',
  templateUrl: './plugin-card.component.html',
  styleUrls: ['./plugin-card.component.css']
})
export class PluginCardComponent implements OnInit {

  @Input() content:Plugin;
  @Input() source:Boolean;
  @Input() acordionId:string;
  @Input() last:boolean = false;

  public isCollapsed = true;


  constructor() { }

  ngOnInit(): void {
  //  console.log(this.acordionId)
  }

}
