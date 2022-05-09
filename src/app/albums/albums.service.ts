import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'; 
import { AlbumsPaginated } from './models/albums-paginated.model';
import { Album } from './models/album.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlbumsService {
  albumApiUri: string;

  constructor(private http: HttpClient) {
    this.albumApiUri = `${environment.apiUrl}/albums`;
  }

  // find every album
  findAlbumsPaginated(pageNumber: number): Observable<AlbumsPaginated> {
    return this.http.get<AlbumsPaginated>(`${this.albumApiUri}?pageNumber=${pageNumber}&pageSize=${10}`);
  }

  // find album by id
  findAlbumById(albumId: number): Observable<Album> {
    return this.http.get<Album>(`${this.albumApiUri}/${albumId}`);
  }

  // get album cover art url
  getCoverArtUrl(albumId: string): string {
    return `${this.albumApiUri}/${albumId}/cover`;
  }

  // creates a new album
  createAlbum(albumToBeCreated: Album): Observable<Album>{
    return this.http.post<Album>(this.albumApiUri, albumToBeCreated);
  }
}
