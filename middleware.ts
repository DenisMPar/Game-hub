import { AccessDataType, getAccessData, setAccessData } from "@/lib/igdb-token";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const origin = request.headers.get("origin");
  const allowedOrigin =
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  if (origin && origin !== allowedOrigin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let accessData = getAccessData();
  const isExpired =
    accessData &&
    Date.now() > accessData.timestamp + accessData.expires_in * 1000;
  if (!accessData || isExpired) {
    const newAccessData = await fetchNewAccessToken();
    if (newAccessData) {
      setAccessData(newAccessData);
      accessData = newAccessData;
    } else {
      return NextResponse.error();
    }
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("Authorization", `Bearer ${accessData.access_token}`);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

async function fetchNewAccessToken(): Promise<AccessDataType | null> {
  const res = await fetch("https://id.twitch.tv/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.API_CLIENT_ID || "",
      client_secret: process.env.API_CLIENT_SECRET || "",
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
export const config = {
  matcher: ["/api/game", "/api/game/:slug*"],
};
