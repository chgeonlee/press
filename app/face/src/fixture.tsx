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

const places = imageset.map((imgSrc, index) => ({
  title: `장소 ${index + 1}`,
  overview: `장소 ${index + 1}의 오버뷰`,
  geolocation: {
    lat: 37.5 + Math.random() * 0.5, // 서울과 경기 사이의 위도
    lng: 126.8 + Math.random() * 0.4, // 서울과 경기 사이의 경도
  },
  imgSrc,
}));

export const SPOTS = [
  {
    title: "춘식이",
    overview: "춘식이의 오버뷰",
    geolocation: { lat: 37.5665, lng: 126.978 },
    imgSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlfYA2u8Kgm2-z4sQIyV9287fLPfUPJyJmVBasYr6cpg&s",
  },
  {
    title: "춘식이",
    overview: "춘식이의 오버뷰",
    geolocation: { lat: 37.5565, lng: 126.978 },
    imgSrc:
      "https://t1.kakaocdn.net/kakaocorp/kakaocorp/admin/news/79590191017a00001.jpg?type=thumb&opt=C800x400",
  },
  {
    title: "춘식이",
    overview: "춘식이의 오버뷰",
    geolocation: { lat: 37.5665, lng: 126.968 },
    imgSrc:
      "data:image/jpeg;base64,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",
  },
  {
    title: "춘식이",
    overview: "춘식이의 오버뷰",
    geolocation: { lat: 37.4665, lng: 126.878 },
    imgSrc:
      "data:image/jpeg;base64,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+I1hinbfwqnY1a5xo2PJXC77bc5M/DOzuFp1q1wzN/EaHTU2o7atVQ7+knIGP6flJesjU/p3x2h0urv0bXLx6HKNuPF3+3qdlNFe2DDtN8TzxJK0cIHVplbWrUifSaqnHw6dQx7OQOveWETpCo4SUkbOTaszG5YuAEzR6nZSx9sbjEyUtgamL+5wP2AAERNqledRu78lhGiSQiInEyIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgEO9pkymrqQZ0pEj1rNW5iI/azpGdins73QCNOes8/4j4LrtUqGnQIV2LIyepAGbIAGdhg8jPU34ZTIxuD3mVutenhVFJ1/UxcMB/hAIP3Es9Dq/pSd3ZW+bByh/qpX/wBv2d1Y8v4b4J4q9RWdxQZT6Xq1dZTIwxVV1b46bT1HhnDjb01ol/M0baiME7f75ms2BLmp51UE8wr6UPtjp9JOAmut7Qepio22d/2OEKSp7P58bERErjcREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQD//2Q==",
  },
  {
    title: "춘식이",
    overview: "춘식이의 오버뷰",
    geolocation: { lat: 37.5765, lng: 125.778 },
    imgSrc: "https://cdn.newspenguin.com/news/photo/202207/11846_35653_344.jpg",
  },
  {
    title: "춘식이",
    overview: "춘식이의 오버뷰",
    geolocation: { lat: 37.5965, lng: 126.978 },
    imgSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdtkYtpHFSRcgQ_0n2KkfaW3h5hoZ-htI10g&usqp=CAU",
  },
  {
    title: "서울의 숨겨진 보석",
    overview: "서울의 아름다운 경치를 감상할 수 있는 곳",
    geolocation: { lat: 37.5665, lng: 126.978 },
    imgSrc:
      "https://a0.muscache.com/im/pictures/miso/Hosting-668146487515150072/original/8ff2a532-e0cd-41a2-9164-554c4d9eb28a.jpeg?im_w=720",
  },
  {
    title: "경기의 푸른 정원",
    overview: "자연과 함께할 수 있는 평화로운 정원",
    geolocation: { lat: 37.4123, lng: 127.5183 },
    imgSrc:
      "https://i.pinimg.com/474x/f1/dd/5d/f1dd5d2da850629447ff891f711b00c2.jpg",
  },
  {
    title: "한강의 아침",
    overview: "한강에서 맞이하는 평화로운 아침",
    geolocation: { lat: 37.5283, lng: 126.9349 },
    imgSrc:
      "https://i.pinimg.com/474x/c7/fd/0e/c7fd0e47a7f00afe72ba96abc14e0bcd.jpg",
  },
  {
    title: "남산의 전망대",
    overview: "서울의 스카이라인을 한눈에 볼 수 있는 남산 타워",
    geolocation: { lat: 37.5512, lng: 126.9882 },
    imgSrc:
      "https://i.pinimg.com/474x/9d/40/a2/9d40a23a44885f3141ad16563364c33b.jpg",
  },
  {
    title: "북한산의 가을",
    overview: "가을 색으로 물든 북한산의 풍경",
    geolocation: { lat: 37.6584, lng: 126.9426 },
    imgSrc:
      "https://i.pinimg.com/474x/e2/6e/79/e26e7921b2be1cf08aecc05655e10777.jpg",
  },
  {
    title: "경기도의 숨은 호수",
    overview: "경기도에 위치한 아름다운 호수",
    geolocation: { lat: 37.4316, lng: 127.5101 },
    imgSrc:
      "https://i.pinimg.com/474x/d1/26/7c/d1267c6ad618e783a209a39048803f0e.jpg",
  },
  {
    title: "서울의 밤거리",
    overview: "밤이면 더욱 빛나는 서울의 거리",
    geolocation: { lat: 37.561, lng: 126.983 },
    imgSrc:
      "https://i.pinimg.com/474x/9c/d7/2f/9cd72f7dd326c6ed79cc9b43b4f51625.jpg",
  },
  {
    title: "경기도의 녹색길",
    overview: "자전거를 타기 좋은 경기도의 녹색길",
    geolocation: { lat: 37.3235, lng: 127.1228 },
    imgSrc:
      "https://a0.muscache.com/im/pictures/miso/Hosting-41176878/original/1733b12a-8abb-4bdf-b1ff-e3168aa07c61.jpeg?im_w=720",
  },
  {
    title: "서울의 역사 골목",
    overview: "서울의 오래된 역사를 느낄 수 있는 골목길",
    geolocation: { lat: 37.5714, lng: 126.9959 },
    imgSrc:
      "https://i.pinimg.com/474x/f8/1d/e3/f81de3e810e6315c7e9db9193c2647ea.jpg",
  },
  {
    title: "경기도의 평화로운 마을",
    overview: "경기도의 전통이 살아 숨 쉬는 마을",
    geolocation: { lat: 37.7486, lng: 127.0346 },
    imgSrc:
      "https://i.pinimg.com/474x/cb/19/3f/cb193ff0719a7c67e3d6b4835eea8bd0.jpg",
  },
  {
    title: "서울의 현대미술",
    overview: "현대미술이 가득한 서울의 갤러리",
    geolocation: { lat: 37.524, lng: 127.0473 },
    imgSrc:
      "https://i.pinimg.com/474x/5a/b8/48/5ab848227be9d6055b2c72195ea8bf4e.jpg",
  },
  {
    title: "경기도의 햇살 아래",
    overview: "경기도의 따스한 햇살을 받으며 쉴 수 있는 공원",
    geolocation: { lat: 37.4021, lng: 127.1068 },
    imgSrc:
      "https://a0.muscache.com/im/pictures/d630f754-1ce7-44f2-aadc-0b05dc929fd2.jpg?im_w=720",
  },
  {
    title: "서울의 전통시장",
    overview: "서울의 다양한 먹거리를 제공하는 전통시장",
    geolocation: { lat: 37.5704, lng: 126.991 },
    imgSrc:
      "https://i.pinimg.com/474x/6d/fd/71/6dfd71b25b09fe66431ef5e54d25721d.jpg",
  },
  {
    title: "경기도의 산책로",
    overview: "산책하기 좋은 경기도의 아름다운 길",
    geolocation: { lat: 37.2895, lng: 127.0019 },
    imgSrc:
      "https://i.pinimg.com/474x/54/0c/94/540c94b3df06d3b1f82a61ad8accb9b9.jpg",
  },
  {
    title: "서울의 숨은 공원",
    overview: "도심 속 휴식을 제공하는 서울의 작은 공원",
    geolocation: { lat: 37.5375, lng: 127.0056 },
    imgSrc:
      "https://i.pinimg.com/474x/58/60/53/58605344c949a1a4d8cb66849bd130c3.jpg",
  },
  {
    title: "경기도의 전통 정원",
    overview: "경기도의 아름다운 전통 정원",
    geolocation: { lat: 37.6639, lng: 127.6413 },
    imgSrc:
      "https://i.pinimg.com/474x/5e/74/03/5e7403a61f3886d1cbd35435db39d022.jpg",
  },
  {
    title: "서울의 강변 산책",
    overview: "한강을 따라 걷는 서울의 강변 산책로",
    geolocation: { lat: 37.5283, lng: 126.9349 },
    imgSrc:
      "https://i.pinimg.com/474x/17/59/d1/1759d1186a5713b946657de0af7988b1.jpg",
  },
  {
    title: "경기도의 아침 풍경",
    overview: "경기도의 평화로운 아침을 맞이할 수 있는 곳",
    geolocation: { lat: 37.2753, lng: 127.0093 },
    imgSrc:
      "https://a0.muscache.com/im/pictures/miso/Hosting-814937613380365669/original/7ee4b2be-ec19-4f57-bf2d-fe459b3b79cb.jpeg?im_w=720",
  },
];

export const MAPS = [
  {
    uuid: "",
    name: "#인기있는",
    mapId: "5fb94fb03365ceb1",
  },
  {
    uuid: "",
    name: "@chgeon.lee",
    mapId: "5fb94fb03365ceb1",
  },
  {
    uuid: "",
    name: "@bbang",
    mapId: "f986d6cf50a2bd8a",
  },
  {
    uuid: "",
    name: "@rabbit",
    mapId: "dc9433c0a29ac92",
  },
  {
    uuid: "",
    name: "#스윙댄스",
    mapId: "f986d6cf50a2bd8a",
  },
  {
    uuid: "",
    name: "#맛집",
    mapId: "dc9433c0a29ac92",
  },
];
