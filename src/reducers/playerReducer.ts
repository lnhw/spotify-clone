import { PlayerAction, PlayerActionTypes } from "@/actions/playerAction";
// import { PlayerState } from "@/contexts/playerbar/playerContext";
import { Track } from "@/types/spotify";

interface PlayerState {
    isPlaying: boolean;
    isRepeat: boolean;
    isShuffle: boolean;
    currentTrack: any | null;
    tracks: Track[] | null;

}
const initialState: PlayerState = {
    isPlaying: false,
    isRepeat: false,
    isShuffle: false,
    currentTrack: null,
    tracks: null,
    // playlist: null
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
        // return {
        //     ...state,
        //     currentTrack: state.isShuffle
        //         ? Math.floor(Math.random() * (state.tracks?.length ?? 0))
        //         : ((state.currentTrack ?? 0) + 1) % (state.tracks?.length ?? 1)
        // }
        // case PlayerActionTypes.PREV:
        //     return {
        //         ...state,
        //         currentTrack: (state.currentTrack === 0 || state.currentTrack === null)
        //             ? (state.tracks?.length ?? 1) - 1
        //             : (state.currentTrack ?? 0) - 1
        //     };
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
        default:
            return state;
    }
}