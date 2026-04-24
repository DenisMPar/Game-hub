import { Logo } from "@/components/ui/logo";
import { Title1 } from "@/components/ui/typography";
import classes from "./layout.module.css";
import { SearchGames } from "@/components/search-games";
import { Keycaps } from "@/components/keycaps";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Game Hub",
  description: "Your personal game collection",
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Keycaps />
      <header className={classes.layout__header}>
        <div className={classes.layout__title_logo_wrapper}>
          <Logo />
          <Title1>Game Hub</Title1>
        </div>
        <SearchGames />
      </header>
      {children}
    </>
  );
}
