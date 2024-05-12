import { useEffect, useState } from "react";

import { AntdOption, LineChartData, TimeRange } from "../types/common.types";
import { getCoinsChartData } from "../services/coinGecko.service";
import { getMidNightTimeStamp } from "../utils/time.utils";
import { Dayjs } from "dayjs";
import { getRandomColor } from "../utils/common.utils";

const useCoinChartData = (
  selectedCoins: AntdOption[],
  selectedRange: TimeRange,
  selectedCurrency: string
) => {
  const [chartData, setChartData] = useState<LineChartData>();

  useEffect(() => {
    if (selectedCoins.length) {
      // Fetch chart data of all the selected coins
      Promise.all(
        selectedCoins.map((coin) =>
          getCoinsChartData(
            coin?.value,
            getMidNightTimeStamp(selectedRange[0] as Dayjs),
            getMidNightTimeStamp(selectedRange[1] as Dayjs),
            selectedCurrency
          ).then((res) => ({
            id: coin?.value,
            label: coin?.label,
            data: res,
          }))
        )
      ).then((res) => {
        // Convert the timeseries data to response to line chart dataset format
        setChartData({
          labels: res[0].data.map((data) => new Date(data[0]).toDateString()),
          datasets: res.map((chartData) => {
            const color = getRandomColor();
            return {
              id: chartData?.id as string,
              label: chartData?.label,
              data: chartData?.data?.map((data) => data[1]),
              borderColor: color,
              backgroundColor: color,
            };
          }),
        });
      });
    } else {
      setChartData({ labels: [], datasets: [] });
    }
  }, [selectedCoins, selectedRange, selectedCurrency]);
  return chartData;
};

export default useCoinChartData;
