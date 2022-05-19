import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenresPaginated } from './models/genres-paginated.model';
import { Genre } from './models/genre.model';
import { Album } from '../albums/models/album.model';

@Injectable({
  providedIn: 'root'
})
export class GenresService {
  genreApiUri: string;

  constructor(private http: HttpClient) { 
    this.genreApiUri = `${environment.apiUrl}/genres`;
  }

  // get all genres in a paginated way
  getAllGenres(pageNumber: number, pageSize: number = 10): Observable<GenresPaginated>{
    return this.http.get<GenresPaginated>(`${this.genreApiUri}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  // search genres
  searchGenres(searchTerm: string, pageNumber: number, pageSize: number = 10): Observable<GenresPaginated>{
    return this.http.get<GenresPaginated>(`${this.genreApiUri}/search?name=${searchTerm}&pageNumber=${pageNumber}&pageSize=${pageSize}`)
  }

  // attaches an album to a genre
  attachAlbumToGenre(genreId: number, albumId: number): Observable<Album>{
    return this.http.put<Album>(`${this.genreApiUri}/${genreId}/albums/${albumId}`, {});
  }

  // detaches an album to a genre
  detachAlbumFromGenre(genreId: number, albumId: number): Observable<Album>{
    return this.http.delete<Album>(`${this.genreApiUri}/${genreId}/albums/${albumId}`);
  }
}
