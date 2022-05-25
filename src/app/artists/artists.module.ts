import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistsHomeComponent } from './smart-components/artists-home/artists-home.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ArtistCardComponent } from './presentational-components/artist-card/artist-card.component';


@NgModule({
  declarations: [
    ArtistsHomeComponent,
    ArtistCardComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ArtistsModule { }
