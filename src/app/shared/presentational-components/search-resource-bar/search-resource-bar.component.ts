import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { debounce } from 'lodash';

@Component({
  selector: 'app-search-resource-bar',
  templateUrl: './search-resource-bar.component.html',
  styleUrls: ['./search-resource-bar.component.css']
})
export class SearchResourceBarComponent implements OnInit {
  // the term being searched
  searchTerm: string;

  // searches for a resource to be attached
  @Output()
  search: EventEmitter<string> = new EventEmitter();

  constructor() {
    this.emitSearchEvent = debounce(this.emitSearchEvent, 800);
  }

  ngOnInit(): void {
  }

  // emits the search event 
  emitSearchEvent(): void {
    console.log("Heyheyhey");
    this.search.emit(this.searchTerm);
  }
}
