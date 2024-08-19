
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
interface SpotifyRequestOptions extends Omit<RequestInit, 'method' | 'body'> {
  method?: HttpMethod;
  body?: any;
  params?: Record<string, string>;
}

export async function fetchSpotify<T = any>(
  endpoint: string,
  accessToken: string,
  options: SpotifyRequestOptions = {}
): Promise<T> {
  const {
    method = 'GET',
    body,
    params,
    headers: customHeader = {},
    ...otherOptions
  } = options;
  const base_url = process.env.SPOTIFY_API || 'https://api.spotify.com/v1/';
  let url = `${base_url}${endpoint}`;
  if (params) {
    const searchParams = new URLSearchParams(params);
    url += `?${searchParams.toString()}`;
  }
  const headers = new Headers(customHeader);
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', `Bearer ${accessToken}`);
  const fetchOptions: RequestInit = {
    method,
    headers,
    ...otherOptions,
  };
  // add body for nen-GET requests
  if (body && method != 'GET') {
    fetchOptions.body = JSON.stringify(body);
  }
  const response = await fetch(url, fetchOptions);
  // console.log("response", response);
  if (!response.ok) {
    throw new Error(`Error ${response.status} ${response.statusText}`);
  }
  //Parse JSON only if the content type is application/json.
  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.includes('application/json')) {
    return response.json() as Promise<T>;
  } else {
    return response.text() as unknown as Promise<T>;
  }
}
