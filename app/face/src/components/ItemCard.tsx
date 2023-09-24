import { Link } from "react-router-dom";
import Text, { TextSizeEnum } from "./Text";
import { useLayoutEffect, useRef } from "react";

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
                : "https://a0.muscache.com/im/pictures/miso/Hosting-13903824/original/82d996fb-d7c4-46a8-a713-febd281cd69f.jpeg?im_w=720"
            }
          />
        </div>
        <div className="title">
          <Text weight={600}>{item.title}</Text>
          <Text>{item.rating}</Text>
        </div>
        <div>
          <Text size={TextSizeEnum.SM}>{item.description}</Text>
        </div>
        <div></div>
      </div>
    </Link>
  );
};

export default ItemCard;
