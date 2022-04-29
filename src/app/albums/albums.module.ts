import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    CommonModule
  ]
})
export class AlbumsModule { }
