import { PlaybackState, Playlist, Track } from '@/types/spotify';
import { fetchSpotify } from '@/utils/spotify/fecthSpotify';
import { Dispatch } from 'react';

export enum PlayerActionTypes {
  PLAY = 'PLAY',
  PAUSE = 'PAUSE',
  NEXT = 'NEXT',
  PREV = 'PREV',
  TOGGLE_REPEAT = 'TOGGLE_REPEAT',
  TOGGLE_SHUFFLE = 'TOGGLE_SHUFFLE',
  SET_CURRENT_TRACK = 'SET_CURRENT_TRACK',
  SET_PLAYLIST = 'SET_PLAYLIST',
  SET_CURRENT_TIME = 'SET_CURRENT_TIME',
  SET_DURATION = 'SET_DURATION',
}
export interface PlayerAction {
  type: PlayerActionTypes;
  payload?: any;
}
const createAction = (
  type: PlayerActionTypes,
  payload?: any
): PlayerAction => ({
  type,
  payload,
});
export const PlayerActions = {
  setCurrentTrack: (track: any) =>
    createAction(PlayerActionTypes.SET_CURRENT_TRACK, track),
  setPlayListOfTrack: (playlist: any) =>
    createAction(PlayerActionTypes.SET_PLAYLIST, playlist),
  setCurrentTime: (time: number) =>
    createAction(PlayerActionTypes.SET_CURRENT_TIME, time),
  setDuration: (duration: number) =>
    createAction(PlayerActionTypes.SET_DURATION, duration),
  getCurrentPlayingTrack: async (
    accessToken: string,
    dispatch: Dispatch<PlayerAction>
  ) => {
    try {
      const data = await fetchSpotify(
        'me/player/currently-playing',
        accessToken
      );
      if (data && data.item) {
        dispatch(PlayerActions.setCurrentTrack(data.item));
        dispatch(PlayerActions.setCurrentTime(data.progress_ms));
        dispatch(PlayerActions.setDuration(data.item.duration_ms));
      } else {
        dispatch(PlayerActions.setCurrentTrack(null));
      }
    } catch (error) {
      console.error(`Error fetching currently playing track ${error}`);
    }
  },
  getPlayListOfTrack: async (
    accessToken: string,
    dispatch: Dispatch<PlayerAction>
  ) => {
    try {
      const data = await fetchSpotify('me/playlists', accessToken);
      dispatch(PlayerActions.setPlayListOfTrack(data));
    } catch (err) {
      console.error('Error fetching playlist:', err);
    }
  },
};
