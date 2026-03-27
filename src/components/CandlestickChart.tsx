import { useEffect, useRef } from "react";
import { createChart, CandlestickSeries } from "lightweight-charts";

export default function CandlestickChart({ data }: any) {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chartRef.current || !data || data.length === 0) return;

    const chart = createChart(chartRef.current, {
      width: chartRef.current.clientWidth,
      height: 300,
      layout: {
        background: { color: "#0a0a0a" },
        textColor: "#fff",
      },
    });

    const candleSeries = chart.addSeries(CandlestickSeries);

    candleSeries.setData(data);

    return () => chart.remove();
  }, [data]);

  return <div ref={chartRef} />;
}