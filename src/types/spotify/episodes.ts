import { ExternalUrls, Image } from "./common";
import { Show } from "./shows";

export type Episode = {
    audio_preview_url: string;
    description: string;
    duration_ms: number;
    explicit: boolean;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    is_externally_hosted: boolean;
    is_playable: boolean;
    languages: string[];
    release_date: string;
    show: Show;
    type: "episode";
    uri: string;
}