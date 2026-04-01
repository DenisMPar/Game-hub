"use client";
import dynamic from "next/dynamic";
import classes from "./index.module.css";

const KeyCapsCanvas = dynamic(
  () => import("./canvas").then((mod) => mod.KeyCapsCanvas),
  { ssr: false }
);

export function Keycaps() {
  return (
    <div className={`${classes.keycaps__container} `}>
      <KeyCapsCanvas />
    </div>
  );
}
