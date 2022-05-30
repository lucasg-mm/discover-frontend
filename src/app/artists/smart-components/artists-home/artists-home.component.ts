import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistsService } from '../../artists.service';
import { Artist } from '../../models/artists.model';

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
      // this.currPage = this.validatesAndGetsPage(params['page']);
      this.currPage = 1;
      this.findArtistsPaginated(this.currPage);
    });
  }

  findArtistsPaginated(pageNumber: number): void{
    this.artistsService.getAllArtists(pageNumber, 10).subscribe((res) => {
      this.displayedArtists = res.items;
      this.finalPage = res.totalPages;

      console.log(this.displayedArtists);
      console.log(this.finalPage);
      
      
    })
  }

}
