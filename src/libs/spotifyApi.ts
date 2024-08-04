// const SPOTIFY_BASE_URL = "  ";

// type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

// const spotifyApi = {
//     async apiCall<T>(endpoint: string, method: HttpMethod = "GET", body?: any, accessToken?: string): Promise<T> {
//         const url = `${SPOTIFY_BASE_URL}${endpoint}`;
//         const headers: HeadersInit = {
//             "Content-Type": "application/json",
//         };
//         if (accessToken) {
//             headers["Authorization"] = `Bearer ${accessToken}`;
//         }
//         const options: RequestInit = {
//             method,
//             headers
//         }
//         if (body) {
//             options.body = JSON.stringify(body);
//         }
//         try {
//             const response = await fetch(url, options);
//             if (!response.ok) {
//                 throw new Error(`HTTP error ! status: ${response.status}  URL: ${url}`);
//             }
//             return await response.json();
//         } catch (error) {
//             console.log("Spotify Api call error: ", error);
//             throw error;
//         }
//     },
//     //cac method helper co the duoc them voa day neu can
//     // get<T>(endpoint: string, accessToken?: string): Promise<T> {
//     //     return this.apiCall<T>(endpoint, "GET", undefined, accessToken);
//     // },
//     // post<T>(endpoint: string, body: any, accessToken?: string): Promise<T> {
//     //     return this.apiCall<T>(endpoint, "POST", body, accessToken);
//     // },

//     // put<T>(endpoint: string, body: any, accessToken?: string): Promise<T> {
//     //     return this.apiCall<T>(endpoint, 'PUT', body, accessToken);
//     // },

//     // delete<T>(endpoint: string, accessToken?: string): Promise<T> {
//     //     return this.apiCall<T>(endpoint, 'DELETE', undefined, accessToken);
//     // },
// }
// export default spotifyApi;

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