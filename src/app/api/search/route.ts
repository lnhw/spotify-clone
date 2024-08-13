import { spotifyApi } from "@/libs/spotifyApi";
import { authOptions } from "@/services/auths/authService";
import { fetchSpotify } from "@/utils/spotify/fecthSpotify";
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth";

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session || !session.accessToken) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query');
    try {
        const results = await fetchSpotify('search', session.accessToken, {
            params: {
                q: query || '',
                type: 'track',
            },
        });

        return NextResponse.json(results.tracks.items, { status: 200 });
    } catch (error) {
        console.error("Error fetching search results", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}