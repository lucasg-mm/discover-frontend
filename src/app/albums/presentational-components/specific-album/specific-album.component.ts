import { Component, OnInit, Input } from '@angular/core';
import { Album } from '../../models/album.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-specific-album',
  templateUrl: './specific-album.component.html',
  styleUrls: ['./specific-album.component.css'],
})
export class SpecificAlbumComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // gets the artists names from the array
    this.artistsNames = this.getArtistsNames();

    // gets the album's cover art url
    this.coverArtUrl = this.getCoverArtUrl(this.album.id!);

    // gets the album's title
    this.albumTitle = this.getAlbumTitle();
  }


  // returns the artists names separated by commas
  // (it's truncated if it's too long)
  getArtistsNames(): string {
    // if the artist's name is longer than maxChars, it's truncated
    const maxChars = 15;

    // get the names separated by commas
    const artistsNames = this.album.artists.reduce(
      (names, artist) =>
        names === '' ? artist.name : names + ', ' + artist.name,
      ''
    );

    return artistsNames.length <= maxChars
      ? artistsNames
      : artistsNames.substring(0, maxChars) + "...";
  }

  // returns the album's title
  // (it's truncated if it's too long)
  getAlbumTitle(): string {
    // if the title is longer than maxChars, it's truncated
    const maxChars = 15;

    return this.album.title.length <= maxChars
      ? this.album.title
      : this.album.title.substring(0, maxChars) + '...';
  }

  // get album cover art url
  getCoverArtUrl(albumId: string): string {
    const apiUrl = environment.apiUrl;
    return `${apiUrl}/albums/${albumId}/cover`;
  }

  @Input()
  album!: Album;

  artistsNames: string = '';

  coverArtUrl: string = '';

  albumTitle: string = '';
}
