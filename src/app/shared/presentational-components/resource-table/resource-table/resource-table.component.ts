import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Resource } from 'src/app/shared/models/resource.model';

@Component({
  selector: 'app-resource-table',
  templateUrl: './resource-table.component.html',
  styleUrls: ['./resource-table.component.css']
})
export class ResourceTableComponent implements OnInit {

  // the resources that should be displayed in the table
  @Input()
  resources: Resource[];

  // emitted when the attach button is clicked 
  @Output()
  attach: EventEmitter<string> = new EventEmitter();

  // emitted when the detach button is clicked
  @Output()
  detach: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  emitAttachEvent(id: string): void{
    this.attach.emit(id);
  }
}
