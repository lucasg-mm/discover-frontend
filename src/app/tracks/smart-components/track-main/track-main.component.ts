import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Track } from '../../models/track.model';
import { TracksService } from '../../tracks.service';
import { map, mergeMap } from 'rxjs/operators';
import { Artist } from 'src/app/artists/models/artists.model';
import { Genre } from 'src/app/genres/models/genre.model';
import { AlbumsService } from 'src/app/albums/albums.service';

@Component({
  selector: 'app-track-main',
  templateUrl: './track-main.component.html',
  styleUrls: ['./track-main.component.css'],
})
export class TrackMainComponent implements OnInit {
  track: Track;
  trackCoverURL: string = '';
  isTrackLoaded: boolean = false;
  formattedGenres: string = '';
  formattedArtists: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private tracksService: TracksService,
    private albumsService: AlbumsService
  ) {}

  ngOnInit(): void {
    const trackId = Number(
      this.activatedRoute.snapshot.paramMap.get('trackId')
    );
    this.loadTrackInfo(trackId).subscribe(() => {
      this.isTrackLoaded = true;

      if (this.track.album) {
        this.updateTrackCover(this.track.album.id!);
      } else {
        this.insertDefaultTrackCover();
      }
    });
  }

  updateTrackCover(albumId: number): void{
      this.trackCoverURL = this.albumsService.getCoverArtUrl(albumId);
  }

  insertDefaultTrackCover(): void{
    this.trackCoverURL = 'assets/images/default-cover.png';
  }

  loadTrackInfo(trackId: number): Observable<void> {
    return this.tracksService.findTrackById(trackId).pipe(
      map((res) => {
        this.track = res;
        this.formattedGenres = this.getFormattedGenres(res.genres!);
        this.formattedArtists = this.getFormattedArtists(res.artists!);
      })
    );
  }

  getFormattedGenres(genres: Genre[]): string {
    const formattedGenres: string = genres.reduce(
      (names, genre) => (names === '' ? genre.name : names + ', ' + genre.name),
      ''
    );

    return formattedGenres;
  }

  getFormattedArtists(artists: Artist[]): string {
    const formattedArtists: string = artists.reduce(
      (names, artist) => (names === '' ? artist.name : names + ', ' + artist.name),
      ''
    );

    return formattedArtists;
  }
}
