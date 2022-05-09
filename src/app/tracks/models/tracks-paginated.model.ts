import { Track } from './track.model';

export interface TracksPaginated {
  totalItems: number;
  totalPages: number;
  items: Track[];
}
