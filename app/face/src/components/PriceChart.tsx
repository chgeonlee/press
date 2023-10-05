import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import press from "@/lib";
import Circle from "./icon/self/circle";
import _ from "lodash";
import resources from "../resources";
import Text, { TextSizeEnum, TextWeightEnum } from "./Text";
import { GlobalEventEnum } from "../constants";

const PriceChart = ({ data }: { data: [number, number][] }) => {
  const unit = 1000;
  const ref = useRef<SVGSVGElement>(null);
  const domainRef = useRef<any>(null);
  const containerRef = useRef<any>(null);
  const [rect, setRect] = useState(null);
  const [leftFilterIndex, setLeftFilterIndex] = useState(0);
  const [rightFilterIndex, setRightFilterIndex] = useState(0);

  const findClosestValue = (target: number): number => {
    if (domainRef == null || domainRef.current == null) return 0;
    const ran = _.range(domainRef.current[0], domainRef.current[1], unit);
    return _.minBy(ran, (v) =>
      Math.abs(containerRef.current.scaleX(v) - target),
    );
  };

  const handleMouseDown =
    (circle: "left" | "right") => (e: React.MouseEvent) => {
      const handleMouseMove = (e: any) => {
        const rect = ref.current.getBoundingClientRect();
        const ax = Math.min(
          Math.max(e.clientX - rect.left, gap),
          rect.width - gap,
        ); //

        if (circle === "left") {
          setLeftFilterIndex(findClosestValue(ax));
        } else if (circle === "right") {
          setRightFilterIndex(findClosestValue(ax));
        }
      };

      const handleMouseUp = () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    };

  const gap = 0;
  const chart = press.chart();
  const dx = [
    Math.min(...data.map((item) => item[0])),
    Math.max(...data.map((item) => item[0])) + unit,
  ] as [number, number];

  useEffect(() => {
    const draw = () => {
      console.log("...?", data);
      const rect = ref.current.getBoundingClientRect();
      const container = chart
        .container(ref.current)
        .domainX(dx)
        .domainY([0, Math.max(...data.map((item) => item[1]))])
        .drawX(true);

      container
        .rangeX([gap, rect.width - gap])
        .rangeY([gap, rect.height - gap]);

      setLeftFilterIndex(dx[0]);
      setRightFilterIndex(dx[1]);

      domainRef.current = dx;
      containerRef.current = container;
      setRect(rect);
    };

    window.addEventListener("resize", draw);
    window.addEventListener(
      "re" + GlobalEventEnum.FETCHED_ROOMS_CATEGORY,
      draw,
    );
    draw();

    return () => {
      window.removeEventListener("resize", draw);
      window.removeEventListener(
        "re" + GlobalEventEnum.FETCHED_ROOMS_CATEGORY,
        draw,
      );
    };
  }, []);

  const leftSet = useMemo(
    () => _.filter(data, (d) => d[0] < leftFilterIndex),
    [leftFilterIndex, data],
  );
  const rightSet = useMemo(
    () => _.filter(data, (d) => d[0] >= rightFilterIndex),
    [rightFilterIndex, data],
  );
  const middleSet = useMemo(
    () =>
      _.filter(data, (d) => d[0] >= leftFilterIndex && d[0] < rightFilterIndex),
    [leftFilterIndex, rightFilterIndex, data],
  );

  const leftSpec = useMemo(() => {
    return {
      attr: { fill: press.palette.grey },
      prop: { barGap: 1, barWidth: 1000 },
      data: leftSet,
    };
  }, [leftSet]);

  const rightSpec = useMemo(() => {
    return {
      attr: { fill: press.palette.grey },
      prop: { barGap: 1, barWidth: 1000 },
      data: rightSet,
    };
  }, [rightSet]);

  const middleSpec = useMemo(() => {
    return {
      attr: { fill: press.palette.turquoise },
      prop: { barGap: 1, barWidth: 1000 },
      data: middleSet,
    };
  }, [middleSet]);

  useEffect(() => {
    containerRef.current.innerHTML = "";

    const container = containerRef.current;
    container.clear();
    container.setModel(chart.model.bar(leftSpec));
    container.setModel(chart.model.bar(rightSpec));
    container.setModel(chart.model.bar(middleSpec));

    container.draw();
    resources.room.priceFilter(leftFilterIndex, rightFilterIndex);
  }, [leftFilterIndex, rightFilterIndex, rect]);

  return (
    <div
      style={press.style
        .relative()
        .edge(1, press.palette.grey)
        .add({ padding: 12, margin: 12 })}
    >
      <div style={{ padding: 12 }}>
        <Text size={TextSizeEnum.LG} weight={TextWeightEnum.MEDIUM}>
          가격 필터
        </Text>
      </div>
      <div style={{ padding: 12, height: 60 }}>
        <svg ref={ref} width={"100%"} height={"100%"} />
      </div>
      <div style={press.style.relative().block("100%").edge(1, "#333333cc", 0)}>
        <div
          onMouseDown={handleMouseDown("left")}
          style={press.style
            .absolute()
            .rank(100)
            .add({
              left: containerRef.current?.scaleX(leftFilterIndex),
              top: -14,
            })}
        >
          <Circle size={28} />
        </div>
        <div
          onMouseDown={handleMouseDown("right")}
          style={press.style
            .absolute()
            .rank(100)
            .add({
              left: containerRef.current?.scaleX(rightFilterIndex),
              top: -14,
            })}
        >
          <Circle size={28} />
        </div>
      </div>
    </div>
  );
};

export default PriceChart;
