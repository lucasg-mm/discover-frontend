import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'; 
import { Album } from './models/album.model';

@Injectable({
  providedIn: 'root',
})
export class AlbumsService {
  apiUri: string;

  constructor(private http: HttpClient) {
    this.apiUri = `${environment.apiUrl}/albums`;
  }

  // find every album
  findAllAlbums() {
    return this.http.get<Album[]>(this.apiUri);
  }

}
