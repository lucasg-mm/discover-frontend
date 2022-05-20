import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Resource } from '../../models/resource.model';

@Component({
  selector: 'app-resource-manager',
  templateUrl: './resource-manager.component.html',
  styleUrls: ['./resource-manager.component.css'],
})
export class ResourceManagerComponent implements OnInit {
  // tells whether the user is searching for a resource
  // or just viewing all the resources
  isSearching: boolean = false;

  // holds the resources that can be attached to another specific one
  // (for example, tracks/artists/genres that can be attached to a certain album)
  @Input()
  resourcesToBeAttached: Resource[];

  // holds the resources that are already attached to another specific one
  // (for example, tracks/artists/genres that are already attached to a certain album)
  @Input()
  alreadyAttachedResources: Resource[];

  @Input()
  currPage: number = 1;

  @Input()
  finalPage: number = 10;

  @Input()
  resourceName = '';

  // searches for a resource to be attached
  @Output()
  search: EventEmitter<string> = new EventEmitter();

  // attach a resource to the specific one
  @Output()
  attach: EventEmitter<number> = new EventEmitter();

  // detach a resource from the specific one
  @Output()
  detach: EventEmitter<number> = new EventEmitter();

  // tells the parent the user clicked either in
  // the close icon, or outside the modal
  @Output()
  close: EventEmitter<void> = new EventEmitter();

  // tells the parent the user wants to go to a certain page
  // of a search
  @Output()
  pageChangeSearch: EventEmitter<any> = new EventEmitter();

  // tells the parent the user wants to go to a certain page
  // when viewing all resources
  @Output()
  pageChangeAll: EventEmitter<number> = new EventEmitter();

  currSearchTerm: string = '';

  // tells if the search input should be on loading state or not
  @Input()
  isLoading = false;

  constructor() {}

  ngOnInit(): void {}

  emitAttachEvent(id: number): void {
    this.attach.emit(id);
  }

  emitDetachEvent(id: number): void {
    this.detach.emit(id);
  }

  emitSearchEvent(searchTerm: string): void {
    if (searchTerm === '') {
      // if the search term is the empty string,
      // the user will view every track
      this.isSearching = false;
    } else {
      // if the search term is NOT the empty string,
      // the user will view the search results
      this.isSearching = true;
    }
    this.currSearchTerm = searchTerm;
    this.search.emit(searchTerm);
  }

  emitCloseEvent(): void {
    this.close.emit();
  }

  emitPageChangeTypeEvent(pageToGo: number): void {
    if (this.isSearching) {
      this.pageChangeSearch.emit({
        pageToGo,
        searchTerm: this.currSearchTerm,
      });
    } else {
      this.pageChangeAll.emit(pageToGo);
    }
  }
}
