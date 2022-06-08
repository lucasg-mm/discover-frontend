import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TracksPaginated } from './models/tracks-paginated.model';
import { Track } from './models/track.model';

@Injectable({
  providedIn: 'root',
})
export class TracksService {
  trackApiUri: string;

  constructor(private http: HttpClient) {
    this.trackApiUri = `${environment.apiUrl}/tracks`;
  }

  // get all tracks in a paginated way
  getAllTracks(
    pageNumber: number,
    pageSize: number = 10
  ): Observable<TracksPaginated> {
    return this.http.get<TracksPaginated>(
      `${this.trackApiUri}?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  // search tracks (the result are paginated)
  searchTracks(
    searchTerm: string,
    pageNumber: number,
    pageSize: number = 10
  ): Observable<TracksPaginated> {
    return this.http.get<TracksPaginated>(
      `${this.trackApiUri}/search?title=${searchTerm}&pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  // creates a new track
  createTrack(trackToBeCreated: Track): Observable<Track> {
    return this.http.post<Track>(this.trackApiUri, trackToBeCreated);
  }

  // updates the track info
  updateTrackInfo(trackId: number, track: Track): Observable<Track> {
    return this.http.put<Track>(`${this.trackApiUri}/${trackId}`, track);
  }

  // find a specific track by its id
  findTrackById(trackId: number): Observable<Track> {
    return this.http.get<Track>(`${this.trackApiUri}/${trackId}`);
  }

  // deletes a track by their id
  deleteTrackById(trackId: number): Observable<void> {
    return this.http.delete<void>(`${this.trackApiUri}/${trackId}`);
  }
}
