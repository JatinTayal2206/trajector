import { memo, useState } from "react";
import CoinSelect from "../components/CoinSelect";
import CoinChart from "../components/CoinChart";
import CoinRangeInput from "../components/CoinRangeInput";
import CoinDetailModal from "../components/CoinDetailModal";
import CurrencySelect from "../components/CurrencySelect";
import WithErrorBoundary from "../hoc/WithErrorBoundary";
import { logoUrl } from "../utils/constants";

const Dashboard = () => {
  const [openCoinModalFor, setOpenCoinModalFor] = useState("");
  return (
    <div className="[&>div]:px-10">
      <div className="w-full flex justify-start items-center border-b-[1px] border-gray-200 py-4">
        <img
          src={logoUrl}
          height={56}
          width={56}
          className="rounded-full mr-4"
        />
        <h1 className="text-2xl text-gray-700">Trajector</h1>
      </div>
      <div className="flex items-center justify-between gap-4 py-6">
        <div className="flex-1">
          <CoinSelect />
        </div>
        <div className="flex items-center gap-4">
          <CoinRangeInput />
          <CurrencySelect />
        </div>
      </div>
      <div className="py-4">
        <CoinChart onLineClick={setOpenCoinModalFor} />
      </div>
      {openCoinModalFor && (
        <CoinDetailModal
          coinId={openCoinModalFor}
          onClose={setOpenCoinModalFor}
        />
      )}
    </div>
  );
};

export default WithErrorBoundary(memo(Dashboard)); // Return memoised component with error boundary
