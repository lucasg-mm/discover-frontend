import { Genre } from './genre.model';

export interface GenresPaginated {
  totalItems: number;
  totalPages: number;
  items: Genre[];
}
