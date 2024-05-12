import { coinData, formattedCoinData } from "../test/data";
import { coinDataAdapter, coinListAdapter } from "./coin.adapter";

describe("coinAdapter", () => {
  it("coinListAdapter formats coin data to antd option format", () => {
    const formattedData = coinListAdapter([
      {
        id: "ariva",
        symbol: "arv",
        name: "Ariva",
      },
      {
        id: "arix",
        symbol: "arix",
        name: "Arix",
      },
    ]);
    expect(formattedData).toEqual([
      { label: "Ariva", value: "ariva" },
      { label: "Arix", value: "arix" },
    ]);
  });
  it("coinListAdapter returns [] when [] is passed", () => {
    const formattedData = coinListAdapter([]);
    expect(formattedData).toEqual([]);
  });
  it("coinDataAdapter properly formats coin data", () => {
    const formattedData = coinDataAdapter(coinData);
    expect(formattedData).toEqual(formattedCoinData);
  });
});
