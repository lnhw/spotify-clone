'use client';
import { PlayerAction, PlayerActions } from '@/actions/playerAction';
import { PlayerReducer } from '@/reducers/playerReducer';
import { Playlist, Track } from '@/types/spotify';
import { useSession } from 'next-auth/react';
import React, {
  createContext,
  Dispatch,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from 'react';

export type PlayerState = {
  isPlaying: boolean;
  isRepeat: boolean;
  isShuffle: boolean;
  currentTrack: Track | null;
  tracks: Track[] | null;
  currentTime: number;
  duration: number;
};

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
  currentTime: 0,
  duration: 0,
};

export const PlayerContext = createContext<PlayerContextType>({
  state: initialState,
  dispatch: () => {},
});

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(PlayerReducer, initialState);
  const { data: session } = useSession();
  const [accessToken, setAccessToken] = useState<string | undefined>();
  useEffect(() => {
    if (session && session?.accessToken) {
      setAccessToken(session?.accessToken);
    }
  }, [session]);

  const getCurrentPlayingTrack = useCallback(() => {
    if (accessToken) {
      PlayerActions.getCurrentPlayingTrack(accessToken, dispatch);
    }
  }, [accessToken, dispatch]);

  const updateCurrentTime = useCallback(() => {
    if (state.isPlaying && accessToken) {
      dispatch(PlayerActions.setCurrentTime(state.currentTime + 1000)); // Increase currentTime by 1 second
    }
  }, [state.isPlaying, state.currentTime, accessToken, dispatch]);

  useEffect(() => {
    if (accessToken) {
      getCurrentPlayingTrack();
      const trackInterval = setInterval(getCurrentPlayingTrack, 10000);
      const timeInterval = setInterval(updateCurrentTime, 1000);
      return () => {
        clearInterval(trackInterval);
        clearInterval(timeInterval);
      };
    }
  }, [accessToken, getCurrentPlayingTrack, updateCurrentTime]);

  const formatTime = (timeInMs: number) => {
    const minutes = Math.floor(timeInMs / 60000);
    const seconds = Math.floor((timeInMs % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  return (
    <PlayerContext.Provider value={{ state, dispatch }}>
      {children}
    </PlayerContext.Provider>
  );
};
