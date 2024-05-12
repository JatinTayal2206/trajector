import { Dayjs } from "dayjs";

export type AntdOption = {
  label: string;
  value: string;
};

export type TimeRange = [
  start: Dayjs | null | undefined,
  end: Dayjs | null | undefined
];

export type ChartData = Array<Array<number>>;

export type LineChartData = {
  labels: string[];
  datasets: { label: string; data: number[]; id: string }[];
};

export type Coin = {
  id: string;
  symbol?: string;
  name: string;
  hashingAlgorithm?: string;
  description?: string;
  links?: {
    homePage?: string;
    whitePaper?: string;
  };
  img?: string;
  market?: {
    currentPrice?: { [key: string]: number };
    allTimeLow?: { [key: string]: number };
    allTimeHigh?: { [key: string]: number };
    marketCap?: { [key: string]: number };
    marketCapRank?: number;
    totalVolume?: { [key: string]: number };
    high24?: { [key: string]: number };
    low24?: { [key: string]: number };
    totalSupply?: number;
    maxSupply?: number;
    circulatingSupply?: number;
  };
  development?: {
    forks?: number;
    stars?: number;
    subscribers?: number;
    contributors?: number;
  };
};
