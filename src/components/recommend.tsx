"use client";
import { fetchSpotify } from "@/utils/spotify/fecthSpotify";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Recommended() {
    const { data: session, status } = useSession();
    const [accessToken, setAccessToken] = useState<string | undefined>();
    const [loading, setLoading] = useState<boolean>(false);
    const [artists, seArtists] = useState<string[]>([]);
    // const [genres, setGenres] = useState<string[]>([]);
    const [tracks, setTracks] = useState<string[]>([]);
    const [recommended, setRecommended] = useState<any[]>([])
    // console.log(tracks);
    useEffect(() => {
        if (session?.accessToken) {
            setAccessToken(session.accessToken);
        }
    }, [session]);

    useEffect(() => {
        const getTopArtist = async () => {
            try {
                if (!accessToken) return;
                const response = await fetchSpotify("me/top/artists?limit=10", accessToken);
                // console.log(response.items);
                if (response && response.items) {
                    const seeds_artist = response.items.slice(0, 10);
                    const artistIds = seeds_artist.map((artist: any) => artist.id); // Lấy id của từng artist
                    seArtists(artistIds);
                }
            } catch (error) {
                console.error(`Failed to get top artist error : ${error}`);
            }
        }
        // const getAvailableGenres = async () => {
        //     try {
        //         if (!accessToken) return;
        //         const response = await fetchSpotify("recommendations/available-genre-seeds", accessToken)
        //         if(response.items){
        //             const seed_genres = response.item
        //         }

        //     } catch (error) {

        //     }
        // }
        const getTopTracks = async () => {
            try {
                if (!accessToken) return;
                const response = await fetchSpotify("me/top/tracks?limit=10", accessToken)
                // console.log(response.items);
                if (response.items) {
                    const trackId = response.items.map((track: any) => track.id)
                    setTracks(trackId);
                }
            } catch (error) {
                console.error(`Failed to get top tracks error: ${error}`);
            }
        }
        const getRecommended = async () => {
            try {
                if (!accessToken) return;
                await Promise.all([
                    getTopArtist(),
                    getTopTracks()
                ]);
                const res = await fetchSpotify(`recommendations?limit=20&market=US&seed_artists=${artists.join(",")}&seed_genres=country&seed_tracks=${tracks.join(",")}`, accessToken)
                setRecommended(res.tracks)
            } catch (error) {
                console.error(`Failed to get recommendations error: ${error}`);
            }
        }
        getRecommended();
    }, [accessToken]);

    return (
        <div>
            <div>
                <h1 className="text-white">Gợi ý cho bạn</h1>
                <div className=""></div>
                <div className="">
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
                        {recommended.map((track: any) => (
                            <div key={track.id} className="">
                                <div className="relative w-32 h-32 rounded">
                                    <Image
                                        className="w-full h-full object-cover"
                                        src={track.album.images[0].url}
                                        alt={track.album.name}
                                        priority
                                        fill
                                        quality={100}
                                    />
                                </div>
                                <div className="text-white">{track.album.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}