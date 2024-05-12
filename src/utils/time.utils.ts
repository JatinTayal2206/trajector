import { Dayjs } from "dayjs";

/**
  The date timestamp returned by antd rangeselect doesn't point to midnight, 
  this util is to get the timestamp in same range as the one returned by coingecko timeseries api.
*/
export const getMidNightTimeStamp = (time: Dayjs) =>
  time?.toDate()?.setUTCHours(0, 0, 0, 0);
