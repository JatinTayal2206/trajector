import axios from "axios";
import { AntdOption, ChartData } from "../types/common.types";
import { coinListAdapter } from "../adapters/coin.adapter";

export const getCoinsList = async (): Promise<AntdOption[]> => {
  try {
    const { data } = await axios.get(`https://rest.coinapi.io/v1/indexes`, {
      headers: {
        "X-CoinAPI-Key": process.env.REACT_APP_COINAPI_KEY,
      },
    });
    return coinListAdapter(data);
  } catch (error) {
    return [];
  }
};

export const getCoinsChartData = async (
  coinId: string,
  from: number,
  to: number,
  currency: string
): Promise<ChartData> => {
  try {
    const { data } = await axios.get(
      `GET https://rest.coinapi.io/v1/indexes/${coinId}/timeseries?period_id=1DAY&vs_currency=${currency}&time_start=${
        from / 1000
      }&time_end=${to / 1000}`,
      {
        headers: {
          "X-CoinAPI-Key": process.env.REACT_APP_COINAPI_KEY,
        },
      }
    );
    return data?.prices;
  } catch (error) {
    return [];
  }
};
