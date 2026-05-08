import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GameSaved {
  id: number;
  name: string;
  cover?: {
    id: number;
    url: string;
  };
  slug: string;
  releaseDate: number;
  savedAt: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
export interface GameCollectionStore {
  collection: GameSaved[];
  addGame: (game: GameSaved) => void;
  sortByLastAdded: () => void;
  sortByReleaseDate: (order: "asc" | "desc") => void;
}

export const useGameCollectionStore = create<GameCollectionStore>()(
  persist(
    (set) => ({
      collection: [],
      addGame: (game: GameSaved) =>
        set((state) => ({ collection: [game, ...state.collection] })),
      sortByLastAdded: () =>
        set((state) => {
          const orderedCollection = orderByProp({
            prop: "savedAt",
            order: "desc",
            collection: state.collection,
          });
          return { collection: [...orderedCollection] };
        }),
      sortByReleaseDate: (order: "asc" | "desc") =>
        set((state) => {
          const orderedCollection = orderByProp({
            prop: "releaseDate",
            order,
            collection: state.collection,
          });
          return { collection: [...orderedCollection] };
        }),
    }),
    {
      name: "gameCollection",
      skipHydration: true,
    }
  )
);

function orderByProp({
  prop,
  order,
  collection,
}: {
  prop: string;
  order: "asc" | "desc";
  collection: GameSaved[];
}) {
  return collection.sort((a, b) => {
    if (a[prop] < b[prop]) {
      return order === "asc" ? -1 : 1;
    }
    if (a[prop] > b[prop]) {
      return order === "asc" ? 1 : -1;
    }
    return 0;
  });
}
