import { authOptions } from "@/services/auths/authService";
import { fetchSpotify } from "@/utils/spotify/fecthSpotify";
import { getServerSession } from "next-auth";

export const getUserProfile = async () => {
    const session = await getServerSession(authOptions);
    if (!session || !session.accessToken) {
        throw new Error('Not authenticated');
    }
    try {
        const res = await fetchSpotify("me", session.accessToken);
        return res;
    } catch (error) {
        console.error("failed to fetch get user profile", error)
    }
}