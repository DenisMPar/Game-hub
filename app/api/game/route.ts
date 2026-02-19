import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const queryParam = searchParams.get("query");

  if (!queryParam) {
    return Response.json({ error: "Missing query parameter" }, { status: 400 });
  }

  const sanitized = queryParam.replace(/[^a-zA-Z0-9\s\-':]/g, "");
  const authHeader = req.headers.get("authorization");
  const config = {
    method: "POST",
    headers: {
      "Client-ID": process.env.API_CLIENT_ID || "",
      Authorization: authHeader || "",
      "Content-Type": "text/plain",
    },
    body: `fields name,cover.url,slug; search "${sanitized}"; limit 10;`,
  };
  const res = await fetch("https://api.igdb.com/v4/games", config);
  const data = await res.json();

  return Response.json(data);
}
