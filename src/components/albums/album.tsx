'use client';
import { fetchSpotify } from '@/utils/spotify/fecthSpotify';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import notfound from '@/assest/img/notfound.jpg';
import { CiPlay1 } from 'react-icons/ci';
import useResponsive from '@/hooks/useResponsive';
import { Skeleton } from '@nextui-org/skeleton';
export default function Album() {
  const { data: session, status } = useSession();
  const [accessToken, setAccessToken] = useState<string | undefined>();
  const [albums, setAlbums] = useState<string[] | undefined>([]);
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (session?.accessToken) {
      setAccessToken(session.accessToken);
    }
  }, [session]);

  useEffect(() => {
    async function getAlbums() {
      try {
        if (!accessToken) return;
        const res = await fetchSpotify(
          'browse/new-releases?limit=10',
          accessToken
        );
        // console.log("albums", res.albums);
        if (res.albums.items) {
          setAlbums(res.albums.items.slice(0, 6));
        }
      } catch (error) {
        console.error(error);
      }
    }
    getAlbums();
  }, [accessToken]);
  return (
    <section>
      {/* {isMobile && (<div className="text-white">is Mobile</div>)} */}
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
              albums?.map((album: any, index) => (
                <li
                  key={index}
                  className="flex-none w-32 first:ml-4 last:mr-16"
                >
                  <div className="flex flex-col items-center rounded-md shadow">
                    <div className="aspect-square bg-gray-700 mb-2 rounded-lg overflow-hidden">
                      <Image
                        src={album.images[0]?.url || notfound}
                        alt={album.name}
                        width={128}
                        height={128}
                        className="object-cover"
                      />
                    </div>
                    <div className="w-full px-2">
                      <p className="text-white text-sm font-medium truncate">
                        {album.name}
                      </p>
                      <p className="text-xs text-[#6e6e6e] truncate">
                        {album.artists[0].name}
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
      {isTablet && <></>}
      {isDesktop && (
        <div>
          <div className="flex items-center justify-between">
            <h1 className=" text-white text-2xl font-bold mb-2">
              Album phổ biến
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
            {albums?.map((album: any) => (
              <div
                key={album.id}
                className="flex flex-col items-center justify-between hover:bg-[#1b1b1b] rounded-md overflow-hidden cursor-pointer"
              >
                <div className="w-[160] h-[214px] p-3">
                  <div className="relative group">
                    <div className="w-32 h-32 rounded-md overflow-hidden mb-2">
                      <Image
                        className="w-full h-full object-cover"
                        src={album.images[0]?.url || notfound}
                        alt={album.name}
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
                      {album.name}
                    </p>
                    <p className="text-[#a8a8a8] text-sm font-medium">
                      {album.artists[0].name}
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
