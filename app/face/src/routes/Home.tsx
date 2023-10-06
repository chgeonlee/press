import IconLabel from "../components/IconLabel";
import Grid from "../components/Grid";
import useViewport, { ViewportEnum } from "../hooks/useViewport";
import { Collapse } from "../components/Collapse";
import ItemCard from "../components/ItemCard";
import { createUseStyles, useTheme } from "react-jss";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { GlobalEventEnum } from "../constants";
import resources from "../resources";
import { CATEGORIES } from "../fixture";
import press from "@/lib";
import Section from "../components/Section";
import FilterChart from "../components/FilterChart";
import Text from "../components/Text";

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
  const [priceData, setPriceData] = useState<any>();
  const [scoreData, setScoreData] = useState<any>();
  const isMobile = viewport === ViewportEnum.MOBILE;
  const categoryGridColumns = isMobile
    ? 4
    : viewport === ViewportEnum.TABLET
    ? 8
    : 12;

  const roomGridColumns = isMobile
    ? 1
    : viewport === ViewportEnum.TABLET
    ? 4
    : 6;

  useEffect(() => {
    const fetched = () => {
      setData([...resources.room.loadFiltered(currentCategoryId)]);
      const d = resources.room.stat(currentCategoryId)
        ? resources.room.stat(currentCategoryId)
        : null;

      setScoreData(d.rating);
      setPriceData(d.price);
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

  return (
    <Section>
      <div className="home">
        <div
          className={classNames("filter-container", isMobile ? "mobile" : "")}
        >
          <div className={classNames("panel")}>
            <div>
              <Text> 가격 필터 </Text>
            </div>
            {priceData && <FilterChart data={priceData} category="price" />}
          </div>
          <div className={classNames("panel")}>
            <div>
              <Text> 별점 필터 </Text>
            </div>
            {scoreData && (
              <FilterChart
                data={scoreData}
                category="rating"
                unit={1}
                barWidth={1}
              />
            )}
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
