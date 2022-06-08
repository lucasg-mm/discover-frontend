import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { GenresHomeComponent } from './smart-components/genres-home/genres-home.component';
import { GenresMainComponent } from './smart-components/genres-main/genres-main.component';
import { GenreCardComponent } from './presentational-components/genre-card/genre-card.component';
import { GenreCreatorComponent } from './presentational-components/genre-creator/genre-creator.component';

@NgModule({
  declarations: [
    GenresHomeComponent,
    GenresMainComponent,
    GenreCardComponent,
    GenreCreatorComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class GenresModule {}
