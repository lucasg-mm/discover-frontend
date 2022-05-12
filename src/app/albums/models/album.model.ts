import { Genre } from "src/app/genres/models/genre.model"
import { Artist } from "src/app/artists/models/artists.model"

export interface Album{
    id?: number,
    title: string,
    artists?: Artist[],
    genres?: Genre[],
    releaseDate?: string,
    label: string,
    length: number
}