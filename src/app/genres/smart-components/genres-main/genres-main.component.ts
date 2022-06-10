import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AlbumsService } from 'src/app/albums/albums.service';
import { ArtistsService } from 'src/app/artists/artists.service';
import { Resource } from 'src/app/shared/models/resource.model';
import { TracksService } from 'src/app/tracks/tracks.service';
import { GenresService } from '../../genres.service';
import { Genre } from '../../models/genre.model';

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

  openResourceManager(resourceType: string): void {}
}
