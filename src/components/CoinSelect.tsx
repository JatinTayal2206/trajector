import { memo, useEffect, useState } from "react";
import { Select } from "antd";

import { AntdOption } from "../types/common.types";
import { getCoinsList } from "../services/coinGecko.service";
import useCoinStore from "../store/coinStore";
import WithErrorBoundary from "../hoc/WithErrorBoundary";

const CoinSelect = () => {
  const { selectedCoins, setSelectedCoins } = useCoinStore();
  const [allCryptos, setAllCryptos] = useState<AntdOption[]>();

  useEffect(() => {
    getCoinsList().then(setAllCryptos);
  }, []);

  return (
    <div className="flex flex-col items-start">
      <h3 className="text-xs mb-2">Search</h3>
      <Select
        className="w-full"
        mode="multiple"
        allowClear
        placeholder="Select Crypto Coins"
        options={allCryptos}
        value={selectedCoins}
        onClear={() => setSelectedCoins([])}
        onDeselect={(_, selectedOption) =>
          setSelectedCoins(
            selectedCoins.filter(
              (option) => option?.value != selectedOption?.value
            )
          )
        }
        onSelect={(_, selectedOption) =>
          setSelectedCoins([...selectedCoins, selectedOption])
        }
      />
    </div>
  );
};

export default WithErrorBoundary(memo(CoinSelect));
