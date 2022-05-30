import { Component, Input, OnInit } from '@angular/core';
import { ArtistsService } from '../../artists.service';
import { Artist } from '../../models/artists.model';

@Component({
  selector: 'app-artist-card',
  templateUrl: './artist-card.component.html',
  styleUrls: ['./artist-card.component.css'],
})
export class ArtistCardComponent implements OnInit {
  @Input()
  artist!: Artist

  artistName: string = ""

  profilePictureUrl: string = "";

  constructor(private artistService: ArtistsService) {}

  ngOnInit(): void {
    // gets the formatted artist's name
    this.artistName = this.getArtistName();

    // gets the artist's profile pic
    this.profilePictureUrl = this.artistService.getProfilePictureUrl(this.artist.id!);
  }

  // returns the album's name
  // (it's truncated if it's too long)
  getArtistName(): string{
    // if the artist's name is longer than maxChars, it's truncated
    const maxChars = 15;

    const artistName = this.artist.name;

    return artistName.length <= maxChars
    ? artistName
    : artistName.substring(0, maxChars) + '...';
  }

  // if the image loading fails, substitutes the url by the local default profile picture
  insertDefaultAlbumCover(): void {
    this.profilePictureUrl = 'assets/images/default-profile.jpg';
  }
}
