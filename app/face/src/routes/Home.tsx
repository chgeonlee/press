import Grid from "../components/Grid";
import useViewport, { ViewportEnum } from "../hooks/useViewport";
import ItemCard from "../components/ItemCard";
import { useCallback, useEffect, useState } from "react";
import { GlobalEventEnum } from "../constants";
import resources from "../resources";
import { SPOTS } from "../fixture";
import Section from "../components/Section";
import SpotMap from "../components/map/SpotMap";
import classNames from "classnames";
import { PlainButton } from "../components/button/PlainButton";
import Text, { TextSizeEnum, TextWeightEnum } from "../components/Text";

const DEFAULT_MAP_SPEC = {
  fixture: true,
  zoomInfo: {
    zoom: 15,
    minZoom: 9,
    maxZoom: 17,
  },
};

const DEFAULT_MAP_CENTER = {
  lat: 37.51112,
  lng: 127.095973,
};

export default function Home() {
  const viewport = useViewport();
  const [currentCategoryId, setCurrentCategoryId] = useState("practice");
  const [isShowMap, setIsShowMap] = useState(false);
  const [data, setData] = useState(undefined);
  const [geolocation, setGeolocation] = useState<any>(DEFAULT_MAP_SPEC);
  const [center, setCenter] = useState<any>();
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
    const succ = (p) => {
      const lat = p.coords.latitude;
      const lng = p.coords.longitude;

      setCenter({
        lat,
        lng,
      });
    };
    const fail = () => {
      setGeolocation(DEFAULT_MAP_CENTER);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(succ, fail);
    } else {
      fail();
    }
  }, []);

  useEffect(() => {
    if (center) {
      const { lat, lng } = center;
      var geocodingAPI =
        "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
        lat +
        "," +
        lng +
        "&key=AIzaSyA7xnRZgDTOCAUgqpgmfGpwq7xTMUFww1I";

      fetch(geocodingAPI)
        .then((response) => response.json())
        .then((data) => {
          var address = data.results[0].formatted_address;
          setAddress(address);
        })
        .catch((error) => console.log(error));
    }
  }, [center]);

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

  if (data == undefined || geolocation == null) {
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
            <Text size={TextSizeEnum.LG} weight={TextWeightEnum.MEDIUM}>
              Public
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
        <div className={classNames("map-wrapper", isShowMap ? "visible" : "")}>
          {center && (
            <SpotMap
              spec={DEFAULT_MAP_SPEC}
              center={center}
              spots={SPOTS}
              onChange={(lat, lng) => {
                setCenter({
                  lat,
                  lng,
                });
              }}
            />
          )}
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
