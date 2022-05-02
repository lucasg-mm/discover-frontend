import { Component, OnInit } from '@angular/core';
import { AlbumsService } from '../../albums.service';
import { Album } from '../../models/album.model';

@Component({
  selector: 'app-albums-home',
  templateUrl: './albums-home.component.html',
  styleUrls: ['./albums-home.component.css'],
})
export class AlbumsHomeComponent implements OnInit {

  displayedAlbums: Album[] = [];

  constructor(private albumsService: AlbumsService) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.albumsService.findAllAlbums().subscribe((res) => {
      this.displayedAlbums = res;
    });
  }
}
