import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumsService } from '../../albums.service';
import { TracksService } from 'src/app/tracks/tracks.service';
import { Resource } from 'src/app/shared/models/resource.model';
import { Track } from 'src/app/tracks/models/track.model';
import * as bulmaToast from 'bulma-toast';

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
  albumId: string;
  isAlbumLoaded: boolean = false;
  albumCoverArtUrl: string;
  showTrackManager: boolean = false;
  resourcesToBeAttached: Resource[] = [];
  alreadyAttachedResources: Resource[] = [];
  tracks: Track[];
  resourceInitialPage: number = 1;
  resourceFinalPage: number = 10;

  constructor(
    private activatedRoute: ActivatedRoute,
    private albumService: AlbumsService,
    private trackService: TracksService
  ) {}

  ngOnInit(): void {
    this.albumId = this.activatedRoute.snapshot.paramMap.get('albumId')!;
    this.loadAlbumInfo();
    this.loadTracks();
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

  // loads the album's info
  loadAlbumInfo(): void {
    const albumId = this.albumId;
    this.albumService.findAlbumById(albumId).subscribe((res) => {
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

  // opens the modal to add/remove tracks
  openTrackManager(): void {
    this.resourceInitialPage = 1;
    this.loadAllTracksFromPage(1);
    this.showTrackManager = true;
  }

  // loads all tracks from a certain page
  loadAllTracksFromPage(pageNumber: number): void{
    this.trackService.getAllTracks(pageNumber).subscribe((res) => {
      // getting the final page information
      this.resourceFinalPage = res.totalPages;

      // the search input is for the resources to be attached
      // so, we parse the Track array to a Resource array
      this.resourcesToBeAttached = this.parsesTracksToAlreadyAttachedResources(
        res.items
      );
    });
  }

  // starts the loading of all tracks inside the tracklist
  loadTracks(): void {
    const albumId = this.albumId;

    // get every track of an album
    // assigns it to the tracks property
    this.albumService.getAllTracksFromAlbum(albumId).subscribe((res) => {
      // parsing the tracks array to a format that can be used by the app
      this.tracks = this.parsesTracksToTrackListFormat(res);

      // parsing the tracks array to a format that can be used by the resource generator
      this.alreadyAttachedResources =
        this.parsesTracksToAlreadyAttachedResources(res);
    });
  }

  // the already attached resources expects the track data in certain format
  // this just parses a Track array to a Resource array
  parsesTracksToAlreadyAttachedResources(tracks: Track[]): Resource[] {
    return tracks.map((track) => {
      return {
        id: track.id,
        name: track.title,
      };
    });
  }

  // do data manipulation on some Track's properties, to make
  // it appropriate to display it on the track list component
  parsesTracksToTrackListFormat(tracks: Track[]): Track[] {
    return tracks.map((track) => {
      return track;
    });
  }

  // attach a track with a certain id to this album
  attachTrackToAlbum(trackId: string): void {
    const albumId = this.albumId;

    this.albumService.attachTrackToAlbum(albumId, trackId).subscribe((res) => {
      // reloads the tracklist
      this.loadTracks();
      bulmaToast.toast({ message: 'Track attached!', type: 'is-success' });
    });
  }

  // detach a track with a certain id from this album
  detachTrackFromAlbum(trackId: string): void {
    const albumId = this.albumId;

    this.albumService
      .detachTrackFromAlbum(albumId, trackId)
      .subscribe((res) => {
        this.loadTracks();
        bulmaToast.toast({ message: 'Track detached!', type: 'is-success' });
      });
  }

  // search for tracks (the result is paginated)
  searchTracks(searchTerm: string, pageNumber: number = 1): void {
    this.trackService.searchTracks(searchTerm, pageNumber).subscribe((res) => {
      // getting page information
      this.resourceInitialPage = 1;
      this.resourceFinalPage = res.totalPages;

      // the search input is for the resources to be attached
      // so, we parse the Track array to a Resource array
      this.resourcesToBeAttached = this.parsesTracksToAlreadyAttachedResources(
        res.items
      );
    });
  }

  // closes the track manager modal
  closeTrackManager(): void {
    this.showTrackManager = false;
  }
}
