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

const useStyles = createUseStyles((theme: any) => ({
  container: {
    backgroundColor: theme.background + "cc",
    color: theme.text,
  },
}));

export default function Home() {
  const classes = useStyles();
  const viewport = useViewport();
  const ismobile = viewport === ViewportEnum.MOBILE;

  const [currentCategoryId, setCurrentCategoryId] = useState("practice");
  const [data, setData] = useState(undefined);

  useEffect(() => {
    const fetched = () => {
      setData([...resources.room.load(currentCategoryId)]);
    };

    window.addEventListener(
      "re" + GlobalEventEnum.FETCHED_ROOM_RESOURCE,
      fetched,
    );
    resources.room.fetch(currentCategoryId);
    return () => {
      return window.removeEventListener(
        "re" + GlobalEventEnum.FETCHED_ROOM_RESOURCE,
        fetched,
      );
    };
  }, [currentCategoryId]);

  if (data == undefined) {
    return <div> loading ... </div>;
  }

  return (
    <div className="home">
      <div className={classNames(classes.container, "tabs")}>
        <Collapse columns={ismobile ? 4 : 12} rows={1}>
          {CATEGORIES.data.map((data, index) => {
            return (
              <IconLabel
                key={index}
                iconElement={data.icon}
                name={data.name}
                fnClick={() => {
                  setCurrentCategoryId(data.id);
                  console.log(data.id);
                }}
              />
            );
          })}
        </Collapse>
      </div>
      <div className="contents">
        <Grid
          columns={
            viewport === ViewportEnum.MOBILE
              ? 1
              : viewport === ViewportEnum.TABLET
              ? 4
              : 6
          }
        >
          {data.map((data, index) => {
            return <ItemCard key={index} item={data.provisonal} />;
          })}
        </Grid>
      </div>
    </div>
  );
}
