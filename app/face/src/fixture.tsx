import { FaAccusoft, FaAllergies, FaTractor } from "react-icons/fa";
const Chance = require("chance");
const chance = new Chance();

const imageset = [
  "https://a0.muscache.com/im/pictures/miso/Hosting-668146487515150072/original/8ff2a532-e0cd-41a2-9164-554c4d9eb28a.jpeg?im_w=720",
  "https://i.pinimg.com/474x/f1/dd/5d/f1dd5d2da850629447ff891f711b00c2.jpg",
  "https://i.pinimg.com/474x/c7/fd/0e/c7fd0e47a7f00afe72ba96abc14e0bcd.jpg",
  "https://i.pinimg.com/474x/9d/40/a2/9d40a23a44885f3141ad16563364c33b.jpg",
  "https://i.pinimg.com/474x/e2/6e/79/e26e7921b2be1cf08aecc05655e10777.jpg",
  "https://i.pinimg.com/474x/d1/26/7c/d1267c6ad618e783a209a39048803f0e.jpg",
  "https://i.pinimg.com/474x/9c/d7/2f/9cd72f7dd326c6ed79cc9b43b4f51625.jpg",
  "https://a0.muscache.com/im/pictures/miso/Hosting-41176878/original/1733b12a-8abb-4bdf-b1ff-e3168aa07c61.jpeg?im_w=720",
  "https://i.pinimg.com/474x/f8/1d/e3/f81de3e810e6315c7e9db9193c2647ea.jpg",
  "https://i.pinimg.com/474x/cb/19/3f/cb193ff0719a7c67e3d6b4835eea8bd0.jpg",
  "https://i.pinimg.com/474x/5a/b8/48/5ab848227be9d6055b2c72195ea8bf4e.jpg",
  "https://a0.muscache.com/im/pictures/d630f754-1ce7-44f2-aadc-0b05dc929fd2.jpg?im_w=720",
  "https://i.pinimg.com/474x/6d/fd/71/6dfd71b25b09fe66431ef5e54d25721d.jpg",
  "https://i.pinimg.com/474x/54/0c/94/540c94b3df06d3b1f82a61ad8accb9b9.jpg",
  "https://i.pinimg.com/474x/58/60/53/58605344c949a1a4d8cb66849bd130c3.jpg",
  "https://i.pinimg.com/474x/5e/74/03/5e7403a61f3886d1cbd35435db39d022.jpg",
  "https://i.pinimg.com/474x/17/59/d1/1759d1186a5713b946657de0af7988b1.jpg",
  "https://a0.muscache.com/im/pictures/miso/Hosting-814937613380365669/original/7ee4b2be-ec19-4f57-bf2d-fe459b3b79cb.jpeg?im_w=720",
];

function normalRandom(mean, variance) {
  let sum = 0;
  for (let i = 0; i < 24; i++) {
    sum += Math.random();
  }
  return Math.abs(mean + Math.sqrt(variance) * (sum - 6));
}

const generateMockData = (num, pre, cat) => {
  const mockData = [];

  for (let i = pre; i < num + pre; i++) {
    mockData.push({
      id: String(i + 1),
      title: `${chance.city()}, ${chance.country({ full: true })}`,
      rating: Math.round(Math.random() * 50) / 10,
      description: `${chance.city()}의 ${chance.animal()}과 함께할 수 있는 숙소`,
      price: Math.round(normalRandom(1000, 40000000)),
      pricePerUnit: "M",
      imgset: chance.shuffle(imageset).slice(0, 7),
      categories: [cat],
    });
  }

  return mockData;
};

const size = 100;

export const PracRoomsData = generateMockData(size, 0, "practice");
export const PartyRoomsData = generateMockData(size, size, "party");
export const CreatorRoomsData = generateMockData(size, size * 2, "creator");

const SIZE = 18;
export const CATEGORIES = {
  data: [
    {
      id: "practice",
      icon: <FaTractor size={SIZE} />,
      name: "연습실",
    },
    {
      id: "party",
      icon: <FaAccusoft size={SIZE} />,
      name: "파티룸",
    },
    {
      id: "creator",
      icon: <FaAllergies size={SIZE} />,
      name: "크리에이터",
    },
    {
      id: "practice",
      icon: <FaTractor size={SIZE} />,
      name: "연습실",
    },
    {
      id: "party",
      icon: <FaAccusoft size={SIZE} />,
      name: "파티룸",
    },
    {
      id: "creator",
      icon: <FaAllergies size={SIZE} />,
      name: "크리에이터",
    },
    {
      id: "practice",
      icon: <FaTractor size={SIZE} />,
      name: "연습실",
    },
    {
      id: "party",
      icon: <FaAccusoft size={SIZE} />,
      name: "파티룸",
    },
    {
      id: "creator",
      icon: <FaAllergies size={SIZE} />,
      name: "크리에이터",
    },
    {
      id: "practice",
      icon: <FaTractor size={SIZE} />,
      name: "연습실",
    },
    {
      id: "party",
      icon: <FaAccusoft size={SIZE} />,
      name: "파티룸",
    },
    {
      id: "creator",
      icon: <FaAllergies size={SIZE} />,
      name: "크리에이터",
    },
    {
      id: "practice",
      icon: <FaTractor size={SIZE} />,
      name: "연습실",
    },
    {
      id: "party",
      icon: <FaAccusoft size={SIZE} />,
      name: "파티룸",
    },
    {
      id: "creator",
      icon: <FaAllergies size={SIZE} />,
      name: "크리에이터",
    },
  ],
};
