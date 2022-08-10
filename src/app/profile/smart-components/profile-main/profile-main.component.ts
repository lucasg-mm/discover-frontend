import { Component, OnInit } from '@angular/core';
import { AlbumsService } from 'src/app/albums/albums.service';
import { Album } from 'src/app/albums/models/album.model';
import { LoginService } from 'src/app/login/login.service';

@Component({
  selector: 'app-profile-main',
  templateUrl: './profile-main.component.html',
  styleUrls: ['./profile-main.component.css'],
})
export class ProfileMainComponent implements OnInit {
  likedAlbums: Album[];

  constructor(
    private albumService: AlbumsService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    const username: string = this.loginService.getUsername();
    this.albumService.getLikedAlbums(username).subscribe((res) => {
      console.log(res);
    });
  }
}
