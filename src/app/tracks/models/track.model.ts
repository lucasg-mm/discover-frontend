import { Genre } from "src/app/genres/models/genre.model";
import { Artist } from "src/app/artists/models/artists.model";
import { Album } from "src/app/albums/models/album.model";

export interface Track {
  id?: number;
  title: string;
  length: number;
  genres?: Genre[];
  artists?: Artist[];
  album?: Album,
}
