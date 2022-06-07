import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumsHomeComponent } from './albums/smart-components/albums-home/albums-home.component';
import { AlbumMainComponent } from './albums/smart-components/album-main/album-main.component';
import { ArtistsHomeComponent } from './artists/smart-components/artists-home/artists-home.component';
import { ArtistMainComponent } from './artists/smart-components/artist-main/artist-main.component';
import { TracksHomeComponent } from './tracks/smart-components/tracks-home/tracks-home.component';
import { TrackMainComponent } from './tracks/smart-components/track-main/track-main.component';

// my routes
const routes: Routes = [
  // path for the 'albums' module
  {
    path: 'albums',
    component: AlbumsHomeComponent,
  },
  {
    path: 'albums/:albumId',
    component: AlbumMainComponent,
  },

  // path for the 'artists' module
  {
    path: 'artists',
    component: ArtistsHomeComponent,
  },
  {
    path: 'artists/:artistId',
    component: ArtistMainComponent,
  },

  // path for the 'tracks' module
  {
    path: 'tracks',
    component: TracksHomeComponent,
  },
  {
    path: 'tracks/:trackId',
    component: TrackMainComponent
  },

  // path for 'genres' module
  // {
  //   path: 'genres',
  // },
  // {
  //   path: 'genres/:genreId',
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
