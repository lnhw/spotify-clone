import { Artist } from "./artlists";
import { ExternalUrls, Image } from "./common";

export type Album = {
    album_type: string;
    artists: Artist[];
    avaliable_markets: string[];
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: "album";
    uri: string;
}