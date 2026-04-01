import { GameCard } from "@/components/game-card";
import classes from "./index.module.css";
import { Title3 } from "@/components/ui/typography";
interface Props {
  similarGames?: {
    id: number;
    slug: string;
    name: string;
    cover?: {
      id: number;
      url: string;
    };
  }[];
}
export function SimilarGames({ similarGames }: Props) {
  return (
    <div className={classes.game_detail_similar__root}>
      <h2 className={classes.game_detail_similar__title}>Similar Games</h2>
      <div className={classes.game_detail_similar__cards_container}>
        {similarGames &&
          similarGames.slice(0, 6).map((game, index) => (
            <GameCard
              index={index}
              key={game.id}
              gameDetailUrl={`/game/${game.slug}`}
              imageUrl={game.cover ? `https:${game.cover.url}` : undefined}
              gameName={game.name}
              priority={false}
            />
          ))}
        {!similarGames && <Title3>No Similar Games Found</Title3>}
      </div>
    </div>
  );
}
