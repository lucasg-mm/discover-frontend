import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { TracksHomeComponent } from './smart-components/tracks-home/tracks-home.component';
import { TrackCardComponent } from './presentational-components/track-card/track-card.component';

@NgModule({
  declarations: [TracksHomeComponent, TrackCardComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class TracksModule {}
