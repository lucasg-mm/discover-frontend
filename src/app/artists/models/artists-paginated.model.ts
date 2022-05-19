import { Artist } from './artists.model';

export interface ArtistsPaginated {
  totalItems: number;
  totalPages: number;
  items: Artist[];
}
