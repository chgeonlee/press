import { FaAccusoft, FaAddressBook, FaAllergies, FaBattleNet, FaBity, FaChess, FaCloudversify, FaFirstAid, FaHeartBroken, FaTractor } from "react-icons/fa";
import IconLabel from "../components/IconLabel";
import Grid from "../components/Grid";
import useViewport, { ViewportEnum } from "../hooks/useViewport";
import { Collapse } from "../components/Collapse";
import ItemCard from "../components/ItemCard";
import { createUseStyles } from "react-jss";
import classNames from "classnames";

const useStyles = createUseStyles((theme: any) => ({
    container: {
        backgroundColor: theme.background + 'cc',
        color: theme.text,
    },
}));

export default function  Home() {
    const classes = useStyles();
    const viewport = useViewport();
    const ismobile = viewport === ViewportEnum.MOBILE;
    
    return <div className="home">
            {/* template */}
            <div className={classNames(classes.container,'tabs')}>
                <Collapse columns={ismobile? 4: 12} rows={1}>
                {
                    MockData.data.map( ( data, index ) => {
                        return <IconLabel key={index} iconElement={data.icon} name={data.name} />
                    })
                }
                </Collapse>
            </div>
            <div className="contents">
                <Grid columns={ismobile? 1: 4}>
                    {
                        PlaceMockData.data.map( (data, index) => {
                            return <ItemCard key={index} item={data} />
                        })
                    }
                </Grid>
            </div>
        </div>;
}

const SIZE = 18;

const PlaceMockData = {
    data: [
        {
            id: '',
            title: '서울 강남구 역세권',
            rating: 4.5,
            description: '마이워크스페이스4호점',
            price: 3000,
            pricePerUnit: 'M',
            imgset: ['https://a0.muscache.com/im/pictures/miso/Hosting-668146487515150072/original/8ff2a532-e0cd-41a2-9164-554c4d9eb28a.jpeg?im_w=720']
        },
        {
            id: '',
            title: '서울 강남구 역세권',
            rating: 4.5,
            description: '마이워크스페이스4호점',
            price: 3000,
            pricePerUnit: 'M',
            imgset: ['https://a0.muscache.com/im/pictures/miso/Hosting-41176878/original/1733b12a-8abb-4bdf-b1ff-e3168aa07c61.jpeg?im_w=720']
        },
        {
            id: '',
            title: '서울 강남구 역세권',
            rating: 4.5,
            description: '마이워크스페이스4호점',
            price: 3000,
            pricePerUnit: 'M',
            imgset: ['https://a0.muscache.com/im/pictures/airflow/Hosting-714258423682866070/original/960755ad-ce79-4606-8f17-7c2d6c64fe41.jpg?im_w=720']
        },
        {
            id: '',
            title: '서울 강남구 역세권',
            rating: 4.5,
            description: '마이워크스페이스4호점',
            price: 3000,
            pricePerUnit: 'M',
            imgset: ['https://a0.muscache.com/im/pictures/miso/Hosting-814937613380365669/original/7ee4b2be-ec19-4f57-bf2d-fe459b3b79cb.jpeg?im_w=720']
        },
        {
            id: '',
            title: '서울 강남구 역세권',
            rating: 4.5,
            description: '마이워크스페이스4호점',
            price: 3000,
            pricePerUnit: 'M',
            imgset: []
        },
        {
            id: '',
            title: '서울 강남구 역세권',
            rating: 4.5,
            description: '마이워크스페이스4호점',
            price: 3000,
            pricePerUnit: 'M',
            imgset: []
        },
        {
            id: '',
            title: '서울 강남구 역세권',
            rating: 4.5,
            description: '마이워크스페이스4호점',
            price: 3000,
            pricePerUnit: 'M',
            imgset: []
        },
        {
            id: '',
            title: '서울 강남구 역세권',
            rating: 4.5,
            description: '마이워크스페이스4호점',
            price: 3000,
            pricePerUnit: 'M',
            imgset: []
        },
        {
            id: '',
            title: '서울 강남구 역세권',
            rating: 4.5,
            description: '마이워크스페이스4호점',
            price: 3000,
            pricePerUnit: 'M',
            imgset: []
        },
        {
            id: '',
            title: '서울 강남구 역세권',
            rating: 4.5,
            description: '마이워크스페이스4호점',
            price: 3000,
            pricePerUnit: 'M',
            imgset: []
        },
        {
            id: '',
            title: '서울 강남구 역세권',
            rating: 4.5,
            description: '마이워크스페이스4호점',
            price: 3000,
            pricePerUnit: 'M',
            imgset: []
        },
        {
            id: '',
            title: '서울 강남구 역세권',
            rating: 4.5,
            description: '마이워크스페이스4호점',
            price: 3000,
            pricePerUnit: 'M',
            imgset: []
        },
      
    ]
}

const MockData = {
    data : [
        {
            icon: <FaTractor size={SIZE}/>,
            name: '연습실'
        },
        {
            icon: <FaAccusoft size={SIZE}/>,
            name: '파티룸'
        },
        {
            icon: <FaAllergies size={SIZE}/>,
            name: '크리에이터'
        },
        {
            icon: <FaBity size={SIZE}/>,
            name: '사원'
        },
        {
            icon: <FaCloudversify size={SIZE}/>,
            name: '회의실'
        },
        {
            icon: <FaFirstAid size={SIZE}/>,
            name: '연습실'
        },
        {
            icon: <FaAddressBook size={SIZE}/>,
            name: '회의실'
        },
        {
            icon: <FaBattleNet size={SIZE}/>,
            name: '연습실'
        },
        {
            icon: <FaChess size={SIZE}/>,
            name: '회의실'
        },
        {
            icon: <FaHeartBroken size={SIZE}/>,
            name: '연습실'
        },
        {
            icon: <FaTractor size={SIZE}/>,
            name: '연습실'
        },
        {
            icon: <FaAccusoft size={SIZE}/>,
            name: '파티룸'
        },
        {
            icon: <FaAllergies size={SIZE}/>,
            name: '크리에이터'
        },
        {
            icon: <FaBity size={SIZE}/>,
            name: '사원'
        },
        {
            icon: <FaCloudversify size={SIZE}/>,
            name: '회의실'
        },
        {
            icon: <FaFirstAid size={SIZE}/>,
            name: '연습실'
        },
        {
            icon: <FaAddressBook size={SIZE}/>,
            name: '회의실'
        },
        {
            icon: <FaBattleNet size={SIZE}/>,
            name: '연습실'
        },
        {
            icon: <FaChess size={SIZE}/>,
            name: '회의실'
        },
        {
            icon: <FaHeartBroken size={SIZE}/>,
            name: '연습실'
        }
    ]
}