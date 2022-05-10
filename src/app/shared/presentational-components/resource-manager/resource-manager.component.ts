import {
  Component,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Resource } from '../../models/resource.model';

@Component({
  selector: 'app-resource-manager',
  templateUrl: './resource-manager.component.html',
  styleUrls: ['./resource-manager.component.css'],
})
export class ResourceManagerComponent implements OnInit {
  // holds the resources that can be attached to another specific one
  // (for example, tracks/artists/genres that can be attached to a certain album)
  @Input()
  resourcesToBeAttached: Resource[];

  // holds the resources that are already attached to another specific one
  // (for example, tracks/artists/genres that are already attached to a certain album)
  @Input()
  alreadyAttachedResources: Resource[];

  // searches for a resource to be attached
  @Output()
  search: EventEmitter<string> = new EventEmitter();

  // attach a resource to the specific one
  @Output()
  attach: EventEmitter<string> = new EventEmitter();

  // detach a resource from the specific one
  @Output()
  detach: EventEmitter<string> = new EventEmitter();

  @Output()
  close: EventEmitter<void> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}


  emitAttachEvent(id: string): void {
    this.attach.emit(id);
  }

  emitDetachEvent(): void {
    console.log('Detach!!!');
  }

  emitSearchEvent(searchTerm: string): void{
    this.search.emit(searchTerm);
  }

  emitCloseEvent(): void{
    this.close.emit();
  }
}
