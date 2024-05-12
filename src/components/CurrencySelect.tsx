import { memo } from "react";
import { Select } from "antd";

import { CURRENCIES, CURRENCY_DISPLAY_NAME } from "../utils/constants";
import useCoinStore from "../store/coinStore";
import WithErrorBoundary from "../hoc/WithErrorBoundary";

const CurrencySelect = () => {
  const { selectedCurrency, setSelectedCurrency } = useCoinStore();
  return (
    <div className="flex flex-col items-start">
      <h3 className="text-xs mb-2">Currency</h3>
      <Select
        className="w-40"
        value={selectedCurrency}
        onChange={(value) => {
          setSelectedCurrency(value);
        }}
        options={CURRENCIES.map((currency) => ({
          value: currency,
          label: CURRENCY_DISPLAY_NAME[currency],
        }))}
      />
    </div>
  );
};

export default WithErrorBoundary(memo(CurrencySelect));
