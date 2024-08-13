import { ExternalUrls, Image } from "./common";

export type Chapter = {
    audio_preview_url: string;
    chapter_number: number;
    chapter_type: string;
    description: string;
    duration_ms: number;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    name: string;
    release_date: string;
    type: "chapter";
    uri: string;
}