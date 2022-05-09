import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Resource } from '../../models/resource.model';

@Component({
  selector: 'app-resource-manager',
  templateUrl: './resource-manager.component.html',
  styleUrls: ['./resource-manager.component.css']
})
export class ResourceManagerComponent implements OnInit {

  @Input()
  resources: Resource[];

  @Output()
  search: EventEmitter<string> = new EventEmitter();

  searchTerm: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  emitSearchEvent(): void{
    this.search.emit(this.searchTerm);
  }

}
