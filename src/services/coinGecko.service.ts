import axios from "axios";
import { AntdOption, ChartData } from "../types/common.types";
import { coinDataAdapter, coinListAdapter } from "../adapters/coin.adapter";

export const getCoinsList = async (): Promise<AntdOption[]> => {
  try {
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/coins/list?x_cg_api_key=${process.env.REACT_APP_COINGECKO_API_KEY}`
    );
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
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart/range?precision=0&vs_currency=${currency}&from=${
        from / 1000
      }&to=${to / 1000}&x_cg_api_key=${process.env.REACT_APP_COINGECKO_API_KEY}`
    );
    return data?.prices;
  } catch (error) {
    return [];
  }
};

export const getCoinData = async (coinId: string) => {
  try {
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&community_data=false&x_cg_api_key=${process.env.REACT_APP_COINGECKO_API_KEY}`
    );
    return coinDataAdapter(data);
  } catch (error) {}
};
