import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ArtistsService } from '../../artists.service';
import { Artist } from '../../models/artists.model';
import { map, mergeMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import * as bulmaToast from 'bulma-toast';

@Component({
  selector: 'app-artist-main',
  templateUrl: './artist-main.component.html',
  styleUrls: ['./artist-main.component.css'],
})
export class ArtistMainComponent implements OnInit {
  artist: Artist;
  artistProfilePictureURL: string = '';
  isArtistLoaded: boolean = false;

  constructor(
    private artistService: ArtistsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const artistId = Number(
      this.activatedRoute.snapshot.paramMap.get('artistId')!
    );
    this.loadArtistInfo(artistId).subscribe(() => {
      this.isArtistLoaded = true;
      this.updateProfilePicture();
    });
  }

  loadArtistInfo(artistId: number): Observable<void> {
    return this.artistService.findArtistById(artistId).pipe(
      map((res) => {
        this.artist = res;
      })
    );
  }

  // if the image loading fails, substitutes the url by the local default profile picture
  insertDefaultProfilePicture() {
    this.artistProfilePictureURL = 'assets/images/default-profile.jpg';
  }

  // triggered when the file is selected
  onFileSelect(event: any): void {
    const file: File = event.target.files[0];
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;

    // validates the file extension
    if (!allowedExtensions.exec(file.name)) {
      bulmaToast.toast({
        message: 'Please, select a .png, .jpeg, or .jpg!',
        type: 'is-danger',
      });
      return;
    }

    // uses the api to set the artist profile picture
    this.artistService
      .setProfilePicture(file, this.artist.id!)
      .subscribe(() => {
        bulmaToast.toast({
          message: 'Profile picture updated!',
          type: 'is-success',
        });
        this.updateProfilePicture();
      });
  }

  // get the profile pic url put it in the artistProfilePictureURL property
  updateProfilePicture() {
    // appends a timestamp at the end of the Url to actually force update the html page
    this.artistProfilePictureURL =
      this.artistService.getProfilePictureUrl(this.artist.id!) +
      '?random=' +
      new Date().getTime();
  }
}
