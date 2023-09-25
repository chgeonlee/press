import { Link } from "react-router-dom";
import Text, { TextSizeEnum, TextWeightEnum } from "./Text";
import { useLayoutEffect, useRef } from "react";
import press from "@/lib";

export interface IItemCardProps {
  title?: string;
  item: {
    id: string;
    imgset: string[];
    title: string;
    rating: number;
    description: string;
    price: number;
    pricePerUnit: string;
  };
}

const ItemCard = ({ title, item }: IItemCardProps) => {
  const ref = useRef<HTMLImageElement>();

  useLayoutEffect(() => {
    const resize = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        ref.current.style.height = rect.width * 1.13 + "px";
      }
    };
    window.addEventListener("resize", resize);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <Link to={`/room/${item.id}`}>
      <div className="itemcard">
        <div className="pics">
          <img
            ref={ref}
            src={
              item.imgset[0]
                ? item.imgset[0]
                : "https://i.pinimg.com/564x/dd/67/fe/dd67feaef7120dc8b7c6a1925bae69e0.jpg"
            }
          />
        </div>
        <div className="title">
          <Text weight={TextWeightEnum.BOLD}>{item.title}</Text>
          <Text>{item.rating}</Text>
        </div>
        <div className="description">
          <Text size={TextSizeEnum.SM}>{item.description}</Text>
        </div>
        <div className="price">
          <Text weight={TextWeightEnum.BOLD}>
            {press.util.convertToKRW(item.price)}
          </Text>
        </div>
      </div>
    </Link>
  );
};

export default ItemCard;
