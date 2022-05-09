import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TracksPaginated } from './models/tracks-paginated.model';

@Injectable({
  providedIn: 'root',
})
export class TracksService {
  trackApiUri: string;

  constructor(private http: HttpClient) {
    this.trackApiUri = `${environment.apiUrl}/tracks`;
  }

  // search tracks (the result are paginated)
  searchTracks(searchTerm: string, pageNumber: number): Observable<TracksPaginated> {
    const pageSize: number = 10;
    return this.http.get<TracksPaginated>(`${this.trackApiUri}/search?title=${searchTerm}&pageNumber=${pageNumber}&pageSize=${pageSize}`)
  }
}
