import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AlbumsService } from 'src/app/albums/albums.service';
import { Album } from 'src/app/albums/models/album.model';
import { ArtistsService } from 'src/app/artists/artists.service';
import { Artist } from 'src/app/artists/models/artists.model';
import { Resource } from 'src/app/shared/models/resource.model';
import { Track } from 'src/app/tracks/models/track.model';
import { TracksService } from 'src/app/tracks/tracks.service';
import { GenresService } from '../../genres.service';
import { Genre } from '../../models/genre.model';
import * as bulmaToast from 'bulma-toast';

@Component({
  selector: 'app-genres-main',
  templateUrl: './genres-main.component.html',
  styleUrls: ['./genres-main.component.css'],
})
export class GenresMainComponent implements OnInit {
  genre: Genre;
  isGenreLoaded: boolean = false;
  showAlbumManager: boolean = false;
  showArtistsManager: boolean = false;
  showTrackManager: boolean = false;
  alreadyAttachedResources: Resource[];
  resourcesToBeAttached: Resource[];
  resourceManagerCurrPage: number = 1;
  isResourceManagerLoading: boolean = false;
  resourceManagerFinalPage: number = 10;
  isGenreCreatorVisible: boolean = false;
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
    const genreId: number = Number(
      this.activatedRoute.snapshot.paramMap.get('genreId')
    );

    this.loadGenreInfo(genreId).subscribe(() => {
      this.isGenreLoaded = true;
    });
  }

  loadGenreInfo(genreId: number): Observable<void> {
    return this.genreService.findGenreById(genreId).pipe(
      map((res) => {
        this.genre = res;
      })
    );
  }

  openGenreCreatorModal(): void {}

  openConfirmationModal(): void {}

  openResourceManager(resourceType: string): void {
    this.loadToBeAttachedResource(resourceType);
    this.loadAlreadyAttachedResources(resourceType);
    if (resourceType === 'album') {
      this.showAlbumManager = true;
    } else if (resourceType === 'artist') {
      this.showArtistsManager = true;
    } else if (resourceType === 'track') {
      this.showTrackManager = true;
    }
  }

  loadToBeAttachedResource(resourceType: string) {
    this.resourceManagerCurrPage = 1;
    if (resourceType === 'album') {
      this.loadAllAlbumsFromPage(1);
    } else if (resourceType === 'artist') {
      // this.loadAllArtistsFromPage(1);
    } else if (resourceType === 'track') {
      // this.loadAllTracksFromPage(1);
    }
  }

  loadAlreadyAttachedResources(resourceType: string) {
    if (resourceType === 'album') {
      this.genreService
        .getAllAlbumsFromGenre(this.genre.id!)
        .subscribe((res) => {
          this.alreadyAttachedResources =
            this.parsesTracksOrAlbumsToResources(res);
        });
    } else if (resourceType === 'artist') {
    } else if (resourceType === 'track') {
    }
  }

  attachAlbumToGenre(albumId: number): void {
    this.genreService
      .attachAlbumToGenre(this.genre.id!, albumId)
      .subscribe(() => {
        this.loadAlreadyAttachedResources('album');
        bulmaToast.toast({ message: 'Album attached!', type: 'is-success' });
      });
  }

  detachAlbumFromGenre(albumId: number): void {
    this.genreService
      .detachAlbumFromGenre(this.genre.id!, albumId)
      .subscribe(() => {
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

  // closes the resource manager modal, loading its relevant data
  closeResourceManager(resourceType: string): void {
    if (resourceType === 'album') {
      this.showAlbumManager = false;
    } else if (resourceType === 'artist') {
      this.showArtistsManager = false;
    } else if (resourceType === 'track') {
      this.showTrackManager = false;
    }
  }
}
