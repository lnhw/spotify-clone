import { Artist } from './artlists';
import { ExternalUrls, Image } from './common';

export type Narrator = {
  name: string;
};
export type Audiobook = {
  authors: Artist[];
  available_markets: string[];
  copyright: string;
  description: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  languages: string[];
  media_type: string;
  name: string;
  narrators: Narrator[];
  publisher: string;
  release_date: string;
  total_chapters: number;
  type: 'audiobook';
  uri: string;
};
