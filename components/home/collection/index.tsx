"use client";
import { GameCard } from "@/components/game-card";
import { useGameCollectionStore } from "@/lib/state";
import { useHydration } from "@/hooks/use-hydration";
import { EmptyCollectionComponent } from "./empty";
import classes from "./index.module.css";
import { HydratingCollectionComponent } from "./hydrating";
import { SortGames } from "./filter";

export function GamesCollection() {
  const collection = useGameCollectionStore((state) => state.collection);
  const collectionHasGames = collection.length > 0;
  const hydrated = useHydration();

  return (
    <>
      {!hydrated && (
        <div className={classes.games_collection__root}>
          <div className={classes.games_collection__cards_container}>
            <HydratingCollectionComponent />
          </div>
        </div>
      )}
      {hydrated && collectionHasGames ? (
        <div className={classes.games_collection__root}>
          <SortGames />
          <div className={classes.games_collection__cards_container}>
            {collection.map((game, index) => (
              <>
                <GameCard
                  index={index}
                  key={game.id}
                  gameDetailUrl={`/game/${game.slug}`}
                  imageUrl={game.cover ? `https:${game.cover.url}` : undefined}
                  gameName={game.name}
                  priority={index < 6}
                />
              </>
            ))}
          </div>
        </div>
      ) : (
        hydrated && <EmptyCollectionComponent />
      )}
    </>
  );
}
