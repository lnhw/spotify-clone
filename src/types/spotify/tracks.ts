import { Album } from './albums';
import { Artist } from './artlists';
import { ExternalUrls } from './common';

export type ExternalIds = {
  isrc: string;
  ean?: string;
  upc?: string;
};
export type Track = {
  album: Album;
  artists: Artist[];
  avaiable_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIds;
  extrenal_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: number;
  track_number: number;
  type: 'track';
  uri: string;
  is_playable?: boolean;
  linked_from?: Track;
};
