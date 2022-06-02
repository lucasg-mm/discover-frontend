import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Album } from '../albums/models/album.model';
import { Track } from '../tracks/models/track.model';
import { ArtistsPaginated } from './models/artists-paginated.model';
import { Artist } from './models/artists.model';

@Injectable({
  providedIn: 'root',
})
export class ArtistsService {
  artistApiUri: string;

  constructor(private http: HttpClient) {
    this.artistApiUri = `${environment.apiUrl}/artists`;
  }

  // get all artists in a paginated way
  getAllArtists(
    pageNumber: number,
    pageSize: number = 10
  ): Observable<ArtistsPaginated> {
    return this.http.get<ArtistsPaginated>(
      `${this.artistApiUri}?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  // find a specific artist by their id
  findArtistById(artistId: number): Observable<Artist> {
    return this.http.get<Artist>(`${this.artistApiUri}/${artistId}`);
  }

  // creates a new artist
  createArtist(artistToBeCreated: Artist): Observable<Artist> {
    return this.http.post<Artist>(this.artistApiUri, artistToBeCreated);
  }

  // search artists
  searchArtists(
    searchTerm: string,
    pageNumber: number,
    pageSize: number = 10
  ): Observable<ArtistsPaginated> {
    return this.http.get<ArtistsPaginated>(
      `${this.artistApiUri}/search?name=${searchTerm}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  // attaches an album to an artist
  attachAlbumToArtist(artistId: number, albumId: number): Observable<Album> {
    return this.http.put<Album>(
      `${this.artistApiUri}/${artistId}/albums/${albumId}`,
      {}
    );
  }

  // detaches an album from an artist
  detachAlbumFromArtist(albumId: number, artistId: number): Observable<Album> {
    return this.http.delete<Album>(
      `${this.artistApiUri}/${artistId}/albums/${albumId}`
    );
  }

  // attaches a track to an artist
  attachTrackToArtist(artistId: number, trackId: number): Observable<Track> {
    return this.http.put<Track>(
      `${this.artistApiUri}/${artistId}/tracks/${trackId}`,
      {}
    );
  }

  // detaches a track from an artist
  detachTrackFromArtist(trackId: number, artistId: number): Observable<Track> {
    return this.http.delete<Track>(
      `${this.artistApiUri}/${artistId}/tracks/${trackId}`
    );
  }

  // get album cover art url
  getProfilePictureUrl(artistId: number): string {
    return `${this.artistApiUri}/${artistId}/image`;
  }

  // uploads an artist's profile picture using multipart/form-data encoding
  setProfilePicture(profilePic: File, artistId: number): Observable<Artist> {
    // constructs the form-data
    const formData = new FormData();
    formData.append('image', profilePic);

    // sends the http request
    return this.http.put<Artist>(
      `${this.artistApiUri}/${artistId}/image`,
      formData
    );
  }

  // gets every album by a certain artist
  getAlbumsByArtist(artistId: number): Observable<Album[]> {
    return this.http.get<Album[]>(`${this.artistApiUri}/${artistId}/albums`);
  }

  // gets every track by a certain artist
  getTracksByArtist(artistId: number): Observable<Track[]> {
    return this.http.get<Track[]>(`${this.artistApiUri}/${artistId}/tracks`);
  }

  // updates the artist info (their name) 
  updateArtistInfo(artistId: number, artist: Artist): Observable<Artist> {
    return this.http.put<Artist>(`${this.artistApiUri}/${artistId}`, artist);
  }
}
