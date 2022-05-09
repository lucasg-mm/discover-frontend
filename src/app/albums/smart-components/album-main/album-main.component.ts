import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumsService } from '../../albums.service';
import { TracksService } from 'src/app/tracks/tracks.service';

@Component({
  selector: 'app-album-main',
  templateUrl: './album-main.component.html',
  styleUrls: ['./album-main.component.css'],
})
export class AlbumMainComponent implements OnInit {
  albumTitle: string;
  artistsNames: string;
  formattedAlbumLength: string;
  formattedReleaseDate: string;
  albumLabel: string;
  isAlbumLoaded: boolean = false;
  albumCoverArtUrl: string;
  showTrackManager: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private albumService: AlbumsService,
    private trackService: TracksService
  ) {}

  ngOnInit(): void {
    const albumId = parseInt(
      this.activatedRoute.snapshot.paramMap.get('albumId')!
    );
    this.getAlbumById(albumId);
  }

  getArtistsNames(artists: any[]): string {
    const artistsNames = artists.reduce(
      (names, artist) =>
        names === '' ? artist.name : names + ', ' + artist.name,
      ''
    );

    return artistsNames;
  }

  // takes the album's length (in seconds), and returns a formatted string,
  // like 55min, 1h 20min, etc...
  getFormattedAlbumLength(albumLength: number): string {
    let hours: number;
    let minutes: number;

    // gets the number of hours and minutes
    hours = Math.floor(albumLength / 3600);
    minutes = Math.floor((albumLength % 3600) / 60);

    // displays hours and minutes (just minutes, if the album is not longer than an hour)
    return hours !== 0 ? `${hours}h ${minutes}min` : `${minutes}min`;
  }

  // converts date from yyyy-MM-dd to dd/MM/yyyy
  getFormattedDate(date: string): string {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  }

  // gets a certain album by its id
  getAlbumById(id: number): void {
    this.albumService.findAlbumById(id).subscribe((res) => {
      // gets the relevant info from the api
      this.artistsNames = this.getArtistsNames(res.artists!);
      this.formattedAlbumLength = this.getFormattedAlbumLength(res.length);
      this.formattedReleaseDate = this.getFormattedDate(res.releaseDate!);
      this.albumTitle = res.title;
      this.albumLabel = res.label;
      this.albumCoverArtUrl = this.albumService.getCoverArtUrl(res.id!);

      // changes flag to indicate the album loaded
      this.isAlbumLoaded = true;
    });
  }

  // if the image loading fails, substitutes the url by the local default album cover
  // ******duplicated code (how to avoid it?)*******
  insertDefaultAlbumCover(): void {
    this.albumCoverArtUrl = 'assets/images/default-cover.png';
  }

  openTrackManager(): void {
    this.showTrackManager = true;
  }

  searchTracks(searchTerm: string, pageNumber: number = 1): void {
    this.trackService.searchTracks(searchTerm, pageNumber).subscribe((res) => {
      console.log(res);
    });
  }
}
