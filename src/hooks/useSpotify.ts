import { useSession } from 'next-auth/react';
import { spotifyApi } from '@/libs/spotifyApi';

export const useSpotify = () => {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;
  console.log(accessToken);
  const callSpotifyApi = async (
    endpoint: string,
    options: RequestInit = {}
  ) => {
    if (!accessToken) {
      throw new Error('Acess token invalid');
    }
    return spotifyApi(endpoint, accessToken, options);
  };
  return { callSpotifyApi };
};
