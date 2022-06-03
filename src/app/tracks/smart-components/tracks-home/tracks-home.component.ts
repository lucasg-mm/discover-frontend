import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Track } from '../../models/track.model';
import { TracksService } from '../../tracks.service';

@Component({
  selector: 'app-tracks-home',
  templateUrl: './tracks-home.component.html',
  styleUrls: ['./tracks-home.component.css'],
})
export class TracksHomeComponent implements OnInit {
  displayedTracks: Track[] = [];
  currPage: number = 1;
  finalPage: number = 10;
  // the paginator change page triggers different
  // api calls, depending if the user is searching or not
  isSearching: boolean = false;
  lastSearchTerm: string = '';

  constructor(
    private tracksService: TracksService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.currPage = this.validatesAndGetPage(params['page']);
      this.findTracksPaginated(this.currPage);
    });
  }

  // finds every track in a paginated way
  findTracksPaginated(page: number): void {
    // watches for query params changes
    this.tracksService.getAllTracks(page, 10).subscribe((res) => {
      this.displayedTracks = res.items;
      this.finalPage = res.totalPages;
    });
  }

  // validates a page number and returns it, if it's valid
  validatesAndGetPage(page: any): number {
    let pageParam: number = parseInt(page);

    pageParam = pageParam && pageParam >= 1 ? pageParam : 1;

    return pageParam;
  }

  changeCurrentPage(pageNumber: number): void {
    if (this.isSearching) {
      console.log('TODO: TRACK SEARCH!!!');
    } else {
      this.goToNextPage(pageNumber);
    }
  }

  // searches for tracks
  searchTracks(searchTerm: string, pageNumber: number = 1) {
    // if the search term is empty, just returns the first page
    if (searchTerm === '') {
      this.router.navigate(["/tracks"]);
      this.findTracksPaginated(1);
      this.isSearching = false;
      return;
    }

    // if the search term is not empty, stores the fact that it's searching
    // and the search term  
    this.isSearching = true;
    this.lastSearchTerm = searchTerm;

    // communicates to the api
    this.tracksService
      .searchTracks(searchTerm, pageNumber, 10)
      .subscribe((res) => {
        this.displayedTracks = res.items;
        this.finalPage = res.totalPages;
        this.currPage = 1;
      });
  }

  goToNextPage(pageNumber: number) {
    this.router.navigate(['/tracks'], { queryParams: { page: pageNumber } });
  }
}
