import Masonry from "../components/Masonry";
import resources from "../resources";
import { useEffect, useRef, useState } from "react";
import Text, { TextSizeEnum, TextWeightEnum } from "../components/Text";
import Section from "../components/Section";
import useViewport, { ViewportEnum } from "../hooks/useViewport";
import classNames from "classnames";
import { useParams } from "react-router-dom";
import { GlobalEventEnum } from "../../../../lib/constants";

export default function Room() {
  const { id } = useParams();
  const [data, setData] = useState(undefined);
  const viewport = useViewport();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const record = () => {
      if (resources.room.loadedDetail(id)) {
        setData(resources.room.getRoomDetail(id));
      } else {
        resources.room.fetchRoom(id);
      }
    };

    window.addEventListener("re" + GlobalEventEnum.FETCHED_ROOM_BY_ID, record);
    record();

    return () => {
      window.removeEventListener(
        "re" + GlobalEventEnum.FETCHED_ROOM_BY_ID,
        record
      );
    };
  }, []);

  if (data == undefined) {
    return <div>loading</div>;
  }

  const { meta } = data;

  return (
    <Section floating={true}>
      <div
        className={classNames(
          "room",
          viewport === ViewportEnum.MOBILE ? "mobile" : ""
        )}
      >
        <div className="room-meta">
          <div className="room-header">
            <Text size={TextSizeEnum.XL} weight={TextWeightEnum.BOLD}>
              {meta.title}
            </Text>
            <Text size={TextSizeEnum.LG} weight={TextWeightEnum.MEDIUM}>
              {meta.description}
            </Text>
          </div>
        </div>

        <div className="room-grid">
          {data.meta.imgset.length > 0 && (
            <Masonry
              columns={viewport === ViewportEnum.LAPTOP ? 3 : 2}
              rowGap={12}
              columnGap={12}
            >
              {data.meta.imgset.map((src, index) => {
                return (
                  <img
                    src={src}
                    key={index}
                    style={{ objectFit: "cover", width: "100%" }}
                  />
                );
              })}
            </Masonry>
          )}
        </div>
      </div>
    </Section>
  );
}
