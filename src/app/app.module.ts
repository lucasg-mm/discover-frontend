import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { AlbumsModule } from './albums/albums.module';
import { ArtistsModule } from './artists/artists.module';

import { AppComponent } from './app.component';
import { TracksHomeComponent } from './tracks/smart-components/tracks-home/tracks-home.component';

@NgModule({
  declarations: [AppComponent, TracksHomeComponent],
  imports: [BrowserModule, AppRoutingModule, AlbumsModule, SidebarModule, ArtistsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
