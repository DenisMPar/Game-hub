import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const authHeader = req.headers.get("authorization");
  const slug = (await params).slug;

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return Response.json({ error: "Invalid slug" }, { status: 400 });
  }

  const config = {
    method: "POST",
    headers: {
      "Client-ID": process.env.API_CLIENT_ID || "",
      Authorization: authHeader || "",
      "Content-Type": "text/plain",
    },
    body: `fields name,slug,cover.url,first_release_date,involved_companies.company.name,platforms.name,rating,screenshots.url,summary,genres.name,similar_games.cover.url,similar_games.slug,similar_games.name; where slug = "${slug}";`,
  };
  const res = await fetch("https://api.igdb.com/v4/games", config);
  const data = await res.json();

  return Response.json({ data });
}
