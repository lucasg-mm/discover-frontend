import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistsService } from '../../artists.service';
import { Artist } from '../../models/artists.model';
import * as bulmaToast from 'bulma-toast';

@Component({
  selector: 'app-artists-home',
  templateUrl: './artists-home.component.html',
  styleUrls: ['./artists-home.component.css'],
})
export class ArtistsHomeComponent implements OnInit {
  displayedArtists: Artist[] = [];

  currPage: number = 1;

  finalPage: number = 10;

  isArtistCreatorVisible: boolean = false;

  // the paginator change page triggers different
  // api calls, depending if the user is searching or not
  isSearching: boolean = false;

  lastSearchTerm: string = '';

  constructor(
    private artistsService: ArtistsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // watches for query params changes
    this.route.queryParams.subscribe((params) => {
      this.currPage = this.validatesAndGetsPage(params['page']);
      this.findArtistsPaginated(this.currPage);
    });
  }

  // searches for artists
  searchArtists(searchTerm: string, pageNumber: number = 1) {
    // if the search term is empty,
    if (searchTerm === '') {
      this.router.navigate(['/artists']);
      this.findArtistsPaginated(1);
      this.isSearching = false;
      return;
    }

    this.isSearching = true;
    this.lastSearchTerm = searchTerm;

    // searches for artists
    this.artistsService
      .searchArtists(searchTerm, pageNumber, 10)
      .subscribe((res) => {
        this.displayedArtists = res.items;
        this.finalPage = res.totalPages;
        this.currPage = 1;
      });
  }

  // creates a new artist
  createArtist(artistToBeCreated: Artist) {
    this.artistsService.createArtist(artistToBeCreated).subscribe((res) => {
      bulmaToast.toast({
        message: 'Artist successfully created!',
        type: 'is-success',
      });
      this.router.navigate([`/artists/${res.id}`]);
      // this.closeArtistCreatorModal();
    });
  }

  // opens the modal to create an artist
  openArtistCreatorModal() {
    this.isArtistCreatorVisible = true;
  }

  // closes the modal to create an artist
  closeArtistCreatorModal() {
    this.isArtistCreatorVisible = false;
  }

  changeCurrentPage(pageNumber: number): void {
    if (this.isSearching) {
      this.searchArtists(this.lastSearchTerm, pageNumber);
    } else {
      this.retrieveArtistsOnPage(pageNumber);
    }
  }

  // validates the page param and returns it as a number
  validatesAndGetsPage(page: any): number {
    let pageParam: number = parseInt(page);

    // it has to be a number and equal or greater than 1
    pageParam = pageParam && pageParam >= 1 ? pageParam : 1;
    return pageParam;
  }

  findArtistsPaginated(pageNumber: number): void {
    this.artistsService.getAllArtists(pageNumber, 10).subscribe((res) => {
      this.displayedArtists = res.items;
      this.finalPage = res.totalPages;

      console.log(this.displayedArtists);
      console.log(this.finalPage);
    });
  }

  retrieveArtistsOnPage(pageNumber: number) {
    this.router.navigate(['/artists'], { queryParams: { page: pageNumber } });
  }
}
