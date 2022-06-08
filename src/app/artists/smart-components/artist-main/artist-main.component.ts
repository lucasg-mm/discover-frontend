import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ArtistsService } from '../../artists.service';
import { Artist } from '../../models/artists.model';
import { map, mergeMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import * as bulmaToast from 'bulma-toast';
import { Genre } from 'src/app/genres/models/genre.model';
import { AlbumsService } from 'src/app/albums/albums.service';
import { Resource } from 'src/app/shared/models/resource.model';
import { Track } from 'src/app/tracks/models/track.model';
import { Album } from 'src/app/albums/models/album.model';
import { TracksService } from 'src/app/tracks/tracks.service';
import { GenresService } from 'src/app/genres/genres.service';

@Component({
  selector: 'app-artist-main',
  templateUrl: './artist-main.component.html',
  styleUrls: ['./artist-main.component.css'],
})
export class ArtistMainComponent implements OnInit {
  artist: Artist;
  artistProfilePictureURL: string = '';
  isArtistLoaded: boolean = false;
  formattedGenres: string = '';
  showTrackManager: boolean = false;
  showAlbumManager: boolean = false;
  showGenreManager: boolean = false;
  resourceManagerCurrPage: number;
  isResourceManagerLoading: boolean;
  resourceManagerFinalPage: number;
  resourcesToBeAttached: Resource[];
  alreadyAttachedResources: Resource[];
  isConfirmationModalVisible: boolean = false;
  isArtistCreatorVisible: boolean = false;

  constructor(
    private router: Router,
    private genreService: GenresService,
    private artistService: ArtistsService,
    private albumService: AlbumsService,
    private trackService: TracksService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const artistId = Number(
      this.activatedRoute.snapshot.paramMap.get('artistId')!
    );
    this.loadArtistInfo(artistId).subscribe(() => {
      this.isArtistLoaded = true;
      this.updateProfilePicture();
    });
  }

  // gets a string of formatted genres
  // for example: alternative hip hop, rock
  getFormattedGenres(genres: Genre[]): string {
    const formattedGenres: string = genres.reduce(
      (names, genre) => (names === '' ? genre.name : names + ', ' + genre.name),
      ''
    );

    return formattedGenres;
  }

  loadArtistInfo(artistId: number): Observable<void> {
    return this.artistService.findArtistById(artistId).pipe(
      map((res) => {
        this.artist = res;
        this.formattedGenres = this.getFormattedGenres(this.artist.genres!);
      })
    );
  }

  // if the image loading fails, substitutes the url by the local default profile picture
  insertDefaultProfilePicture() {
    this.artistProfilePictureURL = 'assets/images/default-profile.jpg';
  }

  // triggered when the file is selected
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

    // uses the api to set the artist profile picture
    this.artistService
      .setProfilePicture(file, this.artist.id!)
      .subscribe(() => {
        bulmaToast.toast({
          message: 'Profile picture updated!',
          type: 'is-success',
        });
        this.updateProfilePicture();
      });
  }

  // get the profile pic url put it in the artistProfilePictureURL property
  updateProfilePicture() {
    // appends a timestamp at the end of the Url to actually force update the html page
    this.artistProfilePictureURL =
      this.artistService.getProfilePictureUrl(this.artist.id!) +
      '?random=' +
      new Date().getTime();
  }

  // opens the resource manager modal, loading its relevant data
  openResourceManager(resourceType: string): void {
    this.loadToBeAttachedResource(resourceType);
    this.loadAlreadyAttachedResources(resourceType);
    if (resourceType === 'album') {
      this.showAlbumManager = true;
    } else if (resourceType === 'track') {
      this.showTrackManager = true;
    } else if (resourceType === 'genre') {
      this.showGenreManager = true;
    }
  }

  loadAlreadyAttachedResources(resourceType: string) {
    if (resourceType === 'album') {
      this.artistService.getAlbumsByArtist(this.artist.id!).subscribe((res) => {
        this.alreadyAttachedResources =
          this.parsesTracksOrAlbumsToResources(res);
      });
    } else if (resourceType === 'track') {
      this.artistService.getTracksByArtist(this.artist.id!).subscribe((res) => {
        this.alreadyAttachedResources =
          this.parsesTracksOrAlbumsToResources(res);
      });
    } else if (resourceType === 'genre') {
      this.loadArtistInfo(this.artist.id!).subscribe(() => {
        this.alreadyAttachedResources = this.parsesArtistOrGenreToResources(
          this.artist.genres!
        );
      });
    }
  }

  // closes the resource manager modal, loading its relevant data
  closeResourceManager(resourceType: string): void {
    if (resourceType === 'album') {
      this.showAlbumManager = false;
    } else if (resourceType === 'track') {
      this.showTrackManager = false;
    } else if (resourceType === 'genre') {
      this.showGenreManager = false;
    }
  }

  loadToBeAttachedResource(resourceType: string): void {
    this.resourceManagerCurrPage = 1;
    if (resourceType === 'album') {
      this.loadAllAlbumsFromPage(1);
    } else if (resourceType === 'track') {
      this.loadAllTracksFromPage(1);
    } else if (resourceType === 'genre') {
      this.loadAllGenresFromPage(1);
    }
  }

  // loads all tracks from a certain page
  loadAllTracksFromPage(page: number): void {
    this.isResourceManagerLoading = true;
    this.trackService.getAllTracks(page, 5).subscribe((res) => {
      // getting the final page information
      this.resourceManagerFinalPage = res.totalPages;

      // changes the initial page
      this.resourceManagerCurrPage = page;

      // the search input is for the resources to be attached
      // so, we parse the Track array to a Resource array
      this.resourcesToBeAttached = this.parsesTracksOrAlbumsToResources(
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

  loadAllAlbumsFromPage(page: number) {
    this.isResourceManagerLoading = true;
    this.albumService.findAlbumsPaginated(page, 5).subscribe((res) => {
      this.resourceManagerFinalPage = res.totalPages;
      this.resourceManagerCurrPage = page;
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

  attachAlbumToArtist(albumId: number): void {
    const artistId = this.artist.id!;

    // request to attach the artist
    this.artistService.attachAlbumToArtist(artistId, albumId).subscribe(() => {
      this.loadAlreadyAttachedResources('album');
      bulmaToast.toast({ message: 'Album attached!', type: 'is-success' });
    });
  }

  // detach an artist from a certain album
  detachAlbumFromArtist(albumId: number): void {
    const artistId = this.artist.id!;

    this.artistService
      .detachAlbumFromArtist(albumId, artistId)
      .subscribe(() => {
        this.loadAlreadyAttachedResources('album');
        bulmaToast.toast({ message: 'Album detached!', type: 'is-success' });
      });
  }

  attachTrackToArtist(trackId: number): void {
    const artistId = this.artist.id!;

    // request to attach the artist
    this.artistService.attachTrackToArtist(artistId, trackId).subscribe(() => {
      this.loadAlreadyAttachedResources('track');
      bulmaToast.toast({ message: 'Track attached!', type: 'is-success' });
    });
  }

  // detach an artist from a certain album
  detachTrackFromArtist(trackId: number): void {
    const artistId = this.artist.id!;

    this.artistService
      .detachTrackFromArtist(trackId, artistId)
      .subscribe(() => {
        this.loadAlreadyAttachedResources('track');
        bulmaToast.toast({ message: 'Track detached!', type: 'is-success' });
      });
  }

  // attach a genre to a certain artist
  attachGenreToArtist(genreId: number): void {
    const artistId = this.artist.id!;

    // request to attach the artist
    this.genreService.attachArtistToGenre(genreId, artistId).subscribe(() => {
      this.loadAlreadyAttachedResources('genre');
      bulmaToast.toast({ message: 'Genre attached!', type: 'is-success' });
    });
  }

  // detach an genre from a certain artist
  detachGenreFromArtist(genreId: number): void {
    const artistId = this.artist.id!;

    this.genreService.detachArtistFromGenre(genreId, artistId).subscribe(() => {
      this.loadAlreadyAttachedResources('genre');
      bulmaToast.toast({ message: 'Genre detached!', type: 'is-success' });
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

    this.albumService
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

  // search for tracks (the result is paginated)
  searchTracks(searchTerm: string, pageNumber: number = 1): void {
    this.isResourceManagerLoading = true;

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

  openArtistCreatorModal(): void {
    this.isArtistCreatorVisible = true;
  }

  closeArtistCreatorModal(): void {
    this.isArtistCreatorVisible = false;
  }

  updateArtistInfo(artist: Artist): void {
    this.artistService
      .updateArtistInfo(this.artist.id!, artist)
      .pipe(mergeMap(() => this.loadArtistInfo(this.artist.id!)))
      .subscribe(() => {
        bulmaToast.toast({
          message: "Artist's info updated!",
          type: 'is-success',
        });
      });
  }

  closeConfirmationModal(): void {
    this.isConfirmationModalVisible = false;
  }

  openConfirmationModal(): void {
    this.isConfirmationModalVisible = true;
  }

  deleteArtist(): void {
    this.artistService.deleteArtistById(this.artist.id!).subscribe(() => {
      bulmaToast.toast({ message: 'Artist deleted!', type: 'is-success' });
      this.router.navigate(['/artists']);
    });
  }
}
