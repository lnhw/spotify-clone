"use client"
import React, { useEffect, useState } from "react";
import useSearch from "@/hooks/useSearch";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { fetchSpotify } from "@/utils/spotify/fecthSpotify";
import { useSession } from "next-auth/react";
import useResponsive from "@/hooks/useResponsive";

export default function PageSearch() {
    const { results } = useSearch();
    const searchParams = useSearchParams();
    const query = searchParams.get("query");
    const topResult = results[0];
    const otherResults = results.slice(1, 6);
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [accessToken, setAccessToken] = useState<string | undefined>("");
    const { data: session } = useSession();
    const { isMobile, isTablet, isDesktop } = useResponsive();

    useEffect(() => {
        if (session && session?.accessToken) {
            setAccessToken(session?.accessToken);
        }
    }, [session]);

    useEffect(() => {
        async function fetchGenres() {
            try {
                if (!accessToken) return;
                const res = await fetchSpotify("browse/categories", accessToken);
                setGenres(res.categories.items);
            } catch (error) {
                console.error("Error fetching genres:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchGenres();
    }, [accessToken]);
    return (
        <div>

            {query ? (
                <>
                    {isMobile && (
                        <React.Suspense >
                            <div className="text-white">is mobile</div>
                        </React.Suspense>
                    )}
                    {isDesktop && (
                        <React.Suspense>
                            <div className="p-4">
                                <h1 className="text-white text-2xl mb-4">Search Results for &quot;{query}&quot;</h1>
                                <div className="flex">
                                    {/* Top Result */}
                                    {topResult && topResult.album && (
                                        <div className="bg-gray-800 p-4 rounded w-1/3">
                                            <h2 className="text-white text-lg mb-2">Kết quả hàng đầu</h2>
                                            <Image
                                                src={topResult.album.images[0].url}
                                                alt={topResult.name}
                                                className="w-full h-48 object-cover rounded mb-2"
                                                width={300}
                                                height={300}
                                            />
                                            <h2 className="text-white text-lg">
                                                {topResult.name}
                                            </h2>
                                            <p className="text-gray-400">
                                                Bài hát · {topResult.artists[0].name}
                                            </p>
                                        </div>
                                    )}
                                    {/* Songs List */}
                                    <div className="ml-4 flex-grow">
                                        <h2 className="text-white text-lg mb-2">Bài hát</h2>
                                        {otherResults.map((result: any) => (
                                            result.album && (
                                                <div key={result.id} className="flex items-center mb-2">
                                                    <Image
                                                        className="w-12 h-12 rounded mr-2"
                                                        src={result.album.images[0].url}
                                                        alt={result.name}
                                                        width={48}
                                                        height={48}
                                                        style={{ objectFit: "contain" }}
                                                    />
                                                    <div>
                                                        <h3 className="text-white">{result.name}</h3>
                                                        <p className="text-gray-400">{result.artists[0].name}</p>
                                                    </div>
                                                    <span className="text-gray-400 ml-auto">
                                                        {new Date(result.duration_ms).toISOString().substr(14, 5)} {/* Format duration */}
                                                    </span>
                                                </div>
                                            )
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </React.Suspense>
                    )}
                </>
            ) : (
                <>
                    {isMobile && (
                        <React.Suspense>
                            <div className="text-white">is mobile</div>
                        </React.Suspense>
                    )}
                    {isDesktop && (
                        <React.Suspense fallback={<></>}>
                            <div className="p-4">
                                <h1 className="text-white text-2xl mb-4">Thể loại</h1 >
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {genres.map((genre: any, index: number) => (
                                        <div key={index} className="relative">
                                            <Image
                                                src={genre.icons[0].url}
                                                alt={genre.name}
                                                width={200}
                                                height={200}
                                                className="w-full h-40 object-cover rounded"
                                            />
                                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
                                                <h3 className="text-white text-lg truncate">{genre.name}</h3>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div >
                        </React.Suspense>
                    )}
                </>
            )}
        </div>
    );
}