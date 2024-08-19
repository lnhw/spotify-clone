import { ExternalUrls, Image } from './common';

export type Followers = {
  href: string | null;
  total: number;
};
export type Artlist = {
  external_urls: ExternalUrls;
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: 'artlist';
  uri: string;
};
