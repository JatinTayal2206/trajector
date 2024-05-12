import { memo, useRef } from "react";

import { Line, getElementAtEvent } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import useCoinChartData from "../hooks/useCoinChartData";
import { CURRENCY_DISPLAY_NAME } from "../utils/constants";
import useCoinStore from "../store/coinStore";
import WithErrorBoundary from "../hoc/WithErrorBoundary";

type CoinChartProps = {
  onLineClick: (coinId: string) => void;
};

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale, // X - Time Scale
  LinearScale, // Y - Crypto Scale
  Tooltip,
  Legend
);

const CoinChart = (props: CoinChartProps) => {
  const { onLineClick } = props;
  const { selectedCoins, selectedRange, selectedCurrency } = useCoinStore();
  const chartRef = useRef();
  const chartData = useCoinChartData(
    selectedCoins,
    selectedRange,
    selectedCurrency
  );

  return chartData ? (
    <div className="border-[1px] border-gray-200 rounded-lg p-4">
      <Line
        ref={chartRef}
        data={chartData}
        options={{
          plugins: {
            legend: {
              display: true,
            },
            tooltip: {
              callbacks: {
                label: (item: any) =>
                  `${item?.dataset?.label}: ${item?.formattedValue} ${CURRENCY_DISPLAY_NAME[selectedCurrency]}`, // Add selected currency to the tooltip
              },
            },
          },
        }}
        onClick={(e) => {
          if (
            chartRef.current &&
            getElementAtEvent(chartRef.current, e)?.length > 0
          ) {
            onLineClick(
              chartData.datasets[
                getElementAtEvent(chartRef.current, e)[0].datasetIndex
              ].id
            );
          }
        }}
      />
    </div>
  ) : null;
};

export default WithErrorBoundary(memo(CoinChart)); // Return memoised component with error boundary
