import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GenresService } from '../../genres.service';
import { Genre } from '../../models/genre.model';
import * as bulmaToast from 'bulma-toast';

@Component({
  selector: 'app-genres-home',
  templateUrl: './genres-home.component.html',
  styleUrls: ['./genres-home.component.css'],
})
export class GenresHomeComponent implements OnInit {
  isGenreCreatorVisible: boolean = false;

  isSearching = false;

  lastSearchTerm: string = '';

  displayedGenres: Genre[];

  finalPage: number;

  currPage: number;

  constructor(
    private genresService: GenresService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.currPage = this.validatesAndGetPage(params['page']);
      this.findGenresPaginated(this.currPage);
    });
  }

  // triggered when the user changes page using the paginator
  changeCurrentPage(pageNumber: number): void {
    if (this.isSearching) {
      this.searchGenres(this.lastSearchTerm, pageNumber);
    } else {
      this.goToNextPage(pageNumber);
    }
  }

  goToNextPage(pageNumber: number): void {
    this.router.navigate(['/genres'], { queryParams: { page: pageNumber } });
  }

  // validates a page number and returns it, if it's valid
  validatesAndGetPage(page: any): number {
    let pageParam: number = parseInt(page);

    pageParam = pageParam && pageParam >= 1 ? pageParam : 1;

    return pageParam;
  }

  openGenreCreatorModal(): void {
    this.isGenreCreatorVisible = true;
  }

  closeGenreCreatorModal(): void {
    this.isGenreCreatorVisible = false;
  }

  // finds every genre in a paginated way
  findGenresPaginated(page: number): void {
    // watches for query params changes
    this.genresService.getAllGenres(page, 10).subscribe((res) => {
      this.displayedGenres = res.items;
      this.finalPage = res.totalPages;
    });
  }

  // creates a new genre
  createGenre(genreToBeCreated: Genre): void {
    this.genresService.createGenre(genreToBeCreated).subscribe((res) => {
      bulmaToast.toast({
        message: 'Genre successfully created!',
        type: 'is-success',
      });
      this.router.navigate([`/genres/${res.id}`]);
    });
  }

  // searches for genres
  searchGenres(searchTerm: string, pageNumber: number = 1) {
    // if the search term is empty, just returns the first page
    if (searchTerm === '') {
      this.router.navigate(['/genres']);
      this.findGenresPaginated(1);
      this.isSearching = false;
      return;
    }

    // if the search term is not empty, stores the fact that it's searching
    // and the search term
    this.isSearching = true;
    this.lastSearchTerm = searchTerm;

    // communicates to the api to get the results
    this.genresService
      .searchGenres(searchTerm, pageNumber, 10)
      .subscribe((res) => {
        this.displayedGenres = res.items;
        this.finalPage = res.totalPages;
        this.currPage = 1;
      });
  }
}
