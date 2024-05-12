import { memo, useEffect, useMemo, useState } from "react";
import { Modal, Tooltip } from "antd";

import { getCoinData } from "../services/coinGecko.service";
import { Coin } from "../types/common.types";
import { CURRENCY_DISPLAY_NAME } from "../utils/constants";
import useCoinStore from "../store/coinStore";
import WithErrorBoundary from "../hoc/WithErrorBoundary";

type CoinDetailModalProps = {
  coinId: string;
  onClose: (resetId: string) => void;
};

const CoinDetailModal = (props: CoinDetailModalProps) => {
  const { coinId, onClose } = props;
  const { selectedCurrency } = useCoinStore();
  const [coinData, setCoinData] = useState<Coin>();
  const coinDev = useMemo(
    () => [
      {
        label: "Forks",
        value: coinData?.development?.forks,
        icon: (
          <span className="material-symbols-outlined text-green-500">
            merge
          </span>
        ),
      },
      {
        label: "Stars",
        value: coinData?.development?.stars,
        icon: (
          <span className="material-symbols-outlined text-yellow-500">
            stars
          </span>
        ),
      },
      {
        label: "Subscribers",
        value: coinData?.development?.subscribers,
        icon: (
          <span className="material-symbols-outlined text-purple-500">
            supervisor_account
          </span>
        ),
      },
      {
        label: "Contributors",
        value: coinData?.development?.contributors,
        icon: (
          <span className="material-symbols-outlined text-blue-500">
            engineering
          </span>
        ),
      },
    ],
    [coinData]
  );
  const coinSupply = useMemo(
    () => [
      { label: "Total Supply", value: coinData?.market?.totalSupply },
      { label: "Max Supply", value: coinData?.market?.maxSupply },
      {
        label: "Circulating Supply",
        value: coinData?.market?.circulatingSupply,
      },
    ],
    [coinData]
  );
  const coinLink = useMemo(
    () => [
      { label: "Home Page", value: coinData?.links?.homePage },
      { label: "White Paper", value: coinData?.links?.whitePaper },
    ],
    [coinData]
  );
  useEffect(() => {
    if (coinId) {
      getCoinData(coinId).then(setCoinData);
    }
  }, [coinId]);

  return (
    <Modal
      title="Coin Details"
      open={!!coinData}
      onCancel={() => onClose("")}
      footer={null}
    >
      <div className="flex justify-start items-center w-full bg-gray-100 p-4 rounded-lg mb-3">
        <img src={coinData?.img} height={48} width={48} />
        <div className="flex items-start justify-between w-full ml-2">
          <div>
            <h2 className="text-xl">{coinData?.name}</h2>
            <div className="flex items-center justify-start">
              <span className="mr-2 flex items-end justify-start text-xs">
                <span className="material-symbols-outlined text-yellow-500 mr-1">
                  hotel_class
                </span>
                Rank #{coinData?.market?.marketCapRank}
              </span>
              <span className="mr-2 flex items-end justify-start text-xs">
                <span className="material-symbols-outlined text-blue-500 mr-1">
                  equalizer
                </span>
                {coinData?.market?.totalVolume?.[selectedCurrency]}
              </span>
            </div>
          </div>
          <div>
            <span className="text-lg font-bold mr-1">
              {coinData?.market?.currentPrice?.[selectedCurrency]}
            </span>
            <span className="text-xs">
              {CURRENCY_DISPLAY_NAME[selectedCurrency]}
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-start items-center mb-3">
        {coinLink?.map(
          (link) =>
            link?.value && (
              <a
                href={link?.value}
                target="_blank"
                className="border-[1px] border-gray-300 rounded-lg px-3 py-1 flex items-center mr-2"
              >
                <span className="mr-2">{link?.label}</span>
                <span className="material-symbols-outlined text-sm text-sky-400">
                  open_in_new
                </span>
              </a>
            )
        )}
      </div>
      <div className="p-desc bg-gray-50 rounded-lg px-2 py-1 mb-3">
        {coinData?.description}
      </div>
      <div className="flex items-center w-full gap-2 [&>div]:px-3 [&>div]:py-2 [&>div]:rounded-lg [&>div]:flex-1 mb-3">
        <div className="border-[1px] border-gray-300">
          <div className="flex justify-between items-center">
            <h4 className="text-gray-500">Low Price</h4> <div>24hr</div>
          </div>
          <div className="flex items-center [&>span]:mr-1">
            <span className="material-symbols-outlined text-red-500">
              trending_down
            </span>
            <span className="font-medium">
              {coinData?.market?.low24?.[selectedCurrency]}
            </span>
            <span className="text-xs">
              {CURRENCY_DISPLAY_NAME[selectedCurrency]}
            </span>
          </div>
        </div>
        <div className="border-[1px] border-gray-300">
          <div className="flex justify-between items-center">
            <h4 className="text-gray-500">High Price</h4> <div>24hr</div>
          </div>
          <div className="flex items-center [&>span]:mr-1">
            <span className="material-symbols-outlined text-green-500">
              trending_up
            </span>

            <span className="font-medium">
              {coinData?.market?.high24?.[selectedCurrency]}
            </span>

            <span className="text-xs">
              {CURRENCY_DISPLAY_NAME[selectedCurrency]}
            </span>
          </div>
        </div>
      </div>
      <div className="mb-3">
        {coinSupply?.map((supply) => (
          <div className="flex justify-between items-center mb-2">
            <div className="text-gray-500">{supply?.label}</div>
            <div className="font-medium">{supply?.value}</div>
          </div>
        ))}
      </div>
      <div className="flex justify-evenly items-center bg-gray-50 rounded-md p-4">
        {coinDev?.map((dev) => (
          <Tooltip title={dev?.label}>
            <div className="flex flex-col items-center justify-center cursor-default">
              {dev.icon}
              <div>{dev?.value}</div>
            </div>
          </Tooltip>
        ))}
      </div>
    </Modal>
  );
};

export default WithErrorBoundary(memo(CoinDetailModal)); // Return memoised component with error boundary
