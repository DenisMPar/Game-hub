import { GameDetailPageComponent } from "@/components/game-detail";
import { getGameDetails } from "@/lib/api";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const gameData = await getGameDetails(params.slug);
  return {
    title: gameData ? `${gameData.name} - Game Haven Z` : "Game Haven Z - Game",
    description: gameData
      ? `Details, screenshots, and more for ${gameData.name}`
      : "Search and collect your favourite games",
  };
}

export default async function GameDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const gameData = await getGameDetails(params.slug);

  return <GameDetailPageComponent gameData={gameData} />;
}
