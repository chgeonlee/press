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

export default function Home() {
  const viewport = useViewport();
  const [currentCategoryId, setCurrentCategoryId] = useState("practice");
  const [isShowMap, setIsShowMap] = useState(false);
  const [data, setData] = useState(undefined);
  const [geolocation, setGeolocation] = useState<any>();

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
    if (navigator.geolocation) {
      function showPosition(position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;

        setGeolocation(() => {
          return {
            lat: lat,
            lng: lng,
          };
        });

        // Google Maps Geocoding API를 호출합니다.
        var geocodingAPI =
          "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
          lat +
          "," +
          lng +
          "&key=AIzaSyA7xnRZgDTOCAUgqpgmfGpwq7xTMUFww1I";

        fetch(geocodingAPI)
          .then((response) => response.json())
          .then((data) => {
            console.log("data", data);
            var address = data.results[0].formatted_address;
            console.log(address); // 이곳에서 주소를 파싱하여 간략한 형태로 변환할 수 있습니다.
          })
          .catch((error) => console.log(error));
      }

      console.log(
        navigator.geolocation.getCurrentPosition(showPosition, () => {
          console.log("failed");
        })
      );
    }

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
            <div>
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
          {geolocation && <SpotMap center={geolocation} spots={SPOTS} />}
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
