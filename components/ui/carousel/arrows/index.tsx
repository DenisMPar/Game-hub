import { ChevronLeft, ChevronRight } from "lucide-react";
import { CustomArrowProps } from "react-slick";

export function RightArrow(props: CustomArrowProps) {
  const { onClick } = props;
  return (
    <button
      aria-label="Next slide"
      style={{
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        right: -10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#F2F2F2D9",
        backdropFilter: "blur(10px)",
        border: "none",
        borderRadius: "50%",
        color: "black",
        cursor: "pointer",
        height: 40,
        width: 40,
        padding: 0,
      }}
      onClick={onClick}
    >
      <ChevronRight />
    </button>
  );
}
export function LeftArrow(props: CustomArrowProps) {
  const { onClick } = props;
  return (
    <button
      aria-label="Previous slide"
      style={{
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        left: -10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#F2F2F2D9",
        backdropFilter: "blur(10px)",
        border: "none",
        borderRadius: "50%",
        color: "black",
        cursor: "pointer",
        height: 40,
        width: 40,
        padding: 0,
        zIndex: 1,
      }}
      onClick={onClick}
    >
      <ChevronLeft />
    </button>
  );
}
