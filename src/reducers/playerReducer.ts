import { PlayerAction, PlayerActionTypes } from "@/actions/playerAction";
// import { PlayerState } from "@/contexts/playerbar/playerContext";
import { Track } from "@/types/spotify";

interface PlayerState {
    isPlaying: boolean;
    isRepeat: boolean;
    isShuffle: boolean;
    currentTrack: any | null;
    tracks: Track[] | null;
    currentTime: number;
    duration: number;

}
const initialState: PlayerState = {
    isPlaying: false,
    isRepeat: false,
    isShuffle: false,
    currentTrack: null,
    tracks: null,
    currentTime: 0,
    duration: 0,
}
export const PlayerReducer = (state: PlayerState = initialState, action: PlayerAction) => {
    switch (action.type) {
        case PlayerActionTypes.PLAY:
            return {
                ...state,
                isPlaying: true,
            }
        case PlayerActionTypes.PAUSE:
            return {
                ...state,
                isPlaying: false,
            }
        case PlayerActionTypes.NEXT:
        case PlayerActionTypes.TOGGLE_REPEAT:
            return { ...state, isRepeat: !state.isRepeat };
        case PlayerActionTypes.TOGGLE_SHUFFLE:
            return { ...state, isShuffle: !state.isShuffle };
        case PlayerActionTypes.SET_CURRENT_TRACK:
            return {
                ...state,
                currentTrack: action.payload
            };
        case PlayerActionTypes.SET_PLAYLIST:
            return { ...state, playlist: action.payload };
        case PlayerActionTypes.SET_CURRENT_TIME:
            return {
                ...state,
                currentTime: action.payload
            };
        case PlayerActionTypes.SET_DURATION:
            return {
                ...state,
                duration: action.payload
            };
        default:
            return state;
    }
}