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

  const filterGridColumns =   viewport === ViewportEnum.MOBILE ? 1: 2;
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
      setData([...resources.room.loadFiltered(currentCategoryId)]);
    };

    window.addEventListener(
      "re" + GlobalEventEnum.UPDATED_ROOM_PRICE_FILTER,
      fetched,
    );

    window.addEventListener(
      "re" + GlobalEventEnum.FETCHED_ROOMS_CATEGORY,
      fetched,
    );
    resources.room.fetchRoomsByCategory(currentCategoryId);

    return () => {
      window.removeEventListener(
        "re" + GlobalEventEnum.FETCHED_ROOMS_CATEGORY,
        fetched,
      );

      window.removeEventListener(
        "re" + GlobalEventEnum.UPDATED_ROOM_PRICE_FILTER,
        fetched,
      );
    };
  }, [currentCategoryId]);

  if (data == undefined) {
    return <div> loading ... </div>;
  }
  const d = resources.room.stat(currentCategoryId)
    ? [...resources.room.stat(currentCategoryId).price]
    : [];
  d.sort((a, b) => {
    return a[0] > b[0] ? 1 : -1;
  });

  return (
    <Section>
      <div className="home">
        <div style={{ display:'grid', gridTemplateColumns: `repeat( ${filterGridColumns}, 1fr)`}}>
          <div style={{ maxWidth:712, width: '100%'}}>
          <PriceChart data={d} />
          </div>
          <div style={{ maxWidth:712, width: '100%'}}>
          <PriceChart data={d} />
          </div>
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