import { Component, Input, OnInit } from '@angular/core';
import { AlbumsService } from 'src/app/albums/albums.service';
import { Track } from '../../models/track.model';
import { TracksService } from '../../tracks.service';

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

  constructor(private albumService: AlbumsService) {}

  ngOnInit(): void {
    this.formattedTrackName = this.getFormattedTrackName();
    if(this.track.album){
      this.trackCoverUrl = this.albumService.getCoverArtUrl(this.track.album.id!);
    }
    else{
      this.insertDefaultTrackCover();
    }
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
