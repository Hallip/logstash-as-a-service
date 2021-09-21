import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.css']
})
export class DragDropComponent implements OnInit {

  title = 'Drag & Drop in Angular 7';
  website = 'https://samorgill.com';

  historyChanges = []
  pointer = 0

  todos = [
    {
      name: 'Angular',
      category: 'Web Development'
    },
    {
      name: 'Flexbox',
      category: 'Web Development'
    },
    {
      name: 'iOS',
      category: 'App Development'
    },
    {
      name: 'Java',
      category: 'Software development'
    }
  ];

  inputs = [
    {
      name: 'Android',
      category: 'Mobile Development'
    }
  ];
  filters = [
    {
      name: 'Android',
      category: 'Mobile Development'
    }
  ];
  outputs = [
    {
      name: 'Android',
      category: 'Mobile Development'
    }
  ];
  reciclerBin = [
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

  constructor() { }

  ngOnInit(): void {
    this.historyChanges.push(
      {
        inputs: JSON.parse(JSON.stringify(this.inputs)),
        filters: JSON.parse(JSON.stringify(this.filters)),
        outputs: JSON.parse(JSON.stringify(this.outputs)),
      }
    )
  }
}
