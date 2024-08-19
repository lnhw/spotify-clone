import { ExternalUrls, Image } from './common';

export type Show = {
  available_marjets: string[];
  copyrights: string[];
  description: string;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  is_externally_hosted: boolean;
  languages: string[];
  media_type: string;
  name: string;
  publisher: string;
  type: 'show';
  uri: string;
};
