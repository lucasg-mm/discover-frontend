import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileMainComponent } from './smart-components/profile-main/profile-main.component';
import { AlbumsModule } from '../albums/albums.module';
import { LoginModule } from '../login/login.module';



@NgModule({
  declarations: [
    ProfileMainComponent
  ],
  imports: [
    CommonModule,
    AlbumsModule,
    LoginModule
  ]
})
export class ProfileModule { }
