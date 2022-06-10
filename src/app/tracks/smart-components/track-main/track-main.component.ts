import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Track } from '../../models/track.model';
import { TracksService } from '../../tracks.service';
import { map, mergeMap } from 'rxjs/operators';
import { Artist } from 'src/app/artists/models/artists.model';
import { Genre } from 'src/app/genres/models/genre.model';
import { AlbumsService } from 'src/app/albums/albums.service';
import { Resource } from 'src/app/shared/models/resource.model';
import { Album } from 'src/app/albums/models/album.model';
import * as bulmaToast from 'bulma-toast';
import { GenresService } from 'src/app/genres/genres.service';
import { ArtistsService } from 'src/app/artists/artists.service';

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
  formattedTrackLength: string = '';
  showAlbumManager: boolean = false;
  showArtistsManager: boolean = false;
  showGenresManager: boolean = false;
  alreadyAttachedResources: Resource[];
  resourcesToBeAttached: Resource[];
  resourceManagerCurrPage: number = 1;
  isResourceManagerLoading: boolean = false;
  resourceManagerFinalPage: number = 10;
  isTrackCreatorVisible: boolean = false;
  isConfirmationModalVisible: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private tracksService: TracksService,
    private albumsService: AlbumsService,
    private genreService: GenresService,
    private artistService: ArtistsService
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

  closeConfirmationModal(): void{
    this.isConfirmationModalVisible = false;
  }

  deleteTrack(): void {
    this.tracksService.deleteTrackById(this.track.id!).subscribe(() => {
      bulmaToast.toast({ message: 'Track deleted!', type: 'is-success' });
      this.router.navigate(['/tracks']);
    });
  }

  updateTrackCover(albumId: number): void {
    this.trackCoverURL = this.albumsService.getCoverArtUrl(albumId);
  }

  updateTrackInfo(track: Track): void {
    this.tracksService
      .updateTrackInfo(this.track.id!, track)
      .pipe(mergeMap(() => this.loadTrackInfo(this.track.id!)))
      .subscribe(() => {
        bulmaToast.toast({
          message: "Track's info updated!",
          type: 'is-success',
        });
      });
  }

  closeTrackCreatorModal(): void {
    this.isTrackCreatorVisible = false;
  }

  insertDefaultTrackCover(): void {
    this.trackCoverURL = 'assets/images/default-cover.png';
  }

  loadTrackInfo(trackId: number): Observable<void> {
    return this.tracksService.findTrackById(trackId).pipe(
      map((res) => {
        this.track = res;
        this.formattedGenres = this.getFormattedGenres(res.genres!);
        this.formattedArtists = this.getFormattedArtists(res.artists!);
        this.formattedTrackLength = this.getFormattedTrackLength(res.length);
      })
    );
  }

  getFormattedTrackLength(trackLength: number) {
    let hours: number;
    let minutes: number;

    // gets the number of hours and minutes
    hours = Math.floor(trackLength / 3600);
    minutes = Math.floor((trackLength % 3600) / 60);

    // displays hours and minutes (just minutes, if the album is not longer than an hour)
    return hours !== 0 ? `${hours}h ${minutes}min` : `${minutes}min`;
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
      (names, artist) =>
        names === '' ? artist.name : names + ', ' + artist.name,
      ''
    );

    return formattedArtists;
  }

  openResourceManager(resourceType: string): void {
    this.loadToBeAttachedResource(resourceType);
    this.loadAlreadyAttachedResources(resourceType);
    if (resourceType === 'album') {
      this.showAlbumManager = true;
    } else if (resourceType === 'artist') {
      this.showArtistsManager = true;
    } else if (resourceType === 'genre') {
      this.showGenresManager = true;
    }
  }

  // attaches artist to the track
  attachArtistToTrack(artistId: number): void {
    const trackId = this.track.id!;

    // request to attach the artist
    this.artistService
      .attachTrackToArtist(artistId, trackId)
      .subscribe(() => {
        this.loadAlreadyAttachedResources('artist');
        bulmaToast.toast({ message: 'Artist attached!', type: 'is-success' });
      });
  }

  // detach an artist from the track
  detachArtistFromTrack(artistId: number): void {
    const trackId = this.track.id!;

    this.artistService
      .detachTrackFromArtist(trackId, artistId)
      .subscribe(() => {
        this.loadAlreadyAttachedResources('artist');
        bulmaToast.toast({ message: 'Artist detached!', type: 'is-success' });
      });
  }

  loadAlreadyAttachedResources(resourceType: string) {
    if (resourceType === 'album') {
      this.loadTrackInfo(this.track.id!).subscribe(() => {
        if (this.track.album) {
          this.alreadyAttachedResources = this.parsesTracksOrAlbumsToResources([
            this.track.album,
          ]);
          this.updateTrackCover(this.track.album.id!);
        } else {
          this.alreadyAttachedResources = [];
          this.insertDefaultTrackCover();
        }
      });
    } else if (resourceType === 'genre') {
      this.loadTrackInfo(this.track.id!).subscribe(() => {
        if (this.track.genres) {
          this.alreadyAttachedResources = this.parsesArtistOrGenreToResources(
            this.track.genres
          );
        } else {
          this.alreadyAttachedResources = [];
        }
      });
    } else if (resourceType === 'artist') {
      this.loadTrackInfo(this.track.id!).subscribe(() => {
        if (this.track.artists) {
          this.alreadyAttachedResources = this.parsesArtistOrGenreToResources(
            this.track.artists
          );
        } else {
          this.alreadyAttachedResources = [];
        }
      });
    }
  }

  // search for artists in a paginated way
  searchArtists(searchTerm: string, pageNumber: number = 1): void {
    this.isResourceManagerLoading = true;

    if (searchTerm === '') {
      this.loadAllArtistsFromPage(1);
      return;
    }

    this.artistService
      .searchArtists(searchTerm, pageNumber, 5)
      .subscribe((res) => {
        // getting page information
        this.resourceManagerCurrPage = pageNumber;
        this.resourceManagerFinalPage = res.totalPages;

        // the search input is for the resources to be attached
        // so, we parse the track array to a resource array
        this.resourcesToBeAttached = this.parsesArtistOrGenreToResources(
          res.items
        );
        this.isResourceManagerLoading = false;
      });
  }

  loadToBeAttachedResource(resourceType: string) {
    this.resourceManagerCurrPage = 1;
    if (resourceType === 'album') {
      this.loadAllAlbumsFromPage(1);
    } else if (resourceType === 'artist') {
      this.loadAllArtistsFromPage(1);
    } else if (resourceType === 'genre') {
      this.loadAllGenresFromPage(1);
    }
  }

  loadAllArtistsFromPage(pageNumber: number): void {
    this.isResourceManagerLoading = true;
    this.artistService.getAllArtists(pageNumber, 5).subscribe((res) => {
      // getting the final page information
      this.resourceManagerFinalPage = res.totalPages;

      // changes the initial page
      this.resourceManagerCurrPage = pageNumber;

      // parses artists to resources
      this.resourcesToBeAttached = this.parsesArtistOrGenreToResources(
        res.items
      );

      this.isResourceManagerLoading = false;
    });
  }

  // loads all genres from a certain page
  loadAllGenresFromPage(pageNumber: number): void {
    this.isResourceManagerLoading = true;

    this.genreService.getAllGenres(pageNumber, 5).subscribe((res) => {
      // getting the final page information
      this.resourceManagerFinalPage = res.totalPages;
      // changes the initial page
      this.resourceManagerCurrPage = pageNumber;
      // parses the results to resources
      this.resourcesToBeAttached = this.parsesArtistOrGenreToResources(
        res.items
      );

      this.isResourceManagerLoading = false;
    });
  }

  // search for genres (the result is paginated)
  searchGenres(searchTerm: string, pageNumber: number = 1): void {
    this.isResourceManagerLoading = true;

    if (searchTerm === '') {
      this.loadAllGenresFromPage(1);
      return;
    }

    this.genreService.searchGenres(searchTerm, pageNumber).subscribe((res) => {
      // getting page information
      this.resourceManagerCurrPage = pageNumber;
      this.resourceManagerFinalPage = res.totalPages;

      // the search input is for the resources to be attached
      // so, we parse the Track array to a Resource array
      this.resourcesToBeAttached = this.parsesArtistOrGenreToResources(
        res.items
      );

      this.isResourceManagerLoading = false;
    });
  }

  // attach a genre to the track
  attachGenreToTrack(genreId: number): void {
    const trackId = this.track.id!;

    // request to attach the artist
    this.genreService.attachTrackToGenre(genreId, trackId).subscribe(() => {
      this.loadAlreadyAttachedResources('genre');
      bulmaToast.toast({ message: 'Genre attached!', type: 'is-success' });
    });
  }

  // detach an genre from the track
  detachGenreFromTrack(genreId: number): void {
    const trackId = this.track.id!;

    this.genreService.detachTrackFromGenre(genreId, trackId).subscribe(() => {
      this.loadAlreadyAttachedResources('genre');
      bulmaToast.toast({ message: 'Genre detached!', type: 'is-success' });
    });
  }

  loadAllAlbumsFromPage(page: number) {
    this.isResourceManagerLoading = true;
    this.albumsService.findAlbumsPaginated(page, 5).subscribe((res) => {
      this.resourceManagerFinalPage = res.totalPages;
      this.resourceManagerCurrPage = page;
      this.resourcesToBeAttached = this.parsesTracksOrAlbumsToResources(
        res.items
      );
      this.isResourceManagerLoading = false;
    });
  }

  // closes the resource manager modal, loading its relevant data
  closeResourceManager(resourceType: string): void {
    if (resourceType === 'album') {
      this.showAlbumManager = false;
    } else if (resourceType === 'artist') {
      this.showArtistsManager = false;
    } else if (resourceType === 'genre') {
      this.showGenresManager = false;
    }
  }

  // attach a track with a certain id to this album
  attachAlbumToTrack(albumId: number): void {
    const trackId: number = this.track.id!;

    this.albumsService.attachTrackToAlbum(albumId, trackId).subscribe(() => {
      this.loadAlreadyAttachedResources('album');
      bulmaToast.toast({ message: 'Album attached!', type: 'is-success' });
    });
  }

  // detach a track with a certain id from this album
  detachTrackFromAlbum(albumId: number): void {
    const trackId: number = this.track.id!;

    this.albumsService.detachTrackFromAlbum(albumId, trackId).subscribe(() => {
      this.loadAlreadyAttachedResources('album');
      bulmaToast.toast({ message: 'Album detached!', type: 'is-success' });
    });
  }

  // search for albums (the result is paginated)
  searchAlbums(searchTerm: string, pageNumber: number = 1): void {
    this.isResourceManagerLoading = true;

    // if the the search term is the empty string
    // returns all the tracks
    if (searchTerm === '') {
      this.loadAllAlbumsFromPage(1);
      return;
    }

    this.albumsService
      .searchAlbums(searchTerm, pageNumber, 5)
      .subscribe((res) => {
        // getting page information
        this.resourceManagerCurrPage = pageNumber;
        this.resourceManagerFinalPage = res.totalPages;

        // the search input is for the resources to be attached
        // so, we parse the Track array to a Resource array
        this.resourcesToBeAttached = this.parsesTracksOrAlbumsToResources(
          res.items
        );
        this.isResourceManagerLoading = false;
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

  openTrackCreatorModal() {
    this.isTrackCreatorVisible = true;
  }

  openConfirmationModal() {
    this.isConfirmationModalVisible = true;
  }
}
