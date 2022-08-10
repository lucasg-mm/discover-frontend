import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
EventEmitter

@Component({
  selector: 'app-like-button',
  templateUrl: './like-button.component.html',
  styleUrls: ['./like-button.component.css']
})
export class LikeButtonComponent implements OnInit {

  @Input()
  isLiked: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  @Output()
  like: EventEmitter<void> = new EventEmitter();

  @Output()
  dislike: EventEmitter<void> = new EventEmitter();

  toggleLike(): void{
    this.isLiked = !this.isLiked;

    if (this.isLiked) {
      this.like.emit();
    }
    else{
      this.dislike.emit();
    }
  }

}
