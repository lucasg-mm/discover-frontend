import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AlbumsPaginated } from './models/albums-paginated.model';
import { Album } from './models/album.model';
import { Observable } from 'rxjs';
import { Track } from '../tracks/models/track.model';

@Injectable({
  providedIn: 'root',
})
export class AlbumsService {
  albumApiUri: string;
  userApiUri: string;

  constructor(private http: HttpClient) {
    this.albumApiUri = `${environment.apiUrl}/albums`;
    this.userApiUri = `${environment.apiUrl}/users`;
  }

  // find every album
  findAlbumsPaginated(pageNumber: number, pageSize: number = 10): Observable<AlbumsPaginated> {
    return this.http.get<AlbumsPaginated>(
      `${this.albumApiUri}?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  // find album by id
  findAlbumById(albumId: number): Observable<Album> {
    return this.http.get<Album>(`${this.albumApiUri}/${albumId}`);
  }

  // get album cover art url
  getCoverArtUrl(albumId: number): string {
    return `${this.albumApiUri}/${albumId}/cover`;
  }

  // creates a new album
  createAlbum(albumToBeCreated: Album): Observable<Album> {
    return this.http.post<Album>(this.albumApiUri, albumToBeCreated);
  }

  // attach a track to the album
  attachTrackToAlbum(albumId: number, trackId: number): Observable<Track> {
    return this.http.put<Track>(
      `${this.albumApiUri}/${albumId}/tracks/${trackId}`,
      {}
    );
  }

  // detach a track from the album
  detachTrackFromAlbum(albumId: number, trackId: number): Observable<Album> {
    return this.http.delete<Album>(
      `${this.albumApiUri}/${albumId}/tracks/${trackId}`
    );
  }

  // get all tracks from an album
  getAllTracksFromAlbum(albumId: number): Observable<Track[]> {
    return this.http.get<Track[]>(`${this.albumApiUri}/${albumId}/tracks`);
  }

  // updates the album info, like the length, title, relase date and label
  updateAlbumInfo(albumId: number, album: Album): Observable<Album> {
    return this.http.put<Album>(`${this.albumApiUri}/${albumId}`, album);
  }

  // deletes a album by its id
  deleteAlbumById(albumId: number): Observable<void> {
    return this.http.delete<void>(`${this.albumApiUri}/${albumId}`);
  }

  // change the album's cover art
  setAlbumCoverArt(coverArt: File, albumId: number): Observable<Album> {
    // constructs the form-data
    const formData = new FormData();
    formData.append('coverArt', coverArt);

    return this.http.put<Album>(
      `${this.albumApiUri}/${albumId}/cover`,
      formData
    );
  }

  // search for an album
  searchAlbums(
    searchTerm: string,
    pageNumber: number,
    pageSize: number = 10
  ): Observable<AlbumsPaginated> {
    return this.http.get<AlbumsPaginated>(
      `${this.albumApiUri}/search?title=${searchTerm}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  likeAlbum(username: string, albumId: number): Observable<Album>{
    return this.http.put<Album>(`${this.userApiUri}/${username}/albums/${albumId}`, {});
  }

  dislikeAlbum(username: string, albumId: number): Observable<void>{
    return this.http.delete<void>(`${this.userApiUri}/${username}/albums/${albumId}`);
  }

  getLikedAlbums(username: string): Observable<Album[]>{
    return this.http.get<Album[]>(`${this.userApiUri}/${username}/albums`);
  } 

}
