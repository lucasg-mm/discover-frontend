// modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from '@angular/router';
import { AlbumsHomeComponent } from './smart-components/albums-home/albums-home.component';
import { AlbumSuperiorBarComponent } from './smart-components/superior-bar/album-superior-bar.component';
import { AlbumCardComponent } from './presentational-components/album-card/album-card.component';
import { AlbumCreatorComponent } from './presentational-components/album-creator/album-creator/album-creator.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AlbumMainComponent } from './smart-components/album-main/album-main.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AlbumsHomeComponent,
    AlbumCardComponent,
    AlbumSuperiorBarComponent,
    AlbumCreatorComponent,
    AlbumMainComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AlbumsModule { }
