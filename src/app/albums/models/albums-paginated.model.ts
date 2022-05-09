import { Album } from './album.model';

export interface AlbumsPaginated {
  totalItems: number;
  totalPages: number;
  items: Album[];
}
