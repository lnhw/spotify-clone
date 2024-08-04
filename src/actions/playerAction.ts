import { PlaybackState, Playlist, Track } from "@/types/spotify";
import { fetchSpotify } from "@/utils/spotify/fecthSpotify";
import { Dispatch } from "react";

export enum PlayerActionTypes {
    PLAY = 'PLAY',
    PAUSE = 'PAUSE',
    NEXT = 'NEXT',
    PREV = 'PREV',
    TOGGLE_REPEAT = 'TOGGLE_REPEAT',
    TOGGLE_SHUFFLE = 'TOGGLE_SHUFFLE',
    SET_CURRENT_TRACK = "SET_CURRENT_TRACK",
    SET_PLAYLIST = 'SET_PLAYLIST'
}
export interface PlayerAction {
    type: PlayerActionTypes
    payload?: any;
}
const createAction = (type: PlayerActionTypes, payload?: any): PlayerAction => ({
    type,
    payload,
})
export const PlayerActions = {
    setCurrentTrack: (track: any) => createAction(PlayerActionTypes.SET_CURRENT_TRACK, track),
    setPlayListOfTrack: (playlist: any) => createAction(PlayerActionTypes.SET_PLAYLIST, playlist),
    getCurrentPlayingTrack: async (accessToken: string, dispatch: Dispatch<PlayerAction>) => {
        try {
            const data = await fetchSpotify("me/player/currently-playing", accessToken);
            if (data && data.item) {
                dispatch(PlayerActions.setCurrentTrack(data.item));
            } else {
                dispatch(PlayerActions.setCurrentTrack(null));
            }
        } catch (error) {
            console.error(`Error fetching currently playing track ${error}`);
        }
    },
    getPlayListOfTrack: async (accessToken: string, dispatch: Dispatch<PlayerAction>) => {
        try {
            const data = await fetchSpotify('me/playlists', accessToken);
            // if (data.item.length > 0) { }
            // console.log("data:", data);
            dispatch(PlayerActions.setPlayListOfTrack(data));
        } catch (err) {
            console.error('Error fetching playlist:', err);
        }
    }
}

