import { Album } from './albums';
import { Artist } from './artlists';
import { Playlist } from './playlists';
import { Track } from './tracks';

export type SearchResult = {
  albums: Album[];
  artists: Artist[];
  playlists: Playlist[];
  tracks: Track[];
};
