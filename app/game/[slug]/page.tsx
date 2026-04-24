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
    title: gameData ? `${gameData.name} - Game Hub` : "Game Hub",
    description: gameData
      ? `Details, screenshots, and more for ${gameData.name}`
      : "Your personal game collection",
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
