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
  }

  getArtistsNames(): string {
    return this.album.artists.reduce(
      (names, artist) =>
        names === '' ? artist.name : names + ', ' + artist.name,
      ''
    );
  }

    // get album cover art url
    getCoverArtUrl(albumId: string): string{
      const apiUrl =  environment.apiUrl;
      return `${apiUrl}/albums/${albumId}/cover`
    }

  @Input()
  album!: Album;

  artistsNames: string = '';

  coverArtUrl: string = '';
}
