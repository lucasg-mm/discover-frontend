import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { TracksHomeComponent } from './smart-components/tracks-home/tracks-home.component';
import { TrackCardComponent } from './presentational-components/track-card/track-card.component';
import { TrackCreatorComponent } from './presentational-components/track-creator/track-creator.component';
import { TrackMainComponent } from './smart-components/track-main/track-main.component';

@NgModule({
  declarations: [TracksHomeComponent, TrackCardComponent, TrackCreatorComponent, TrackMainComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class TracksModule {}
