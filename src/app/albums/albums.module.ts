// modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from '@angular/router';
import { AlbumsHomeComponent } from './smart-components/albums-home/albums-home.component';
import { AlbumSuperiorBarComponent } from './smart-components/superior-bar/album-superior-bar.component';
import { AlbumCardComponent } from './presentational-components/album-card/album-card.component';
import { AlbumPaginatorComponent } from './presentational-components/album-paginator/album-paginator/album-paginator.component';
import { AlbumCreatorComponent } from './presentational-components/album-creator/album-creator/album-creator.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AlbumsHomeComponent,
    AlbumCardComponent,
    AlbumSuperiorBarComponent,
    AlbumPaginatorComponent,
    AlbumCreatorComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class AlbumsModule { }
