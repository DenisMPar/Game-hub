import { useEffect, useState } from "react";
import { useGameCollectionStore } from "@/lib/state";

export function useHydration() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    useGameCollectionStore.persist.rehydrate();
    setHydrated(true);
  }, []);

  return hydrated;
}
