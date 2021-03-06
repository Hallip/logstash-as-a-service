import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem } from '@angular/cdk/drag-drop';
import { Plugin } from 'src/app/models/Plugin';
import { GetPlguinsService } from 'src/app/services/get-plguins.service';

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.css']
})
export class DragDropComponent implements OnInit {

  historyChanges = []
  pointer = 0

  // todos = [
  //   {
  //     name: 'If',
  //     category: 'Web Development'
  //   },
  //   {
  //     name: 'elseif',
  //     category: 'Web Development'
  //   },
  //   {
  //     name: 'Else',
  //     category: 'App Development'
  //   }
  // ];

  inputPlugins: Plugin[] = [];

  filterPlugins: Plugin[] = [];

  outputPlugins: Plugin[] = [];

  inputs: Plugin[] = [
    {
      name: 'Jdbc',
      type: 'Input',
      description: 'This plugin was created as a way to ingest data in any database with a JDBC interface into Logstash. You can periodically schedule ingestion using a cron syntax (see schedule setting) or run the query one time to load data into Logstash. Each row in the resultset becomes a single event. Columns in the resultset are converted into fields in the event.',
      avalibleConfigs: [
        {
          setting: 'jdbc_connection_string',
          type: 'string',
          required: true,
          hasValueList: false,
          requiredDepends: false
        }
      ],
      version: "v5.1.5",
      releasedDate: "2021-08-04",
      configs: [
        {
          setting: 'jdbc_connection_string',
          type: 'string',
          required: true,
          hasValueList: false,
          requiredDepends: false
        }
      ]
    }
  ];
  filters = [
    {
      name: 'grock',
      type: 'filter',
      description: 'do grock things'
    }
  ];
  outputs = [
    {
      name: 'File',
      type: 'Output',
      description: 'move things to a file'
    }
  ];

  onDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data,
        event.previousIndex,
        event.currentIndex);
    } else {
      copyArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex, event.currentIndex);
    }
    let newObj = {
      inputs: JSON.parse(JSON.stringify(this.inputs)),
      filters: JSON.parse(JSON.stringify(this.filters)),
      outputs: JSON.parse(JSON.stringify(this.outputs)),
    }
    if (JSON.stringify((this.historyChanges[this.pointer])) !== JSON.stringify(newObj)) {
      this.historyChanges.push(newObj)
      this.pointer++;
    }
  }

  onBack() {
    if (this.pointer === 0) {
      return;
    }
    else {
      this.pointer--;
      this.inputs = this.historyChanges[this.pointer].inputs
      this.filters = this.historyChanges[this.pointer].filters
      this.outputs = this.historyChanges[this.pointer].outputs
    }
  }

  onNext() {
    if (this.pointer === (this.historyChanges.length - 1)) {
      return;
    }
    else {
      this.pointer++;
      this.inputs = this.historyChanges[this.pointer].inputs
      this.filters = this.historyChanges[this.pointer].filters
      this.outputs = this.historyChanges[this.pointer].outputs
    }
  }

  removeItem(obj: any) {

  }

  constructor(public getPluginsService: GetPlguinsService) { }

  ngOnInit(): void {
    var request = this.getPluginsService.getPlugins("input").subscribe((resp: any) => {
      console.log(resp)
      resp.hits.hits.forEach(element => {
        this.inputPlugins.push(element._source)
      });
    });
    var request = this.getPluginsService.getPlugins("filter").subscribe((resp: any) => {
      console.log(resp)
      resp.hits.hits.forEach(element => {
        this.filterPlugins.push(element._source)
      });
    });
    var request = this.getPluginsService.getPlugins("output").subscribe((resp: any) => {
      console.log(resp)
      resp.hits.hits.forEach(element => {
        this.outputPlugins.push(element._source)
      });
    });
    this.historyChanges.push(
      {
        inputs: JSON.parse(JSON.stringify(this.inputs)),
        filters: JSON.parse(JSON.stringify(this.filters)),
        outputs: JSON.parse(JSON.stringify(this.outputs)),
      }
    )
  }
}
