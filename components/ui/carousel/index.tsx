import React from "react";
import Slider from "react-slick";
import { LeftArrow, RightArrow } from "./arrows";

export function CarouselComponent({ children }: { children: React.ReactNode }) {
  const count = React.Children.count(children);
  const settings = {
    dots: false,
    infinite: count > 5,
    slidesToShow: Math.min(count, 5),
    slidesToScroll: 1,
    nextArrow: <RightArrow />,
    prevArrow: <LeftArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: false,
          infinite: count > 4,
          slidesToShow: Math.min(count, 4),
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div>
      <Slider {...settings}>{children}</Slider>
    </div>
  );
}
