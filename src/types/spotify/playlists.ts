import { ExternalUrls, Image } from "./common";
import { Track } from "./tracks";
import { Followers } from "./artlists";
import { User } from "./users";

export type PlaylistTrack = {
    added_at: string;
    added_by: User;
    is_local: boolean;
    track: Track;
}
export type Playlist = {
    collaborative: boolean;
    description: string;
    external_urls: ExternalUrls;
    followers: Followers;
    href: string;
    id: string;
    images: Image;
    name: string;
    owner: User;
    public: boolean;
    snapshot_id: string;
    track: {
        href: string;
        items: PlaylistTrack[];
        total: number;
    };
    type: "playlist";
    uri: string;
}