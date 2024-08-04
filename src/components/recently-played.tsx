"use client";

import { fetchSpotify } from "@/utils/spotify/fecthSpotify";
import { useSession } from "next-auth/react";
import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { Skeleton } from "@nextui-org/skeleton";
// const RecentlyPlayList = React.lazy(() => import("./recently/RecentlyPlayedList"));
export default function RecentlyPlayed() {
    const { data: session } = useSession();
    const [accessToken, setAccessToken] = useState<string | undefined>();
    const [recentlyPlayed, setRecentlyPlayed] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        if (session?.accessToken) {
            setAccessToken(session.accessToken);
        }
    }, [session]);
    useEffect(() => {
        if (accessToken) {
            const fetchRecentlyPlayed = async () => {
                setLoading(true); // Bắt đầu trạng thái loading
                try {
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
        }
    }, [accessToken]);
    return (
        <section className="pb-4 ">
            <ul className=" grid gap-3 md:grid-cols-4 md:grid-rows-2">
                {loading ? (
                    //hien thi Skeleton cho tung phan tu trong danh sach
                    Array.from({ length: 8 }).map((_, index) => (
                        <li key={index}>
                            <div className="flex items-center rounded-md shadow overflow-hidden">
                                <Skeleton>
                                    <div className="w-[48px] h-[48px]">
                                    </div>
                                </Skeleton>
                                <Skeleton className="bg-slate-300 h-[48px] w-full pl-2">
                                    <div className=" h-full w-full"></div>
                                </Skeleton>
                            </div>
                        </li>
                    ))
                ) : error ? (
                    <div className="text-red-500">
                        {error}
                    </div>

                ) : (
                    recentlyPlayed.map((item, index) => (
                        <li key={index}>
                            <div className="flex items-center rounded-md shadow">
                                <Image
                                    src={item.track.album.images[0]?.url}
                                    alt={item.track.name}
                                    height={48}
                                    width={48}
                                />
                                <div className="text-white pl-2">
                                    {item.track.name}
                                </div>
                            </div>
                        </li>
                    ))
                )}
            </ul>
            {/* <Suspense>
                {accessToken && <RecentlyPlayList accessToken={accessToken} />}
            </Suspense> */}
        </section>
    );
}
// export const SkeletonList = () => {
//     return (
//         <ul className="grid gap-3 md:grid-cols-4 md:grid-rows-2">
//             {Array.from({ length: 8 }).map((_, index) => (
//                 <li key={index}>
//                     <div className="flex items-center rounded-md shadow overflow-hidden">
//                         <Skeleton>
//                             <div className="w-[48px] h-[48px]"></div>
//                         </Skeleton>
//                         <Skeleton className="bg-slate-300 h-[48px] w-full pl-2">
//                             <div className="h-full w-full"></div>
//                         </Skeleton>
//                     </div>
//                 </li>
//             ))}
//         </ul>
//     );
// }