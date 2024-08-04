"use client";
import { fetchSpotify } from "@/utils/spotify/fecthSpotify";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import notfound from "@/assest/img/notfound.jpg";
import { CiPlay1 } from "react-icons/ci";
export default function Album() {
    const { data: session, status } = useSession();
    const [accessToken, setAccessToken] = useState<string | undefined>();
    const [albums, setAlbums] = useState<string[] | undefined>([]);
    // console.log(albums);
    useEffect(() => {
        if (session?.accessToken) {
            setAccessToken(session.accessToken);
        }
    }, [session]);

    useEffect(() => {
        async function getAlbums() {
            try {
                if (!accessToken) return;
                const res = await fetchSpotify("browse/new-releases?limit=10", accessToken);
                console.log("albums", res.albums);
                if (res.albums.items) {
                    setAlbums(res.albums.items);
                }
            } catch (error) {
                console.error(error);
            }
        }
        getAlbums();
    }, [accessToken]);
    return (
        <div>
            <div className="flex items-center justify-between">
                <h1 className=" text-white text-2xl font-bold mb-2">Album phổ biến</h1>
                <div className="">
                    <button type="button" role="button">
                        <span className="text-white text-base pr-3">Hiển thị tất cả</span>
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {albums?.map((album: any) => (
                    <div key={album.id} className="flex flex-col items-center justify-between hover:bg-[#1b1b1b] rounded-md overflow-hidden cursor-pointer">
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
                                <CiPlay1 className="absolute right-3 bottom-2 p-1 opacity-0 group-hover:opacity-100 transform transition duration-150 ease-in-out group-hover:-translate-y-2 bg-green-600 rounded-full "
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
        </div >
    );
}