import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumsHomeComponent } from './albums/smart-components/albums-home/albums-home.component';

// my routes
const routes: Routes = [
  // path for the 'albums' path... should add the pageSize=1 default parameter (but how?)
  {
    path: 'albums',
    component: AlbumsHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


// upon meeting new people
// what i found out baffled me
// 