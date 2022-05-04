import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AlbumsService } from '../../albums.service';
import { Album } from '../../models/album.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-albums-home',
  templateUrl: './albums-home.component.html',
  styleUrls: ['./albums-home.component.css'],
})
export class AlbumsHomeComponent implements OnInit {
  displayedAlbums: Album[] = [];

  initialPage: number = 1;

  finalPage: number = 10;

  constructor(
    private albumsService: AlbumsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // watches for query params changes
    this.route.queryParams.subscribe((params) => {
      const pageParam: number = parseInt(params['page']) | 1;
      this.initialPage = pageParam;
      this.findAlbumsPaginated(pageParam);
    });
  }

  // changes the query params (this is triggered by a click in the paginator)
  retrieveAlbumsOnPage(pageNumber: number) {
    this.router.navigate(['/albums'], { queryParams: { page: pageNumber } });
  }

  // find the albums in a paginated way
  findAlbumsPaginated(pageNumber: number): void {
    this.albumsService.findAlbumsPaginated(pageNumber).subscribe((res) => {
      this.displayedAlbums = res.items;
      this.finalPage = res.totalPages;
    }, (err) => {
      console.log(err);
    });
  }
}
