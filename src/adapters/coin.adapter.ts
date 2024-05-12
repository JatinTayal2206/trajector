import { AntdOption, Coin } from "../types/common.types";

export const coinListAdapter = (coinsList: Coin[]): AntdOption[] => {
  return coinsList?.map((coin) => ({
    label: coin?.name,
    value: coin?.id,
  }));
};

export const coinDataAdapter = (coin: any): Coin => {
  return {
    id: coin?.id,
    name: coin?.name,
    hashingAlgorithm: coin?.hashing_algorithm,
    description: coin?.description?.en,
    links: {
      homePage:
        coin?.links?.homepage?.find((url: string) => url != "") || "N/A",
      whitePaper: coin?.links?.whitepaper || "N/A",
    },
    img: coin?.image?.large,
    market: {
      currentPrice: coin?.market_data?.current_price,
      allTimeLow: coin?.market_data?.atl,
      allTimeHigh: coin?.market_data?.ath,
      marketCap: coin?.market_data?.market_cap,
      marketCapRank: coin?.market_data?.market_cap_rank,
      totalVolume: coin?.market_data?.total_volume,
      high24: coin?.market_data?.high_24h,
      low24: coin?.market_data?.low_24h,
      totalSupply: coin?.market_data?.total_supply,
      maxSupply: coin?.market_data?.max_supply,
      circulatingSupply: coin?.market_data?.circulating_supply,
    },
    development: {
      forks: coin?.developer_data?.forks,
      stars: coin?.developer_data?.stars,
      subscribers: coin?.developer_data?.subscribers,
      contributors: coin?.developer_data?.pull_request_contributors,
    },
  };
};
