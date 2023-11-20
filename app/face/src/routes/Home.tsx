import press from "@/lib";
import Grid from "../components/Grid";
import useViewport, { ViewportEnum } from "../hooks/useViewport";
import ItemCard from "../components/ItemCard";
import { useCallback, useEffect, useRef, useState } from "react";
import { GlobalEventEnum } from "../constants";
import resources from "../resources";
import { SPOTS } from "../fixture";
import Section from "../components/Section";
import SpotMap from "../components/map/SpotMap";
import classNames from "classnames";
import { PlainButton } from "../components/button/PlainButton";
import Text, { TextSizeEnum, TextWeightEnum } from "../components/Text";
import _ from "lodash";
import MainMap from "../components/map/MainMap";

export default function Home() {
  const viewport = useViewport();
  const containerRef = useRef(null);

  const [currentCategoryId, setCurrentCategoryId] = useState("practice");
  const [isShowMap, setIsShowMap] = useState(false);
  const [data, setData] = useState(undefined);
  const [address, setAddress] = useState<any>();

  const getGridColumns = useCallback(() => {
    return viewport === ViewportEnum.MOBILE
      ? 1
      : viewport === ViewportEnum.TABLET
      ? 3
      : viewport === ViewportEnum.LAPTOP
      ? 4
      : 6;
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
        <div className="sticker-container">
          {SPOTS.slice(0, 124).map((item) => {
            return (
              <div className="image-wrapper">
                <img src={item.imgSrc} />
              </div>
            );
          })}
        </div>
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
            <Text size={TextSizeEnum.MD} weight={TextWeightEnum.MEDIUM}>
              PUBLIC
            </Text>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <Text size={TextSizeEnum.SM} weight={TextWeightEnum.THIN}>
              {address}
            </Text>
            <PlainButton
              value="Show map"
              fnClick={() => {
                setIsShowMap((p) => !p);
              }}
            />
          </div>
        </div>

        <div
          className={classNames("map-wrapper", isShowMap ? "visible" : "")}
          ref={containerRef}
          style={{ width: "100%", height: "100%" }}
        >
          <MainMap spots={SPOTS} />
        </div>

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
