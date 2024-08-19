'use client';
import React from 'react';
import type { Artlist } from '@/types/spotify';
import { fetchSpotify } from '@/utils/spotify/fecthSpotify';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import notfound from '@/assest/img/notfound.jpg';
import { CiPlay1 } from 'react-icons/ci';
import useResponsive from '@/hooks/useResponsive';
import { Skeleton } from '@nextui-org/skeleton';
export default function Artlist() {
  const { data: session } = useSession();
  const [accessToken, setAccessToken] = useState<string | undefined>();
  const [artists, setArtists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const [isNarrow, setIsNarrow] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (session?.accessToken) {
      setAccessToken(session?.accessToken);
    }
  }, [session]);

  useEffect(() => {
    const getTopArtist = async () => {
      try {
        if (!accessToken) return;
        const response = await fetchSpotify('me/top/artists', accessToken);
        if (response.items) {
          setArtists(response.items.slice(0, 6));
        }
      } catch (error) {
        console.error(`Failed to get top artist error : ${error}`);
        setError('failed to fetch artlist');
      } finally {
        setLoading(false);
      }
    };
    getTopArtist();
  }, [accessToken]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="pb-4">
      {isMobile && (
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
              artists.map((artist, index) => (
                <li
                  key={index}
                  className="flex-none w-32 first:ml-4 last:mr-16"
                >
                  <div className="flex flex-col items-center rounded-md shadow">
                    <div className="aspect-square bg-gray-700 mb-2 rounded-lg overflow-hidden">
                      <Image
                        src={artist.images[0]?.url || notfound}
                        alt={artist.name}
                        width={128}
                        height={128}
                        className="object-cover"
                      />
                    </div>
                    <div className="w-full px-2">
                      <p className="text-white text-sm font-medium truncate">
                        {artist.name}
                      </p>
                      <p className="text-xs text-[#6e6e6e] truncate">
                        {artist.name}
                      </p>
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
          <div className="absolute top-0 right-0 bottom-0 w-16 bg-gradient-to-l from-gray-900 to-transparent pointer-events-none"></div>
        </div>
      )}
      {isTablet && <>tablet</>}
      {isDesktop && (
        <div className="flex flex-col ">
          <div className="flex items-center justify-between">
            <h1 className="text-white text-2xl font-bold mb-2">
              Danh sách nghệ sĩ nổi tiếng
            </h1>
            <div>
              <button type="button" role="buton" className="">
                <span className="text-white text-base pr-3">
                  Hiển thi tất cả
                </span>
              </button>
            </div>
          </div>
          <div ref={containerRef} className="grid grid-cols-6">
            {artists.map((artist: any) => (
              <div
                key={artist.id}
                className="flex flex-col items-center justify-between hover:bg-[#1b1b1b] rounded-md Foverflow-hidden cursor-pointer"
              >
                <div className="p-3 w-[160px] h-[214px]">
                  <div className="relative group">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden mb-2">
                      <Image
                        className="w-full h-full object-cover"
                        src={artist.images[0]?.url || notfound}
                        alt={artist.name}
                        fill
                        quality={100}
                      />
                    </div>
                    <>
                      <CiPlay1
                        className="absolute right-3 bottom-2 p-1 opacity-0 group-hover:opacity-100 transform transition duration-150 ease-in-out group-hover:-translate-y-2 bg-green-600 rounded-full "
                        color="black"
                        size={40}
                      />
                    </>
                  </div>
                  <div className="flex flex-col items-start justify-between">
                    <p className="text-white text-center text-base font-medium">
                      {artist.name}
                    </p>
                    <p className="text-[#a8a8a8] text-center text-sm font-medium">
                      {artist.type}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
