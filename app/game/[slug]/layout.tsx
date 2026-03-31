import { SearchGames } from "@/components/search-games";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import classes from "./layout.module.css";
import { Keycaps } from "@/components/keycaps";
export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Keycaps />
      <header className={classes.layout__header}>
        <Link href={"/home"} className={classes.layout__back_wrapper}>
          <ArrowLeft />
          <h2 className={classes.layout__title}>Back</h2>
        </Link>
        <SearchGames />
      </header>
      {children}
    </>
  );
}
