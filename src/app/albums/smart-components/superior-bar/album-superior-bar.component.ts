import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-album-superior-bar',
  templateUrl: './album-superior-bar.component.html',
  styleUrls: ['./album-superior-bar.component.css']
})
export class AlbumSuperiorBarComponent implements OnInit {

  constructor() { }

  @Output()
  createAlbum: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
  }

  emitCreateAlbumEvent(): void {
    this.createAlbum.emit();
  }

}
