const development = process.env.NODE_ENV === "development";

function resolveBaseUrl(serverOrigin?: string): string {
  if (!development) return process.env.NEXT_PUBLIC_BASE_API_URL || "";
  if (typeof window === "undefined") return `${serverOrigin}/api`;
  return "/api";
}

export async function fetchApiGet(path: RequestInfo, serverOrigin?: string) {
  const BASE_API_URL = resolveBaseUrl(serverOrigin);
  if (!BASE_API_URL) {
    throw new Error("Missing BASE_API_URL");
  }
  const url = BASE_API_URL + path;

  const res = await fetch(url, {
    method: "GET",
  });
  const status = res.status;
  const resJson = await res.json();
  if (status >= 400) throw new Error(resJson?.message || "Request failed");
  if (status >= 200 && status < 300) return resJson;
}

export interface GameDetail {
  id: number;
  name: string;
  rating?: number;
  first_release_date: number;
  slug: string;
  cover?: {
    id: number;
    url: string;
  };
  genres: {
    id: number;
    name: string;
  }[];
  involved_companies?: {
    id: number;
    company: {
      id: number;
      name: string;
    };
  }[];
  platforms: {
    id: number;
    name: string;
  }[];
  screenshots: {
    id: number;
    url: string;
  }[];
  similar_games?: {
    id: number;
    slug: string;
    name: string;
    cover: {
      id: number;
      url: string;
    };
  }[];
  summary: string;
}

export async function getGameDetails(slug: string, serverOrigin?: string): Promise<GameDetail | null> {
  try {
    const res = await fetchApiGet(`/game/${slug}`, serverOrigin);
    return res?.data?.[0] ?? null;
  } catch (error) {
    console.error("Error fetching game details:", error);
    return null;
  }
}
