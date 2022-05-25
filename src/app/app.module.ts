import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { AlbumsModule } from './albums/albums.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, AlbumsModule, SidebarModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
