import { Component, OnInit } from '@angular/core';
import { AlbumsService } from '../../albums.service';
import { Album } from '../../models/album.model';
import { ActivatedRoute, Router } from '@angular/router';
import * as bulmaToast from 'bulma-toast';

@Component({
  selector: 'app-albums-home',
  templateUrl: './albums-home.component.html',
  styleUrls: ['./albums-home.component.css'],
})
export class AlbumsHomeComponent implements OnInit {
  displayedAlbums: Album[] = [];

  currPage: number = 1;

  finalPage: number = 10;

  isAlbumCreatorVisible: boolean = false;

  // the paginator change page triggers different
  // api calls, depending if the user is searching or not
  isSearching: boolean = false;

  lastSearchTerm: string = "";

  constructor(
    private albumsService: AlbumsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // watches for query params changes
    this.route.queryParams.subscribe((params) => {
      this.currPage = this.validatesAndGetsPage(params['page']);
      this.findAlbumsPaginated(this.currPage);
    });
  }

  // searches for albums in the api
  searchAlbums(searchTerm: string, pageNumber: number = 1): void {
    // if the search term is empty, 
    if (searchTerm === '') {
      this.router.navigate(['/albums']);
      this.retrieveAlbumsOnPage(1);
      this.isSearching = false;
      return;
    }

    this.isSearching = true;
    this.lastSearchTerm = searchTerm;
    // searches for albums
    this.albumsService
      .searchAlbums(searchTerm, pageNumber, 10)
      .subscribe((res) => {
        this.displayedAlbums = res.items;
        this.finalPage = res.totalPages;
        
        this.currPage = 1;
      });
  }

  changeCurrentPage(pageNumber: number): void{
    if (this.isSearching) {
      this.searchAlbums(this.lastSearchTerm, pageNumber);
    } else {
      this.retrieveAlbumsOnPage(pageNumber);
    }
  }

  // validates the page param and returns it as a number
  validatesAndGetsPage(page: any): number {
    let pageParam: number = parseInt(page);

    // it has to be a number and equal or greater than 1
    pageParam = pageParam && pageParam >= 1 ? pageParam : 1;
    return pageParam;
  }

  openAlbumCreatorModal(): void {
    this.isAlbumCreatorVisible = true;
  }

  closeAlbumCreatorModal(): void {
    this.isAlbumCreatorVisible = false;
  }

  // changes the query params (this is triggered by a click in the paginator)
  retrieveAlbumsOnPage(pageNumber: number) {
    this.router.navigate(['/albums'], { queryParams: { page: pageNumber } });
  }

  // find the albums in a paginated way
  findAlbumsPaginated(pageNumber: number): void {
    this.albumsService.findAlbumsPaginated(pageNumber).subscribe(
      (res) => {
        this.displayedAlbums = res.items;
        this.finalPage = res.totalPages;
      } 
    );
  }

  // creates a new album
  createAlbum(albumToBeCreated: Album): void {
    this.albumsService.createAlbum(albumToBeCreated).subscribe(
      (res) => {
        bulmaToast.toast({
          message: 'Album successfully created!',
          type: 'is-success',
        });
        this.closeAlbumCreatorModal();
      },
      (err) => {
        console.log(err); // just logs the error for now
      }
    );
  }
}
