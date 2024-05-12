import { memo } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";

import { TimeRange } from "../types/common.types";
import useCoinStore from "../store/coinStore";
import WithErrorBoundary from "../hoc/WithErrorBoundary";

const { RangePicker } = DatePicker;

const CoinRangeInput = () => {
  const { selectedRange, setSelectedRange } = useCoinStore();
  return (
    <div className="flex flex-col items-start">
      <h3 className="text-xs mb-2">Time Range</h3>
      <RangePicker
        disabledDate={(current) =>
          current.isBefore(dayjs().subtract(1, "year"))
        }
        value={selectedRange}
        onChange={(dates) => setSelectedRange(dates as TimeRange)}
      />
    </div>
  );
};

export default WithErrorBoundary(memo(CoinRangeInput));
