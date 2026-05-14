import { GameDetailPageComponent } from "@/components/game-detail";
import { getGameDetails } from "@/lib/api";
import { Metadata } from "next";
import { headers } from "next/headers";

async function getOrigin(): Promise<string> {
  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  return `${protocol}://${host}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const [{ slug }, origin] = await Promise.all([params, getOrigin()]);
  const gameData = await getGameDetails(slug, origin);
  return {
    title: gameData ? `${gameData.name} - Game Hub` : "Game Hub",
    description: gameData
      ? `Details, screenshots, and more for ${gameData.name}`
      : "Your personal game collection",
  };
}

export default async function GameDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [{ slug }, origin] = await Promise.all([params, getOrigin()]);
  const gameData = await getGameDetails(slug, origin);

  return <GameDetailPageComponent gameData={gameData} />;
}
