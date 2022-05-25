import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-album-superior-bar',
  templateUrl: './album-superior-bar.component.html',
  styleUrls: ['./album-superior-bar.component.css']
})
export class AlbumSuperiorBarComponent implements OnInit {

  constructor() { }

  @Input()
  isLoading: boolean = false;

  @Output()
  createAlbum: EventEmitter<any> = new EventEmitter();

  @Output()
  search: EventEmitter<string> = new EventEmitter();

  emitSearchEvent(searchTerm: string): void{
    this.search.emit(searchTerm);
  }

  ngOnInit(): void {
  }

  emitCreateAlbumEvent(): void {
    this.createAlbum.emit();
  }

}
