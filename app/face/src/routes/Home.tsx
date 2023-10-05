import IconLabel from "../components/IconLabel";
import Grid from "../components/Grid";
import useViewport, { ViewportEnum } from "../hooks/useViewport";
import { Collapse } from "../components/Collapse";
import ItemCard from "../components/ItemCard";
import { createUseStyles } from "react-jss";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { GlobalEventEnum } from "../constants";
import resources from "../resources";
import { CATEGORIES } from "../fixture";
import press from "@/lib";
import Section from "../components/Section";
import PriceChart from "../components/PriceChart";

const useStyles = createUseStyles((theme: any) => ({
  container: press.style
    .relative()
    .back(theme.background + "cc")
    .color(theme.text),
}));

export default function Home() {
  const classes = useStyles();
  const viewport = useViewport();

  const [currentCategoryId, setCurrentCategoryId] = useState("practice");
  const [data, setData] = useState(undefined);

  const categoryGridColumns =
    viewport === ViewportEnum.MOBILE
      ? 4
      : viewport === ViewportEnum.TABLET
      ? 8
      : 12;

  const roomGridColumns =
    viewport === ViewportEnum.MOBILE
      ? 1
      : viewport === ViewportEnum.TABLET
      ? 4
      : 6;

  useEffect(() => {
    const fetched = () => {
      setData([...resources.room.load(currentCategoryId)]);
    };

    window.addEventListener(
      "re" + GlobalEventEnum.FETCHED_ROOMS_CATEGORY,
      fetched,
    );
    resources.room.fetchRoomsByCategory(currentCategoryId);

    return () => {
      return window.removeEventListener(
        "re" + GlobalEventEnum.FETCHED_ROOMS_CATEGORY,
        fetched,
      );
    };
  }, [currentCategoryId]);

  if (data == undefined) {
    return <div> loading ... </div>;
  }

  return (
    <Section>
      <div className="home">
        <div>
          <PriceChart data={generateRandomData(400)} />
        </div>
        <div className={classNames(classes.container, "tabs")}>
          <Collapse columns={categoryGridColumns} rows={1}>
            {CATEGORIES.data.map((data, index) => {
              return (
                <IconLabel
                  key={index}
                  iconElement={data.icon}
                  name={data.name}
                  fnClick={() => {
                    setCurrentCategoryId(data.id);
                  }}
                />
              );
            })}
          </Collapse>
        </div>
        <div className="contents">
          <Grid columns={roomGridColumns}>
            {data.map((data, index) => {
              return <ItemCard key={index} item={data.provisonal.meta} />;
            })}
          </Grid>
        </div>
      </div>
    </Section>
  );
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function generateRandomData(pointsCount) {
  const data = [];
  for (let i = 0; i < pointsCount; i++) {
    const y = getRandomInt(0, 100);
    data.push([i, y]);
  }
  return data;
}
