"use client";
import { CarouselComponent } from "@/components/ui/carousel";
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
  return (
    <div className={classes.game_detail_media__root}>
      <Title2>Media</Title2>
      {screenshots && (
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
                sizes="(max-width: 768px) 20vw, 30vw"
              />
            </div>
          ))}
        </CarouselComponent>
      )}
      {!screenshots && <Title2>No Media Found</Title2>}
    </div>
  );
}
