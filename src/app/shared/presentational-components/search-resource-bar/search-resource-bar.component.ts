import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounce } from 'lodash';

@Component({
  selector: 'app-search-resource-bar',
  templateUrl: './search-resource-bar.component.html',
  styleUrls: ['./search-resource-bar.component.css']
})
export class SearchResourceBarComponent implements OnInit {
  // the term being searched
  searchTerm: string;

  // should the input text show a loading spinner?
  @Input()
  isLoading: boolean = false;

  // searches for a resource to be attached
  @Output()
  search: EventEmitter<string> = new EventEmitter();

  constructor() {
    this.emitSearchEvent = debounce(this.emitSearchEvent, 700);
  }

  ngOnInit(): void {
  }

  // emits the search event 
  emitSearchEvent(): void {
    this.search.emit(this.searchTerm);
  }
}
