"use client";
import { CarouselComponent } from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks";
import Image from "next/image";
import classes from "./index.module.css";
import { Title2 } from "@/components/ui/typography";
interface Props {
  screenshots?: {
    id: number;
    url: string;
  }[];
}
export function GameDetailMedia({ screenshots }: Props) {
  const isMobile = useIsMobile();
  const carouselThreshold = isMobile ? 4 : 5;
  return (
    <div className={classes.game_detail_media__root}>
      <Title2>Media</Title2>
      {screenshots && screenshots.length > carouselThreshold ? (
        <CarouselComponent>
          {screenshots.map((screenshot) => (
            <div
              key={screenshot.id}
              className={classes.game_detail_media__container}
            >
              <Image
                className={classes.game_detail_media__image}
                fill
                src={`https:${screenshot.url.replace("t_thumb", "t_screenshot_big")}`}
                alt="game screenshot"
                sizes="(max-width: 768px) 80px, 132px"
                quality={90}
              />
            </div>
          ))}
        </CarouselComponent>
      ) : screenshots ? (
        <div className={classes.game_detail_media__list}>
          {screenshots.map((screenshot) => (
            <div
              key={screenshot.id}
              className={classes.game_detail_media__container}
            >
              <Image
                className={classes.game_detail_media__image}
                fill
                src={`https:${screenshot.url.replace("t_thumb", "t_screenshot_big")}`}
                alt="game screenshot"
                sizes="(max-width: 768px) 80px, 132px"
                quality={90}
              />
            </div>
          ))}
        </div>
      ) : null}
      {!screenshots && <Title2>No Media Found</Title2>}
    </div>
  );
}
