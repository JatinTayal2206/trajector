import { create } from "zustand";

import dayjs from "dayjs";

import { DEFAULT_CRYPTO_SELECTIONS } from "../utils/constants";
import { AntdOption, TimeRange } from "../types/common.types";

type CoinStore = {
  selectedCoins: AntdOption[];
  setSelectedCoins: (newCoins: AntdOption[]) => void;
  selectedRange: TimeRange;
  setSelectedRange: (newRange: TimeRange) => void;
  selectedCurrency: string;
  setSelectedCurrency: (newCurrency: string) => void;
};

const useCoinStore = create<CoinStore>((set) => ({
  selectedCoins: DEFAULT_CRYPTO_SELECTIONS,
  setSelectedCoins: (newCoins: AntdOption[]) => {
    set({
      selectedCoins: newCoins,
    });
  },
  selectedRange: [dayjs().subtract(9, "month"), dayjs()],
  setSelectedRange: (newRange: TimeRange) => {
    set({
      selectedRange: newRange,
    });
  },
  selectedCurrency: "usd",
  setSelectedCurrency: (newCurrency: string) => {
    set({
      selectedCurrency: newCurrency,
    });
  },
}));

export default useCoinStore;
