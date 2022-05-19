import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumsService } from '../../albums.service';
import { TracksService } from 'src/app/tracks/tracks.service';
import { Resource } from 'src/app/shared/models/resource.model';
import { Track } from 'src/app/tracks/models/track.model';
import * as bulmaToast from 'bulma-toast';
import { Artist } from 'src/app/artists/models/artists.model';
import { ArtistsService } from 'src/app/artists/artists.service';
import { Genre } from 'src/app/genres/models/genre.model';
import { Album } from '../../models/album.model';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

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
  albumId: number;
  isAlbumLoaded: boolean = false;
  albumCoverArtUrl: string;
  showTrackManager: boolean = false;
  showArtistManager: boolean = false;
  showGenreManager: boolean = false;
  resourcesToBeAttached: Resource[] = [];
  alreadyAttachedResources: Resource[] = [];
  tracklist: Track[]; // an array of objects formatted to be displayed in the tracklist
  resourceCurrPage: number = 1;
  resourceFinalPage: number = 10;
  genres: Genre[];
  artists: Artist[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private albumService: AlbumsService,
    private trackService: TracksService,
    private artistService: ArtistsService
  ) {}

  ngOnInit(): void {
    this.albumId = Number(
      this.activatedRoute.snapshot.paramMap.get('albumId')!
    );
    this.loadAlbumInfo();
    this.loadTracklist().subscribe();
  }

  getArtistsNames(artists: Artist[]): string {
    const artistsNames = artists.reduce(
      (names, artist) =>
        names === '' ? artist.name : names + ', ' + artist.name,
      ''
    );

    return artistsNames;
  }

  // takes the album's length (in seconds), and returns a formatted string,
  // mode 'info': 55min, 1h 20min, etc...
  // mode
  getFormattedAlbumLength(albumLength: number, format = 'info'): string {
    let hours: number;
    let minutes: number;

    // gets the number of hours and minutes
    hours = Math.floor(albumLength / 3600);
    minutes = Math.floor((albumLength % 3600) / 60);

    if (format === 'info') {
      // displays hours and minutes (just minutes, if the album is not longer than an hour)
      return hours !== 0 ? `${hours}h ${minutes}min` : `${minutes}min`;
    } else if (format === 'tracklist') {
      // gets the  number of seconds,
      // representing it with at least two digits, like 05 minutes, 15 minutes, etc
      const seconds = (albumLength % 60).toLocaleString(undefined, {
        minimumIntegerDigits: 2,
      });
      // displays hours and minutes (just minutes, if the album is not longer than an hour)
      return `${minutes}:${seconds}`;
    }

    return '';
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
      this.genres = res.genres!;
      this.artists = res.artists!;

      // changes flag to indicate the album loaded
      this.isAlbumLoaded = true;
    });
  }

  // if the image loading fails, substitutes the url by the local default album cover
  // ******duplicated code (how to avoid it?)*******
  insertDefaultAlbumCover(): void {
    this.albumCoverArtUrl = 'assets/images/default-cover.png';
  }

  // opens the resource manager modal, loading its relevant data
  openResourceManager(resourceType: string): void {
    this.loadToBeAttachedResource(resourceType);
    this.loadAlreadyAttachedResources(resourceType);
    if (resourceType === 'artist') {
      this.showArtistManager = true;
    } else if (resourceType === 'track') {
      this.showTrackManager = true;
    } else if (resourceType === 'genre') {
      this.showGenreManager = true;
    }
  }

  // starts the loading of all tracks inside the tracklist
  loadTracklist(): Observable<void> {
    const albumId = this.albumId;

    // get every track of an album
    // assigns it to the tracks property
    return this.albumService.getAllTracksFromAlbum(albumId).pipe(
      map((res) => {
        // parsing the tracks array to a format that can be used by the app
        this.tracklist = this.parsesTracksToTrackListFormat(res);
      })
    );
  }

  loadToBeAttachedResource(resourceType: string): void {
    if (resourceType === 'artist') {
      this.resourceCurrPage = 1;
      this.loadAllArtistsFromPage(1);
    } else if (resourceType === 'track') {
      this.resourceCurrPage = 1;
      this.loadAllTracksFromPage(1);
    } else if (resourceType === 'genre') {
      this.resourceCurrPage = 1;
      this.loadAllGenresFromPage(1);
    }
  }

  loadAlreadyAttachedResources(resourceType: string): void {
    if (resourceType === 'artist') {
      this.alreadyAttachedResources = this.parsesArtistOrGenreToResources(
        this.artists
      );
    } else if (resourceType === 'track') {
      this.alreadyAttachedResources = this.parsesTracksOrAlbumsToResources(
        this.tracklist
      );
    } else if (resourceType === 'genre') {
      this.alreadyAttachedResources = this.parsesArtistOrGenreToResources(
        this.genres
      );
    }
  }

  // do data manipulation on some Track's properties, to make
  // it appropriate to display it on the track list component
  parsesTracksToTrackListFormat(tracks: Track[]): any {
    return tracks.map((track) => {
      return {
        id: track.id,
        title: track.title,
        length: this.getFormattedAlbumLength(track.length, 'tracklist'),
        artists: this.getArtistsNames(track.artists!),
      };
    });
  }

  // this just parses a Track or Album array to a Resource array
  parsesTracksOrAlbumsToResources(
    tracksOrAlbums: Track[] | Album[]
  ): Resource[] {
    return tracksOrAlbums.map((trackOrAlbum) => {
      return {
        id: trackOrAlbum.id,
        name: trackOrAlbum.title,
      };
    });
  }

  // this just parses a Artist[] or Genre[] to a Resource[]
  parsesArtistOrGenreToResources(
    artistsOrGenres: Genre[] | Artist[]
  ): Resource[] {
    return artistsOrGenres.map((artistOrGenre) => {
      return {
        id: artistOrGenre.id,
        name: artistOrGenre.name,
      };
    });
  }

  // attach a track with a certain id to this album
  attachTrackToAlbum(trackId: number): void {
    const albumId = this.albumId;

    this.albumService
      .attachTrackToAlbum(albumId, trackId)
      .pipe(mergeMap(() => this.loadTracklist()))
      .subscribe(() => {
        this.loadAlreadyAttachedResources('track');
        bulmaToast.toast({ message: 'Track attached!', type: 'is-success' });
      });
  }

  attachGenreToAlbum(genreId: number): void {
    console.log('TODO');
  }

  attachArtistToAlbum(artistId: number): void {
    const albumId = this.albumId;

    // request to attach the artist
    this.artistService
      .attachAlbumToArtist(artistId, albumId)
      .subscribe((res) => {
        // reloads the album info
        this.loadAlbumInfo();
        bulmaToast.toast({ message: 'Artist attached!', type: 'is-success' });
      });
  }

  // detach a track with a certain id from this album
  detachTrackFromAlbum(trackId: number): void {
    const albumId = this.albumId;

    this.albumService
      .detachTrackFromAlbum(albumId, trackId)
      .pipe(mergeMap(() => this.loadTracklist()))
      .subscribe(() => {
        this.loadAlreadyAttachedResources('track');
        bulmaToast.toast({ message: 'Track detached!', type: 'is-success' })
      });
  }

  detachGenreFromAlbum(genreId: number): void {
    console.log('TODO');
  }

  detachArtistFromAlbum(artistId: number): void {
    console.log('TODO');
  }

  // search for tracks (the result is paginated)
  searchTracks(searchTerm: string, pageNumber: number = 1): void {
    // if the the search term is the empty string
    // returns all the tracks
    if (searchTerm === '') {
      this.loadAllTracksFromPage(1);
      return;
    }

    this.trackService
      .searchTracks(searchTerm, pageNumber, 5)
      .subscribe((res) => {
        // getting page information
        this.resourceCurrPage = pageNumber;
        this.resourceFinalPage = res.totalPages;

        // the search input is for the resources to be attached
        // so, we parse the Track array to a Resource array
        this.resourcesToBeAttached = this.parsesTracksOrAlbumsToResources(
          res.items
        );
      });
  }

  searchGenres(searchTerm: string, pageNumber: number = 1): void {
    if (searchTerm === '') {
      this.loadAllGenresFromPage(1);
    }
  }

  // search for artists in a paginatedway
  searchArtists(searchTerm: string, pageNumber: number = 1): void {
    if (searchTerm === '') {
      this.loadAllArtistsFromPage(1);
    }

    this.artistService
      .searchArtists(searchTerm, pageNumber, 5)
      .subscribe((res) => {
        // getting page information
        this.resourceCurrPage = pageNumber;
        this.resourceFinalPage = res.totalPages;

        // the search input is for the resources to be attached
        // so, we parse the track array to a resource array
        this.resourcesToBeAttached = this.parsesArtistOrGenreToResources(
          res.items
        );
      });
  }

  // closes the track manager modal
  closeTrackManager(): void {
    this.showTrackManager = false;
  }

  // closes the genre manager modal
  closeGenreManager(): void {
    this.showGenreManager = false;
  }

  // closes the artist manager modal
  closeArtistManager(): void {
    this.showArtistManager = false;
  }

  // loads all tracks from a certain page
  loadAllTracksFromPage(pageNumber: number): void {
    this.trackService.getAllTracks(pageNumber, 5).subscribe((res) => {
      // getting the final page information
      this.resourceFinalPage = res.totalPages;

      // changes the initial page
      this.resourceCurrPage = pageNumber;

      // the search input is for the resources to be attached
      // so, we parse the Track array to a Resource array
      this.resourcesToBeAttached = this.parsesTracksOrAlbumsToResources(
        res.items
      );
    });
  }

  loadAllArtistsFromPage(pageNumber: number): void {
    this.artistService.getAllArtists(pageNumber, 5).subscribe((res) => {
      // getting the final page information
      this.resourceFinalPage = res.totalPages;

      // changes the initial page
      this.resourceCurrPage = pageNumber;

      // parses artists to resources
      this.resourcesToBeAttached = this.parsesArtistOrGenreToResources(
        res.items
      );
    });
  }

  loadAllGenresFromPage(pageNumber: number): void {
    // this.genreService.getAllArtists(pageNumber, 5).subscribe((res) => {
    //   // getting the final page information
    //   this.resourceFinalPage = res.totalPages;
    //   // changes the initial page
    //   this.resourceCurrPage = pageNumber;
    // });
  }
}
