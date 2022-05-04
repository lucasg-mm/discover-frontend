import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-album-creator',
  templateUrl: './album-creator.component.html',
  styleUrls: ['./album-creator.component.css']
})
export class AlbumCreatorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Output()
  close: EventEmitter<any> = new EventEmitter();

  emitCloseEvent(): void{
    this.close.emit();
  }
}
