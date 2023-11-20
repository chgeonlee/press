import press from "@/lib";
import Grid from "../components/Grid";
import useViewport, { ViewportEnum } from "../hooks/useViewport";
import ItemCard from "../components/ItemCard";
import { useCallback, useEffect, useRef, useState } from "react";
import { GlobalEventEnum } from "../constants";
import resources from "../resources";
import { SPOTS } from "../fixture";
import Section from "../components/Section";

import classNames from "classnames";
import { PlainButton } from "../components/button/PlainButton";
import Text, { TextSizeEnum, TextWeightEnum } from "../components/Text";
import _ from "lodash";
import MainMap from "../components/map/MainMap";

export default function Home() {
  const viewport = useViewport();

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
    <>
      <Section>
        <div className="sticker-container">
          {SPOTS.slice(0, 124).map((item) => {
            return (
              <div className="image-wrapper">
                <img src={item.imgSrc} />
              </div>
            );
          })}
        </div>
        <div className="home">
          <div className="contents">
            <Grid columns={getGridColumns()}>
              {data.map((data, index) => {
                return <ItemCard key={index} item={data.provisonal.meta} />;
              })}
            </Grid>
          </div>
        </div>
      </Section>

      <div
        className={classNames("map-wrapper", isShowMap ? "visible" : "")}
        style={{}}
      >
        <MainMap spots={SPOTS} />
      </div>
      <div
        style={{
          position: "fixed",
          bottom: 24,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        {isShowMap ? (
          <PlainButton
            value={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 12,
                  alignItems: "center",
                }}
              >
                <img
                  src={
                    "https://www.reshot.com/preview-assets/icons/FSLV43QKM9/map-pointer-FSLV43QKM9.svg"
                  }
                  width={16}
                  height={16}
                />

                <Text size={TextSizeEnum.MD}>아이템보기</Text>
              </div>
            }
            fnClick={() => {
              setIsShowMap((p) => !p);
            }}
          />
        ) : (
          <PlainButton
            value={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 12,
                  alignItems: "center",
                }}
              >
                <img
                  src={
                    "https://www.reshot.com/preview-assets/icons/FSLV43QKM9/map-pointer-FSLV43QKM9.svg"
                  }
                  width={16}
                  height={16}
                />

                <Text size={TextSizeEnum.MD}>지도보기</Text>
              </div>
            }
            fnClick={() => {
              setIsShowMap((p) => !p);
            }}
          />
        )}
      </div>
    </>
  );
}
