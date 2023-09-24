import { ReactNode } from "react";
import { Link } from "react-router-dom";
import Text, { TextSizeEnum } from "./Text";

export interface IItemCardProps {
    title?: string;
    item: { id: string, imgset: string[], title: string, rating: number, description: string, price: number, pricePerUnit: string }
}

const ItemCard = ( { title, item }: IItemCardProps ) => {
    return <div className="itemcard">
        {/* <Link to={`/${item.id}`}> */}
            <div className="pics">
                <img style={{width:'100%'}} src={ item.imgset[0] ? item.imgset[0] : 'https://a0.muscache.com/im/pictures/miso/Hosting-13903824/original/82d996fb-d7c4-46a8-a713-febd281cd69f.jpeg?im_w=720'} />
            </div>
            <div className="title">
                <Text weight={600}>{item.title}</Text>
                <Text>{item.rating}</Text>
            </div>
            <div>
                <Text size={TextSizeEnum.SM}>{item.description}</Text>
            </div>
            <div>

            </div>
        {/* </Link> */}
    </div>
}

export default ItemCard;