import { Followers } from "./artlists";
import { ExternalUrls, Image } from "./common";
export type User = {
    display_name: string;
    external_urls: ExternalUrls;
    followers: Followers;
    href: string;
    id: string;
    images: Image[];
    type: 'user';
    uri: string;
};