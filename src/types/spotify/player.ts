import { ExternalUrls } from './common';
import { Episode } from './episodes';
import { Track } from './tracks';

export type Device = {
  id: string;
  is_active: boolean;
  is_private_session: boolean;
  is_restricted: boolean;
  name: string;
  type: string;
  volume_percent: number;
};
export type Context = {
  external_urls: ExternalUrls;
  href: string;
  type: 'album' | 'artist' | 'playlist';
  uri: string;
};
export type PlaybackState = {
  timestamp: number;
  context: Context;
  progress_ms: number;
  item: Track | Episode | null;
  currently_playing_type: 'track' | 'espiode' | 'ad' | 'unknown';
  device: Device;
  repeat_state: 'off' | 'track' | 'context';
  shuffle_state: boolean;
  actions: {
    disallows: {
      [key: string]: boolean;
    };
  };
  is_playing: boolean;
};
