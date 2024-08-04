"use client";
import { PlayerAction, PlayerActions } from "@/actions/playerAction";
import { PlayerReducer } from "@/reducers/playerReducer";
import { Playlist, Track } from "@/types/spotify";
import { useSession } from "next-auth/react";
import React, { createContext, Dispatch, useCallback, useEffect, useReducer, useState } from "react";

export type PlayerState = {
    isPlaying: boolean;
    isRepeat: boolean;
    isShuffle: boolean;
    currentTrack: Track | null;
    tracks: Track[] | null;
    // playlist: Playlist[] | null;
}

interface PlayerContextType {
    state: PlayerState;
    dispatch: Dispatch<PlayerAction>;
}

const initialState: PlayerState = {
    isPlaying: false,
    isRepeat: false,
    isShuffle: false,
    currentTrack: null,
    tracks: null,
    // playlist: null,
}

export const PlayerContext = createContext<PlayerContextType>({
    state: initialState,
    dispatch: () => { }
});

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(PlayerReducer, initialState);
    const { data: session } = useSession();
    const [accessToken, setAccessToken] = useState<string | undefined>();
    // console.log("session", session?.accessToken);
    useEffect(() => {
        if (session && session?.accessToken) {
            setAccessToken(session?.accessToken);
        }
        else {
            // console.log("session", session?.accessToken)
        }
    }, [session]);

    const getCurrentPlayingTrack = useCallback(() => {
        if (accessToken) {
            PlayerActions.getCurrentPlayingTrack(accessToken, dispatch)
        }
    }, [accessToken, dispatch]);

    useEffect(() => {
        if (accessToken) {
            getCurrentPlayingTrack();
            const intervalId = setInterval(getCurrentPlayingTrack, 10000);
            return () => clearInterval(intervalId);
        }
    }, [accessToken, getCurrentPlayingTrack]);

    return (
        <PlayerContext.Provider value={{ state, dispatch }}>
            {children}
        </PlayerContext.Provider>
    );
}