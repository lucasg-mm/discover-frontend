import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Album } from '../albums/models/album.model';
import { ArtistsPaginated } from './models/artists-paginated.model'

@Injectable({
  providedIn: 'root'
})
export class ArtistsService {
  artistApiUri: string;

  constructor(private http: HttpClient) { 
    this.artistApiUri = `${environment.apiUrl}/artists`;
  }

  // get all artists in a paginated way
  getAllArtists(pageNumber: number, pageSize: number = 10): Observable<ArtistsPaginated>{
    return this.http.get<ArtistsPaginated>(`${this.artistApiUri}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  // search artists
  searchArtists(searchTerm: string, pageNumber: number, pageSize: number = 10): Observable<ArtistsPaginated>{
    return this.http.get<ArtistsPaginated>(`${this.artistApiUri}/search?name=${searchTerm}&pageNumber=${pageNumber}&pageSize=${pageSize}`)
  }

  // attaches an album to an artist
  attachAlbumToArtist(artistId: number, albumId: number){
    return this.http.put<Album>(`${this.artistApiUri}/${artistId}/albums/${albumId}`, {});
  }

  // detaches an album from an artist
  detachAlbumFromArtist(albumId: number, artistId: number): Observable<Album>{
    return this.http.delete<Album>(`${this.artistApiUri}/${artistId}/albums/${albumId}`);
  }
}
