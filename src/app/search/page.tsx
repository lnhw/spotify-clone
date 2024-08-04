"use client"
import React from "react";
import useSearch from "@/hooks/useSearch";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

export default function PageSearch() {
    const { results } = useSearch();
    const searchParams = useSearchParams();
    const query = searchParams.get("query");
    const topResult = results[0];
    const otherResults = results.slice(1, 6);

    return (
        // <div className="p-4">
        //     <h1 className="text-white text-2xl mb-4">Search Results for "{query}"</h1>
        //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        //         {results.map((result: any) => (
        //             <div key={result.id} className="bg-gray-800 p-4 rounded">
        //                 <Image
        //                     src={result.album.images[0].url}
        //                     alt={result.name}
        //                     className="w-full h-48 object-cover rounded mb-2"
        //                     width={300}
        //                     height={300}
        //                 />
        //                 <h2 className="text-white text-lg">
        //                     {result.name}
        //                 </h2>
        //                 <p className="text-gray-400">
        //                     {result.artists[0].name}
        //                 </p>
        //             </div>
        //         ))}
        //     </div>
        // </div>
        <div className="p-4">
            <h1 className="text-white text-2xl mb-4">Search Results for "{query}"</h1>
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
                                    src={result.album.images[0].url}
                                    alt={result.name}
                                    className="w-12 h-12 object-cover rounded mr-2"
                                    width={48}
                                    height={48}
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
    );
}