import { Genre } from "src/app/genres/models/genre.model"

export interface Artist{
    id?: number,
    name: string,
    genres?: Genre[]
}