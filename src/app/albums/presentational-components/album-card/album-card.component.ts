import { Component, OnInit, Input } from '@angular/core';
import { Album } from '../../models/album.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-album-card',
  templateUrl: './album-card.component.html',
  styleUrls: ['./album-card.component.css'],
})
export class AlbumCardComponent implements OnInit {
  constructor() {}

  @Input()
  album!: Album;

  artistsNames: string = '';

  coverArtUrl: string = '';

  albumTitle: string = '';

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
    let artistsNames;
    if (this.album.artists?.length) {
      artistsNames = this.album.artists.reduce(
        (names, artist) =>
          names === '' ? artist.name : names + ', ' + artist.name,
        ''
      );
    } else {
      artistsNames = '&nbsp';  // renders white space if there are no artists in the album
    }

    return artistsNames.length <= maxChars
      ? artistsNames
      : artistsNames.substring(0, maxChars) + '...';
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

  // if the image loading fails, substitutes the url by the local default album cover
  insertDefaultAlbumCover(): void {
    this.coverArtUrl = 'assets/images/default-cover.png';
  }
}
