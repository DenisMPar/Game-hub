import { getAccessData, refreshAccessData, fetchNewAccessToken } from "@/lib/igdb-token";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const secFetchSite = request.headers.get("sec-fetch-site");

  if (secFetchSite === "cross-site") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  if (!secFetchSite) {
    const origin = request.headers.get("origin");
    const referer = request.headers.get("referer");
    const allowedOrigin = request.nextUrl.origin;

    const isCrossOrigin = origin && origin !== allowedOrigin;
    const hasSuspiciousReferer = referer && !referer.startsWith(allowedOrigin);

    if (isCrossOrigin || hasSuspiciousReferer) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  let accessData = getAccessData();
  const EXPIRY_BUFFER_MS = 5 * 60 * 1000;
  const isExpired =
    accessData &&
    Date.now() > accessData.timestamp + accessData.expires_in * 1000 - EXPIRY_BUFFER_MS;
  if (!accessData || isExpired) {
    const newAccessData = await refreshAccessData(fetchNewAccessToken);
    if (newAccessData) {
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


export const config = {
  matcher: ["/api/game", "/api/game/:slug*"],
};
