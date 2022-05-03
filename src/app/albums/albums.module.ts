// modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from '@angular/router';
import { AlbumsHomeComponent } from './smart-components/albums-home/albums-home.component';
import { AlbumSuperiorBarComponent } from './smart-components/superior-bar/album-superior-bar.component';
import { SpecificAlbumComponent } from './presentational-components/specific-album/specific-album.component';
import { AlbumPaginatorComponent } from './presentational-components/album-paginator/album-paginator/album-paginator.component';


@NgModule({
  declarations: [
    AlbumsHomeComponent,
    SpecificAlbumComponent,
    AlbumSuperiorBarComponent,
    AlbumPaginatorComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ]
})
export class AlbumsModule { }
