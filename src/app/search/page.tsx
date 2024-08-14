"use client"

import React, { useEffect, useState } from "react";
import useSearch from "@/hooks/useSearch";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { fetchSpotify } from "@/utils/spotify/fecthSpotify";
import { useSession } from "next-auth/react";
import useResponsive from "@/hooks/useResponsive";
import { IoIosArrowRoundBack, IoMdSearch } from "react-icons/io";
import Search from "@/components/search";

export default function PageSearch() {
    const { results } = useSearch();
    const searchParams = useSearchParams();
    const query = searchParams.get("query");
    const topResult = results[0];
    const otherResults = results.slice(1, 6);
    const [genres, setGenres] = useState([]);
    const [accessToken, setAccessToken] = useState<string | undefined>("");
    const { data: session } = useSession();
    const { isMobile, isTablet, isDesktop } = useResponsive();
    const router = useRouter();

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
            }
        }
        fetchGenres();
    }, [accessToken]);

    function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        router.back();
    }
    return (
        <div>
            {query ? (
                <>
                    {isMobile && (
                        <React.Suspense >
                            <div className="">
                                <div className="p-2">
                                    <div className="flex items-center justify-center space-x-2">
                                        <button className="border-none outline-none" type="button" role="button" onClick={handleClick}>
                                            <IoIosArrowRoundBack color="white" size={30}
                                            />
                                        </button>
                                        <div className="">
                                            <Search />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    {topResult && topResult.album && (
                                        <div className=" p-4 rounded">
                                            <h2 className="text-white text-lg mb-2">Kết quả hàng đầu</h2>
                                            <div className="flex items-center">
                                                <Image
                                                    src={topResult.album.images[0].url}
                                                    alt={topResult.name}
                                                    className=" object-cover rounded mb-2"
                                                    width={48}
                                                    height={48}
                                                />
                                                <div className="flex-grow pl-1 flex flex-col items-start">
                                                    <h2 className="text-white text-sm font-normal">
                                                        {topResult.name}
                                                    </h2>
                                                    <p className="text-gray-400 text-[13px] font-normal">
                                                        Bài hát · {topResult.artists[0].name}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    {/* Songs List */}
                                    <div className="ml-4 flex-grow">
                                        <h2 className="text-white text-lg mb-2"> Bài hát có từ khóa {query} </h2>
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
                            <div className="px-4 py-2 flex items-center space-x-2">
                                <button className="border-none outline-none" type="button" role="button" onClick={handleClick}>
                                    <IoIosArrowRoundBack color="white" size={30} />
                                </button>
                                <div className="">
                                    <Search />
                                </div>
                            </div>
                            <div className=""></div>
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