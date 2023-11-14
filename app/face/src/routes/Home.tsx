import Grid from "../components/Grid";
import useViewport, { ViewportEnum } from "../hooks/useViewport";
import ItemCard from "../components/ItemCard";
import { createUseStyles, useTheme } from "react-jss";
import { useCallback, useEffect, useState } from "react";
import { GlobalEventEnum } from "../constants";
import resources from "../resources";
import { SPOTS } from "../fixture";
import press from "@/lib";
import Section from "../components/Section";
import SpotMap from "../components/map/SpotMap";
import classNames from "classnames";
import { PlainButton } from "../components/button/PlainButton";
import Text, { TextSizeEnum, TextWeightEnum } from "../components/Text";

export default function Home() {
  const viewport = useViewport();
  const [currentCategoryId, setCurrentCategoryId] = useState("practice");
  const [isShowMap, setIsShowMap] = useState(false);
  const [data, setData] = useState(undefined);

  const getGridColumns = useCallback(() => {
    return viewport === ViewportEnum.MOBILE
      ? 1
      : viewport === ViewportEnum.TABLET
      ? 3
      : 4;
  }, [viewport]);

  useEffect(() => {
    const fetched = () => {
      setData([...resources.room.loadFiltered(currentCategoryId)]);
    };

    window.addEventListener(
      "re" + GlobalEventEnum.UPDATED_ROOM_PRICE_FILTER,
      fetched
    );

    window.addEventListener(
      "re" + GlobalEventEnum.FETCHED_ROOMS_CATEGORY,
      fetched
    );
    resources.room.fetchRoomsByCategory(currentCategoryId);

    return () => {
      window.removeEventListener(
        "re" + GlobalEventEnum.FETCHED_ROOMS_CATEGORY,
        fetched
      );
      window.removeEventListener(
        "re" + GlobalEventEnum.UPDATED_ROOM_PRICE_FILTER,
        fetched
      );
    };
  }, [currentCategoryId]);

  if (data == undefined) {
    return <div> loading ... </div>;
  }

  return (
    <Section>
      <div className="home">
        <div className={classNames("filter-bar")}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "0 4px",
            }}
          >
            <img
              src={
                "https://www.reshot.com/preview-assets/icons/FSLV43QKM9/map-pointer-FSLV43QKM9.svg"
              }
              width={16}
              height={16}
            />
            <div style={{ marginTop: 2 }}>
              <Text size={TextSizeEnum.LG} weight={TextWeightEnum.MEDIUM}>
                Public
              </Text>
            </div>
          </div>
          <PlainButton
            value="Show map"
            fnClick={() => {
              setIsShowMap((p) => !p);
            }}
          />
        </div>
        <div className={classNames("map-wrapper", isShowMap ? "visible" : "")}>
          <SpotMap center={{ lat: 37.5665, lng: 126.978 }} spots={SPOTS} />
        </div>
        {/*
        <div className={classNames(classes.container, "tabs", "sticky")}>
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
        </div> */}

        <div className="contents">
          <Grid columns={getGridColumns()}>
            {data.map((data, index) => {
              return <ItemCard key={index} item={data.provisonal.meta} />;
            })}
          </Grid>
        </div>
      </div>
    </Section>
  );
}
