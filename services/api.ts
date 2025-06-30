export const TMBD_CONFIG = {
  apiKey: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  baseUrl: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

export const fetchMovies = async ({ query }: { query: string }) => {
  const endPoint = query
    ? `/search/movie?query=${encodeURIComponent(query)}`
    : "/discover/movie?sort_by=popularity.desc";

  const res = await fetch(
    `${TMBD_CONFIG.baseUrl}${endPoint}&api_key=${TMBD_CONFIG.apiKey}`,
    {
      method: "GET",
      headers: TMBD_CONFIG.headers,
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }

  const data = await res.json();
  return data.results;
};
