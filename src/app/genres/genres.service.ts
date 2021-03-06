import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenresPaginated } from './models/genres-paginated.model';
import { Album } from '../albums/models/album.model';
import { Artist } from '../artists/models/artists.model';
import { Genre } from './models/genre.model';
import { Track } from '../tracks/models/track.model';

@Injectable({
  providedIn: 'root',
})
export class GenresService {
  genreApiUri: string;

  constructor(private http: HttpClient) {
    this.genreApiUri = `${environment.apiUrl}/genres`;
  }

  // get all genres in a paginated way
  getAllGenres(
    pageNumber: number,
    pageSize: number = 10
  ): Observable<GenresPaginated> {
    return this.http.get<GenresPaginated>(
      `${this.genreApiUri}?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  // find a specific genre by its id
  findGenreById(genreId: number): Observable<Genre> {
    return this.http.get<Genre>(`${this.genreApiUri}/${genreId}`);
  }

  // creates a new genre
  createGenre(genreToBeCreated: Genre): Observable<Genre> {
    return this.http.post<Genre>(this.genreApiUri, genreToBeCreated);
  }

  getAllAlbumsFromGenre(genreId: number): Observable<Album[]>{
    return this.http.get<Album[]>(`${this.genreApiUri}/${genreId}/albums`);
  }

  getAllArtistsFromGenre(genreId: number): Observable<Artist[]>{
    return this.http.get<Artist[]>(`${this.genreApiUri}/${genreId}/artists`);
  }

  getAllTracksFromGenre(genreId: number): Observable<Track[]>{
    return this.http.get<Track[]>(`${this.genreApiUri}/${genreId}/tracks`);
  }

  // search genres
  searchGenres(
    searchTerm: string,
    pageNumber: number,
    pageSize: number = 10
  ): Observable<GenresPaginated> {
    return this.http.get<GenresPaginated>(
      `${this.genreApiUri}/search?name=${searchTerm}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  // attaches an album to a genre
  attachAlbumToGenre(genreId: number, albumId: number): Observable<Album> {
    return this.http.put<Album>(
      `${this.genreApiUri}/${genreId}/albums/${albumId}`,
      {}
    );
  }

  // detaches an album to a genre
  detachAlbumFromGenre(genreId: number, albumId: number): Observable<Album> {
    return this.http.delete<Album>(
      `${this.genreApiUri}/${genreId}/albums/${albumId}`
    );
  }

  // attaches an artist to a genre
  attachArtistToGenre(genreId: number, artistId: number): Observable<Artist> {
    return this.http.put<Artist>(
      `${this.genreApiUri}/${genreId}/artists/${artistId}`,
      {}
    );
  }

  // detaches an artist to a genre
  detachArtistFromGenre(
    genreId: number,
    artistsId: number
  ): Observable<Artist> {
    return this.http.delete<Artist>(
      `${this.genreApiUri}/${genreId}/artists/${artistsId}`
    );
  }

  // attaches a track to a genre
  attachTrackToGenre(genreId: number, trackId: number): Observable<Artist> {
    return this.http.put<Artist>(
      `${this.genreApiUri}/${genreId}/tracks/${trackId}`,
      {}
    );
  }

  // detaches a track to a genre
  detachTrackFromGenre(genreId: number, trackId: number): Observable<Artist> {
    return this.http.delete<Artist>(
      `${this.genreApiUri}/${genreId}/tracks/${trackId}`
    );
  }
}
