"use client";
import { useRandomVisibility } from "@/hooks";
import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import classes from "./index.module.css";

const KeyCapsCanvas = dynamic(
  () => import("./canvas").then((mod) => mod.KeyCapsCanvas),
  { ssr: false }
);

export function Keycaps() {
  const [canvasReady, setCanvasReady] = useState(false);
  const onReady = useCallback(() => setCanvasReady(true), []);
  const hintVisible = useRandomVisibility(canvasReady, 3000);

  return (
    <div className={`${classes.keycaps__container} `}>
      <KeyCapsCanvas onReady={onReady} />
      <p className={`${classes.keycaps__hint} ${hintVisible ? classes.keycaps__hint_visible : ""}`}>
        Don&apos;t click the keys, they&apos;re ticklish!
      </p>
    </div>
  );
}
