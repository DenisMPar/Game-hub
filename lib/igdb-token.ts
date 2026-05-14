export interface AccessDataType {
  access_token: string;
  expires_in: number;
  token_type: string;
  timestamp: number;
}
let accessData: AccessDataType | null = null;
let pendingRefresh: Promise<AccessDataType | null> | null = null;

export function getAccessData() {
  return accessData;
}

export function setAccessData(token: AccessDataType) {
  accessData = token;
}

export function refreshAccessData(
  fetcher: () => Promise<AccessDataType | null>
): Promise<AccessDataType | null> {
  if (!pendingRefresh) {
    pendingRefresh = fetcher().then((result) => {
      if (result) {
        accessData = result;
      }
      pendingRefresh = null;
      return result;
    });
  }
  return pendingRefresh;
}

export async function fetchNewAccessToken(): Promise<AccessDataType | null> {
  const clientId = process.env.API_CLIENT_ID;
  const clientSecret = process.env.API_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    console.error("Missing required environment variables: API_CLIENT_ID and/or API_CLIENT_SECRET");
    return null;
  }

  const res = await fetch("https://id.twitch.tv/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "client_credentials",
    }),
  });

  if (res.ok) {
    const data = await res.json();
    return {
      access_token: data.access_token,
      expires_in: data.expires_in,
      token_type: data.token_type,
      timestamp: Date.now(),
    };
  }

  console.error("Error al obtener un nuevo token de acceso:", res.statusText);
  return null;
}

