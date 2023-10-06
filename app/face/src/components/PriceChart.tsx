import { useEffect, useMemo, useRef, useState } from "react";
import press from "@/lib";
import Circle from "./icon/self/circle";
import _ from "lodash";
import resources from "../resources";
import { DirectionEnum, GlobalEventEnum } from "../constants";
import useElementRect from "../hooks/useElementRect";
import { createUseStyles } from "react-jss";
import classNames from "classnames";

const useStyles = createUseStyles((theme: any) => ({
  container: press.style.relative().edge(1, theme.border).pad(12, 12, 12, 12 ),
  chart: press.style.spec().pad(12, 12, 12, 12 ),
  navigator: press.style.relative().edge(1, theme.border, 0)
}));

const useDomain = (data: [number, number][], unit): [number, number] => {
  return useMemo(
    () => [
      Math.min(...data.map((item) => item[0])),
      Math.max(...data.map((item) => item[0])) + unit,
    ],
    [data],
  );
};

const FilterCircle = ({
  position,
  onMouseDown,
}: {
  position: number;
  onMouseDown: (e: React.MouseEvent) => void;
}) => (
  <div
    onMouseDown={onMouseDown}
    style={press.style.absolute().rank(100).add({ left: position, top: -14 })}
  >
    <Circle size={28} />
  </div>
);

const generateBarSpec = (data, color, barWidth) => {
  return {
    attr: { fill: color },
    prop: { barGap: 1, barWidth: barWidth },
    data: data,
  };
};

const PriceChart = ({
  data,
  unit = 1000,
  barWidth = 1000,
}: {
  data: [number, number][];
  unit?: number;
  barWidth?: number;
}) => {
  const classes = useStyles();
  const domainRef = useRef<any>(null);
  const containerRef = useRef<any>(null);
  const [rect, ref] = useElementRect<SVGSVGElement>();
  const [leftFilterIndex, setLeftFilterIndex] = useState(0);
  const [rightFilterIndex, setRightFilterIndex] = useState(0);

  const chart = press.chart();
  const domain = useDomain(data, unit);

  const findClosestValue = (target: number): number => {
    if (domainRef == null || domainRef.current == null) return 0;
    return _.minBy(
      _.range(domainRef.current[0], domainRef.current[1], unit),
      (v) => Math.abs(containerRef.current.scaleX(v) - target),
    );
  };

  useEffect(() => {
    const draw = () => {
      if (rect == null) return;

      const container = chart
        .container(ref.current)
        .domainX(domain)
        .domainY([0, Math.max(...data.map((item) => item[1]))])
        .drawX(true);

      container.rangeX([0, rect.width]).rangeY([0, rect.height]);

      setLeftFilterIndex(domain[0]);
      setRightFilterIndex(domain[1]);

      domainRef.current = domain;
      containerRef.current = container;
    };

    window.addEventListener(
      "re" + GlobalEventEnum.FETCHED_ROOMS_CATEGORY,
      draw,
    );
    draw();

    return () => {
      window.removeEventListener(
        "re" + GlobalEventEnum.FETCHED_ROOMS_CATEGORY,
        draw,
      );
    };
  }, [rect]);

  const leftSpec = useMemo(() => {
    return generateBarSpec(
      _.filter(data, (d) => d[0] < leftFilterIndex),
      press.palette.grey,
      barWidth,
    );
  }, [leftFilterIndex, data]);

  const rightSpec = useMemo(() => {
    return generateBarSpec(
      _.filter(data, (d) => d[0] >= rightFilterIndex),
      press.palette.grey,
      barWidth,
    );
  }, [rightFilterIndex, data]);

  const middleSpec = useMemo(() => {
    return generateBarSpec(
      _.filter(data, (d) => d[0] >= leftFilterIndex && d[0] < rightFilterIndex),
      press.palette.steel,
      barWidth,
    );
  }, [leftFilterIndex, rightFilterIndex, data]);

  useEffect(() => {
    const container = containerRef.current;

    if (container == null) return;

    container.clear();
    container.setModel(chart.model.bar(leftSpec));
    container.setModel(chart.model.bar(rightSpec));
    container.setModel(chart.model.bar(middleSpec));

    container.draw();
    resources.room.priceFilter(leftFilterIndex, rightFilterIndex);
  }, [leftFilterIndex, rightFilterIndex, rect]);

  const handleMouseDown =
    (direction: DirectionEnum) => (e: React.MouseEvent) => {
      const handleMouseMove = (e: any) => {
        const fidx = findClosestValue(
          Math.min(Math.max(e.clientX - rect.left, 0), rect.width),
        );

        if (direction === DirectionEnum.LEFT && fidx < rightFilterIndex) {
          setLeftFilterIndex(fidx);
        } else if (
          direction === DirectionEnum.RIGHT &&
          fidx > leftFilterIndex
        ) {
          setRightFilterIndex(fidx);
        }
      };

      const handleMouseUp = () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    };

  return (
    <div className={classNames(classes.container)}>
      <div className={classNames(classes.chart)}>
        <svg ref={ref} width={"100%"} height={"100%"} />
      </div>
      <div className={classNames(classes.navigator)}>
        <FilterCircle
          position={containerRef.current?.scaleX(leftFilterIndex)}
          onMouseDown={handleMouseDown(DirectionEnum.LEFT)}
        />
        <FilterCircle
          position={containerRef.current?.scaleX(rightFilterIndex)}
          onMouseDown={handleMouseDown(DirectionEnum.RIGHT)}
        />
      </div>
    </div>
  );
};

export default PriceChart;
