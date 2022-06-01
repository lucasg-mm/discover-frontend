import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { GenresService } from 'src/app/genres/genres.service';

@Component({
  selector: 'app-album-main',
  templateUrl: './album-main.component.html',
  styleUrls: ['./album-main.component.css'],
})
export class AlbumMainComponent implements OnInit {
  albumTitle: string;
  artistsNames: string;
  releaseDate: string;
  length: number;
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
  isModalLoading: boolean = false;
  genres: Genre[];
  artists: Artist[];
  isAlbumCreatorVisible: boolean = false; // the creator modal is also used to update the album's data
  showConfirmationModal: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private albumService: AlbumsService,
    private trackService: TracksService,
    private artistService: ArtistsService,
    private genreService: GenresService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.albumId = Number(
      this.activatedRoute.snapshot.paramMap.get('albumId')!
    );
    this.loadAlbumInfo().subscribe();
    this.loadTracklist().subscribe();
  }

  // triggered when file is selected
  onFileSelect(event: any): void {
    const file: File = event.target.files[0];
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;

    // validates the file extension
    if (!allowedExtensions.exec(file.name)) {
      bulmaToast.toast({
        message: 'Please, select a .png, .jpeg, or .jpg!',
        type: 'is-danger',
      });
      return;
    }

    // uses the api to set the album cover art
    this.albumService.setAlbumCoverArt(file, this.albumId).subscribe(() => {
      bulmaToast.toast({ message: 'Cover art updated!', type: 'is-success' });

      // appends a timestamp to the cover art url
      // this makes the img tag tag update (without updating the whole page)
      this.albumCoverArtUrl =
        this.albumService.getCoverArtUrl(this.albumId) +
        '?random=' +
        new Date().getTime();
    });
  }

  openConfirmationModal(): void {
    this.showConfirmationModal = true;
  }

  closeConfirmationModal(): void {
    this.showConfirmationModal = false;
  }

  updateAlbumInfo(album: Album): void {
    this.albumService
      .updateAlbumInfo(this.albumId, album)
      .pipe(mergeMap(() => this.loadAlbumInfo()))
      .subscribe(() => {
        bulmaToast.toast({
          message: 'Album info updated!',
          type: 'is-success',
        });
      });
  }

  openAlbumCreatorModal(): void {
    this.isAlbumCreatorVisible = true;
  }

  closeAlbumCreatorModal(): void {
    this.isAlbumCreatorVisible = false;
  }

  getArtistsNames(artists: Artist[]): string {
    const artistsNames = artists.reduce(
      (names, artist) =>
        names === '' ? artist.name : names + ', ' + artist.name,
      ''
    );

    return artistsNames;
  }

  // deletes the album
  deleteAlbum(): void {
    console.log('This album is being deleted...');
    this.albumService.deleteAlbumById(this.albumId).subscribe(() => {
      bulmaToast.toast({ message: 'Album deleted!', type: 'is-success' });
      this.router.navigate(['/albums']);
    });
  }

  // takes the album's length (in seconds), and returns a formatted string,
  // mode 'info': 55min, 1h 20min, etc...
  // mode 'tracklist': 12:55, 02:08 (meaning 2 minutes and 8 seconds)
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
  loadAlbumInfo(): Observable<void> {
    const albumId = this.albumId;
    return this.albumService.findAlbumById(albumId).pipe(
      map((res) => {
        // gets the relevant info from the api
        this.releaseDate = res.releaseDate!;
        this.length = res.length;
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
      })
    );
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
    this.resourceCurrPage = 1;
    if (resourceType === 'artist') {
      this.loadAllArtistsFromPage(1);
    } else if (resourceType === 'track') {
      this.loadAllTracksFromPage(1);
    } else if (resourceType === 'genre') {
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
    const albumId = this.albumId;

    this.genreService
      .attachAlbumToGenre(genreId, albumId)
      .pipe(mergeMap(() => this.loadAlbumInfo()))
      .subscribe(() => {
        this.loadAlreadyAttachedResources('genre');
        bulmaToast.toast({ message: 'Genre attached!', type: 'is-success' });
      });
  }

  attachArtistToAlbum(artistId: number): void {
    const albumId = this.albumId;

    // request to attach the artist
    this.artistService
      .attachAlbumToArtist(artistId, albumId)
      .pipe(mergeMap(() => this.loadAlbumInfo()))
      .subscribe(() => {
        this.loadAlreadyAttachedResources('artist');
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
        bulmaToast.toast({ message: 'Track detached!', type: 'is-success' });
      });
  }

  detachGenreFromAlbum(genreId: number): void {
    const albumId = this.albumId;

    this.genreService
      .detachAlbumFromGenre(genreId, albumId)
      .pipe(mergeMap(() => this.loadAlbumInfo()))
      .subscribe(() => {
        this.loadAlreadyAttachedResources('genre');
        bulmaToast.toast({ message: 'Genre detached!', type: 'is-success' });
      });
  }

  // detach an artist from a certain album
  detachArtistFromAlbum(artistId: number): void {
    const albumId = this.albumId;

    this.artistService
      .detachAlbumFromArtist(albumId, artistId)
      .pipe(mergeMap(() => this.loadAlbumInfo()))
      .subscribe(() => {
        this.loadAlreadyAttachedResources('artist');
        bulmaToast.toast({ message: 'Artist detached!', type: 'is-success' });
      });
  }

  // search for tracks (the result is paginated)
  searchTracks(searchTerm: string, pageNumber: number = 1): void {
    this.isModalLoading = true;

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
        this.isModalLoading = false;
      });
  }

  searchGenres(searchTerm: string, pageNumber: number = 1): void {
    this.isModalLoading = true;

    if (searchTerm === '') {
      this.loadAllGenresFromPage(1);
      return;
    }

    this.genreService.searchGenres(searchTerm, pageNumber).subscribe((res) => {
      // getting page information
      this.resourceCurrPage = pageNumber;
      this.resourceFinalPage = res.totalPages;

      // the search input is for the resources to be attached
      // so, we parse the Track array to a Resource array
      this.resourcesToBeAttached = this.parsesArtistOrGenreToResources(
        res.items
      );

      this.isModalLoading = false;
    });
  }

  // search for artists in a paginated way
  searchArtists(searchTerm: string, pageNumber: number = 1): void {
    this.isModalLoading = true;

    if (searchTerm === '') {
      this.loadAllArtistsFromPage(1);
      return;
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
        this.isModalLoading = false;
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
    this.isModalLoading = true;
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

      this.isModalLoading = false;
    });
  }

  loadAllArtistsFromPage(pageNumber: number): void {
    this.isModalLoading = true;
    this.artistService.getAllArtists(pageNumber, 5).subscribe((res) => {
      // getting the final page information
      this.resourceFinalPage = res.totalPages;

      // changes the initial page
      this.resourceCurrPage = pageNumber;

      // parses artists to resources
      this.resourcesToBeAttached = this.parsesArtistOrGenreToResources(
        res.items
      );

      this.isModalLoading = false;
    });
  }

  loadAllGenresFromPage(pageNumber: number): void {
    this.isModalLoading = true;

    this.genreService.getAllGenres(pageNumber, 5).subscribe((res) => {
      // getting the final page information
      this.resourceFinalPage = res.totalPages;
      // changes the initial page
      this.resourceCurrPage = pageNumber;
      // parses the results to resources
      this.resourcesToBeAttached = this.parsesArtistOrGenreToResources(
        res.items
      );

      this.isModalLoading = false;
    });
  }
}
