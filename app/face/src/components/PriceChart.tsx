import { useEffect, useRef } from "react";
import press from "@/lib";

const PriceChart = ({ data }: { data: [number, number][] }) => {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const draw = () => {
      if (!ref.current) return;
      ref.current.innerHTML = "";

      const gap = 4;
      const spec = {
        attr: { fill: press.palette.fuchsia },
        prop: { barWidth: 1, barGap: gap },
        data: data,
      };
      const rect = ref.current.getBoundingClientRect();
      const chart = press.chart();
      const container = chart.container
        .domainX([
          Math.min(...data.map((item) => item[0])),
          Math.max(...data.map((item) => item[0])) + 1,
        ])
        .domainY([0, Math.max(...data.map((item) => item[1]))])
        .rangeX([gap, rect.width - gap])
        .rangeY([gap, rect.height - gap])
        .drawX(true);
      container.setModel(chart.model.bar(spec));
      container.draw(ref.current);
    };

    window.addEventListener("resize", draw);
    draw();

    return () => {
      window.removeEventListener("resize", draw);
    };
  }, []);

  return <svg ref={ref} width={"100%"} height={"100%"} />;
};

export default PriceChart;
