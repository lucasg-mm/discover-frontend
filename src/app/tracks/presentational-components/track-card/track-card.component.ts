import { Component, Input, OnInit } from '@angular/core';
import { AlbumsService } from 'src/app/albums/albums.service';
import { Track } from '../../models/track.model';

@Component({
  selector: 'app-track-card',
  templateUrl: './track-card.component.html',
  styleUrls: ['./track-card.component.css'],
})
export class TrackCardComponent implements OnInit {
  @Input()
  track: Track;

  trackCoverUrl: string = '';

  formattedTrackName: string = '';

  artistsNames: string = '';

  constructor(private albumService: AlbumsService) {}

  ngOnInit(): void {
    this.formattedTrackName = this.getFormattedTrackName();

    // gets the artists names from the array
    this.artistsNames = this.getArtistsNames();

    if (this.track.album) {
      this.trackCoverUrl = this.albumService.getCoverArtUrl(
        this.track.album.id!
      );
    } else {
      this.insertDefaultTrackCover();
    }
  }

  // returns the artists names separated by commas
  // (it's truncated if it's too long)
  getArtistsNames(): string {
    // if the artist's name is longer than maxChars, it's truncated
    const maxChars = 15;

    // get the names separated by commas
    let tracksNames;
    if (this.track.artists?.length) {
      tracksNames = this.track.artists.reduce(
        (names, artist) =>
          names === '' ? artist.name : names + ', ' + artist.name,
        ''
      );
    } else {
      tracksNames = '&nbsp'; // renders white space if there are no artists in the album
    }

    return tracksNames.length <= maxChars
      ? tracksNames
      : tracksNames.substring(0, maxChars) + '...';
  }

  // returns the track's name (truncated if it's too long)
  getFormattedTrackName(): string {
    const maxChars: number = 15;

    const trackName: string = this.track.title;

    return trackName.length <= maxChars
      ? trackName
      : trackName.substring(0, maxChars) + '...';
  }

  // if the image loading fails, substitutes the url by the local cover picture
  insertDefaultTrackCover(): void {
    this.trackCoverUrl = 'assets/images/default-cover.png';
  }
}
