import { useEffect, useRef } from "react";
import Container from "../../../../lib/chart/container";

const BarChart = ({ data }) => {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const draw = () => {
      if (!ref.current) return;

      ref.current.innerHTML = "";

      const rect = ref.current.getBoundingClientRect();
      const container = new Container();
    };

    window.addEventListener("resize", draw);
    draw();

    return () => {
      window.removeEventListener("resize", draw);
    };
  }, []);

  return <svg ref={ref} width={"100%"} height={"100%"} />;
};

export default BarChart;
