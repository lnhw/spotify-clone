"use client";

import { fetchSpotify } from "@/utils/spotify/fecthSpotify";
import React, { Suspense, useEffect, useRef, useState, useId } from "react";
import Image from "next/image";
import { Skeleton } from "@nextui-org/skeleton";
import useResponsive from "@/hooks/useResponsive";
import { TfiControlShuffle } from "react-icons/tfi";
import { useSession } from "next-auth/react";

export default function RecentlyPlayed() {
    const [accessToken, setAccessToken] = useState<string | undefined>();
    const [recentlyPlayed, setRecentlyPlayed] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null);
    const [isNarrow, setIsNarrow] = useState(false);
    const containerRef = useRef<HTMLUListElement>(null);
    const { isMobile, isTablet, isDesktop } = useResponsive();
    const { data: session } = useSession();
    useEffect(() => {
        if (session?.accessToken) {
            setAccessToken(session?.accessToken);
        }
    }, [session]);

    useEffect(() => {
        const fetchRecentlyPlayed = async () => {
            setLoading(true); // Bắt đầu trạng thái loading
            try {
                if (!accessToken) return;
                const res = await fetchSpotify("me/player/recently-played?limit=8", accessToken, {
                    method: "GET"
                });
                setRecentlyPlayed(res.items);
                setLoading(false); // Kết thúc trạng thái loading
            } catch (error) {
                console.error("Error fetching recently played songs:", error);
                setError("Failed to load recently played songs."); // Cập nhật trạng thái lỗi
                setLoading(false); // Kết thúc trạng thái loading
            }
        };
        fetchRecentlyPlayed();
    }, [accessToken]);

    useEffect(() => {
        const retryCheck = () => {
            const currentContainer = containerRef.current;
            if (!currentContainer) {
                setTimeout(retryCheck, 100);
                return;
            }
            const checkSize = () => {
                const width: number | undefined = currentContainer?.offsetWidth;
                // console.log("Container width:", width);
                if (width && width < 768) {
                    setIsNarrow(true);
                } else {
                    setIsNarrow(false);
                }
            }

            const observer = new ResizeObserver(checkSize);
            observer.observe(currentContainer);
            checkSize();

            return () => {
                if (currentContainer) {
                    observer.unobserve(currentContainer);
                }
            }
        };
        retryCheck();
    }, []);

    return (
        <section className="pb-4 flex">
            {/* mobile ui */}
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
                            recentlyPlayed.map((item, index) => (
                                <li key={index} className="flex-none w-32 first:ml-4 last:mr-16">
                                    <div className="flex flex-col items-center rounded-md shadow">
                                        <div className="aspect-square bg-gray-700 mb-2 rounded-lg overflow-hidden">
                                            <Image
                                                src={item.track.album.images[0]?.url}
                                                alt={item.track.name}
                                                width={128}
                                                height={128}
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="w-full px-2">
                                            <p className="text-white text-sm font-medium truncate">{item.track.name}</p>
                                            <p className="text-xs text-[#6e6e6e] truncate">{item.track.artists[0].name}</p>
                                        </div>
                                    </div>
                                </li>
                            ))
                        )}
                    </ul>
                    <div className="absolute top-0 right-0 bottom-0 w-16 bg-gradient-to-l from-gray-900 to-transparent pointer-events-none"></div>
                </div>
            )}
            {/* desktop ui */}
            {isDesktop && (
                <ul ref={containerRef} className={`flex-grow grid gap-2  ${isNarrow ? 'grid-cols-2 grid-rows-4' : 'grid-cols-4 grid-rows-2'} `}>
                    {loading ? (
                        //hien thi Skeleton cho tung phan tu trong danh sach
                        <li className="h-full rounded shadow bg-slate-300 hover:bg-slate-400 overflow-hidden">
                            {Array.from({ length: 8 }).map((_, index) => (
                                <div key={index} className="flex items-center">
                                    <Skeleton>
                                        <div className="w-[48px] h-[48px]">
                                        </div>
                                    </Skeleton>
                                    <Skeleton className="bg-slate-300 h-[48px] w-full pl-2">
                                        <div className=" h-full w-full"></div>
                                    </Skeleton>
                                </div>
                            ))}
                        </li>
                    ) : error ? (
                        <div className="text-red-500">
                            {error}
                        </div>
                    ) : (
                        <>
                            {recentlyPlayed.map((item, index) => (
                                <li key={index} className="h-full rounded shadow bg-[#32312a] hover:bg-[#494941] overflow-hidden">
                                    <div className="flex items-center rounded-md shadow h-full">
                                        < Image
                                            src={item.track.album.images[0]?.url}
                                            alt={item.track.name}
                                            height={48}
                                            width={48}
                                        />
                                        <div className="text-white pl-2 overflow-hidden">
                                            <p className="text-white truncate">{item.track.name}</p>
                                            <p className="text-xs text-[#6e6e6e] truncate">{item.track.artists[0].name}</p>
                                        </div>
                                    </div>

                                </li>
                            ))}
                        </>
                    )}
                </ul >
            )}
        </section >
    );
}

