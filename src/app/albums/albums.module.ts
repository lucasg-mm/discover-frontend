// modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";

// smart components
import { AlbumsHomeComponent } from './smart-components/albums-home/albums-home.component';

// presentational components
import { SpecificAlbumComponent } from './presentational-components/specific-album/specific-album.component';


@NgModule({
  declarations: [
    AlbumsHomeComponent,
    SpecificAlbumComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class AlbumsModule { }
