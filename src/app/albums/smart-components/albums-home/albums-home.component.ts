import { Component, OnInit } from '@angular/core';
import { AlbumsService } from '../../albums.service';
import { Album } from '../../models/album.model';
import { ActivatedRoute, Router } from '@angular/router';
import * as bulmaToast from 'bulma-toast'

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

  constructor(
    private albumsService: AlbumsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // watches for query params changes
    this.route.queryParams.subscribe((params) => {
      this.currPage = this.validatesAndGetsPage(params["page"]);
      this.findAlbumsPaginated(this.currPage);
    });
  }

  // validates the page param and returns it as a number
  validatesAndGetsPage(page: any): number{
    let pageParam: number = parseInt(page);

    // it has to be a number and equal or greater than 1
    pageParam = (pageParam && pageParam >= 1) ? pageParam : 1; 
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
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // creates a new album
  createAlbum(albumToBeCreated: Album): void {
    this.albumsService.createAlbum(albumToBeCreated).subscribe((res) => {
      bulmaToast.toast({ message: 'Album successfully created!', type: 'is-success' })
      this.closeAlbumCreatorModal();
    }, (err) => {
      console.log(err);  // just logs the error for now
    });
  }
}
