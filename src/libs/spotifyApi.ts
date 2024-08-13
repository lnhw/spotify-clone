

export const spotifyApi = async (
    endpoint: string,
    accessToken: string,
    options: RequestInit = {},
    params?: Record<string, string>
) => {
    const baseUrl = process.env.SPOTIFY_API!;
    let url = `${baseUrl}${endpoint}`;
    if (params && Object.keys(params).length > 0) {
        const searchParams = new URLSearchParams(params);
        url += `?${searchParams.toString()}`;
    }
    try {
        const res = await fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            }
        })
        if (!res.ok) {
            throw new Error(`Error: ${res.status} ${res.statusText}`);
        }
        return await res.json();
    } catch (error) {
        console.error(`Faild to fecth api ${error}`);
    }
}