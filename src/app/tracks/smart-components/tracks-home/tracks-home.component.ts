import { Component, OnInit } from '@angular/core';
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

  constructor(private tracksService: TracksService) {}

  ngOnInit(): void {
    this.findTracksPaginated(this.currPage);
  }

  findTracksPaginated(page: number): void {
    this.tracksService.getAllTracks(page, 10).subscribe((res) => {
      this.displayedTracks = res.items;
      console.log(this.displayedTracks);
    });
  }
}
