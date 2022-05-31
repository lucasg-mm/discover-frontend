import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ArtistsService } from '../../artists.service';
import { Artist } from '../../models/artists.model';
import { map, mergeMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-artist-main',
  templateUrl: './artist-main.component.html',
  styleUrls: ['./artist-main.component.css']
})
export class ArtistMainComponent implements OnInit {

  artist: Artist;
  artistProfilePictureURL: string = "";

  constructor(private artistService: ArtistsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const artistId = Number(this.activatedRoute.snapshot.paramMap.get('artistId')!);
    this.loadArtistInfo(artistId).subscribe(() => {
      this.artistProfilePictureURL = this.artistService.getProfilePictureUrl(artistId);
    });
  }

  loadArtistInfo(artistId: number): Observable<void>{
    return this.artistService.findArtistById(artistId).pipe(
      map((res) => {
        this.artist = res;
      })
    );
  }
  
  // if the image loading fails, substitutes the url by the local default profile picture
  insertDefaultProfilePicture(){
    this.artistProfilePictureURL = 'assets/images/default-profile.jpg';
  }

}
