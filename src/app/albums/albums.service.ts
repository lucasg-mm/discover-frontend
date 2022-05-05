import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'; 
import { AlbumsPaginated } from './models/albums-paginated.model';
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
  findAlbumsPaginated(pageNumber: number) {
    const pageSize: Number = 10;
    return this.http.get<AlbumsPaginated>(`${this.apiUri}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  // creates a new album
  createAlbum(albumToBeCreated: Album){
    return this.http.post<Album>(this.apiUri, albumToBeCreated);
  }
}
