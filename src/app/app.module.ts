import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { AlbumsModule } from './albums/albums.module';
import { ArtistsModule } from './artists/artists.module';

import { AppComponent } from './app.component';
import { TracksModule } from './tracks/tracks.module';
import { GenresModule } from './genres/genres.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, AlbumsModule, SidebarModule, ArtistsModule, TracksModule, GenresModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
