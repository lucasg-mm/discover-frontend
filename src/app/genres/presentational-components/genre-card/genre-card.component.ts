import { Component, Input, OnInit } from '@angular/core';
import { Genre } from '../../models/genre.model';

@Component({
  selector: 'app-genre-card',
  templateUrl: './genre-card.component.html',
  styleUrls: ['./genre-card.component.css'],
})
export class GenreCardComponent implements OnInit {
  @Input()
  genre: Genre;

  formattedGenreName: string = '';

  constructor() {}

  ngOnInit(): void {
    this.formattedGenreName = this.getFormattedGenreName();
  }

  getFormattedGenreName(): string{
    const maxChars: number = 15;

    const genreName: string = this.genre.name;

    return genreName.length <= maxChars
      ? genreName
      : genreName.substring(0, maxChars) + '...';
  }
}
