import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumsHomeComponent } from './albums/smart-components/albums-home/albums-home.component';
import { AlbumMainComponent } from './albums/smart-components/album-main/album-main.component';
import { ArtistsHomeComponent } from './artists/smart-components/artists-home/artists-home.component';
import { ArtistMainComponent } from './artists/smart-components/artist-main/artist-main.component';
import { TracksHomeComponent } from './tracks/smart-components/tracks-home/tracks-home.component';
import { TrackMainComponent } from './tracks/smart-components/track-main/track-main.component';
import { GenresHomeComponent } from './genres/smart-components/genres-home/genres-home.component';
import { GenresMainComponent } from './genres/smart-components/genres-main/genres-main.component';
import { LoginMainComponent } from './login/smart-components/login-main/login-main.component';
import { RegisterMainComponent } from './login/smart-components/register-main/register-main.component';
import { ProfileMainComponent } from './profile/smart-components/profile-main/profile-main.component';

// my routes
const routes: Routes = [
  // redirect root path to 'albums'
  {
    path: '',
    redirectTo: 'albums',
    pathMatch: 'full',
  },

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
    component: TrackMainComponent,
  },

  // path for 'genres' module
  {
    path: 'genres',
    component: GenresHomeComponent,
  },
  {
    path: 'genres/:genreId',
    component: GenresMainComponent,
  },

  // path for 'login' module
  {
    path: 'login',
    component: LoginMainComponent,
  },
  {
    path: 'signup',
    component: RegisterMainComponent,
  },

  // path for 'profile' module
  {
    path: 'profile',
    component: ProfileMainComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
