'use client';
import useResponsive from '@/hooks/useResponsive';
import { fetchSpotify } from '@/utils/spotify/fecthSpotify';
import { Skeleton } from '@nextui-org/skeleton';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { CiPlay1 } from 'react-icons/ci';

export default function Recommended() {
  const [artists, seArtists] = useState<string[]>([]);
  const [tracks, setTracks] = useState<string[]>([]);
  const [recommended, setRecommended] = useState<any[]>([]);
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | undefined>();
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.accessToken) {
      setAccessToken(session?.accessToken);
    }
  }, [session]);
  useEffect(() => {
    const getRecommended = async () => {
      try {
        setLoading(true);
        if (!accessToken) return;
        // Lấy danh sách 10 nghệ sĩ hàng đầu
        const topArtistsResponse = await fetchSpotify(
          'me/top/artists?limit=10',
          accessToken
        );
        const topArtists = topArtistsResponse.items
          .slice(0, 10)
          .map((artist: any) => artist.id);

        // Lấy danh sách 10 bài hát hàng đầu
        const topTracksResponse = await fetchSpotify(
          'me/top/tracks?limit=10',
          accessToken
        );
        const topTracks = topTracksResponse.items.map((track: any) => track.id);

        // Lấy 20 bài hát được đề xuất
        const recommendedResponse = await fetchSpotify(
          `recommendations?limit=20&market=US&seed_artists=${topArtists.join(',')}&seed_genres=country&seed_tracks=${topTracks.join(',')}`,
          accessToken
        );
        setRecommended(recommendedResponse.tracks.slice(0, 6));
        setLoading(false);
      } catch (error) {
        console.error(`Failed to get recommendations error: ${error}`);
        setError('Đã có lỗi xảy ra. Vui lòng thử lại sau.');
        setLoading(false);
      }
    };

    const fetchWithBackoff = async (retries = 3, delay = 500) => {
      try {
        await getRecommended();
      } catch (error: any) {
        if (retries > 0 && error.response?.status === 429) {
          console.error(`Retrying request after ${delay} ms...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
          await fetchWithBackoff(retries - 1, delay * 2);
        } else {
          throw error;
        }
      }
    };

    fetchWithBackoff();
  }, [accessToken]);

  return (
    <section>
      {/* {isMobile && (
                <div className="relative overflow-hidden">
                    <ul className="w-screen flex overflow-x-auto space-x-4 scrollbar-hide pb-4">
                        {loading ? (
                            Array.from({ length: 8 }).map((_, index) => (
                                <li key={index} className="flex-none w-32">
                                    <Skeleton className="w-32 h-32 mb-2 rounded-lg" />
                                    <Skeleton className="w-24 h-4 mb-1" />
                                    <Skeleton className="w-20 h-3" />
                                </li>
                            ))
                        ) : error ? (
                            <li className="text-red-500 w-full text-center">{error}</li>
                        ) : (
                            recommended.map((track: any, index) => (
                                <li key={index} className="flex-none w-32 first:ml-4 last:mr-16">
                                    <div className="flex flex-col items-center rounded-md shadow">
                                        <div className="aspect-square bg-gray-700 mb-2 rounded-lg overflow-hidden">
                                            <Image
                                                src={track.album.images[0].url}
                                                alt={track.album.name}
                                                width={128}
                                                height={128}
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="w-full px-2">
                                            <p className="text-white text-sm font-medium truncate">{track.album.name}</p>
                                            <p className="text-xs text-[#6e6e6e] truncate">{track.artists[0].name}</p>
                                        </div>
                                    </div>
                                </li>
                            ))
                        )}
                    </ul>
                    <div className="absolute top-0 right-0 bottom-0 w-16 bg-gradient-to-l from-gray-900 to-transparent pointer-events-none"></div>
                </div>
            )} */}
      {isTablet && <div className="text-white"> is Tablet</div>}
      {isDesktop && (
        <>
          <div className="flex items-center justify-between">
            <h1 className=" text-white text-2xl font-bold mb-2">
              Gợi ý cho bạn
            </h1>
            <div className="">
              <button type="button" role="button">
                <span className="text-white text-base pr-3">
                  Hiển thị tất cả
                </span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {recommended.map((track: any) => (
              <div
                key={track.id}
                className="flex flex-col items-center justify-between hover:bg-[#1b1b1b] rounded-md overflow-hidden cursor-pointer"
              >
                <div className="w-[160] h-[214px] p-3">
                  <div className="relative group">
                    <div className="w-32 h-32 rounded-md overflow-hidden mb-2">
                      <Image
                        className="w-full h-full object-cover"
                        src={track.album.images[0].url}
                        alt={track.album.name}
                        fill
                        quality={100}
                        priority
                      />
                    </div>
                    <CiPlay1
                      className="absolute right-3 bottom-2 p-1 opacity-0 group-hover:opacity-100 transform transition duration-150 ease-in-out group-hover:-translate-y-2 bg-green-600 rounded-full "
                      color="black"
                      size={40}
                    />
                  </div>
                  <div className="flex flex-col items-start">
                    <p className="text-white text-base text-pretty font-medium line-clamp-1">
                      {track.album.name}
                    </p>
                    <p className="text-[#a8a8a8] text-sm font-medium">
                      {track.artists[0].name}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
