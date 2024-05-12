import dayjs from "dayjs";
import { getMidNightTimeStamp } from "./time.utils";

describe("timeUtils", () => {
  it("getMidNightTimeStamp returns formatted timestamp at midnight", () => {
    const formattedTimeStamp = getMidNightTimeStamp(dayjs("2018-04-13 19:18"));
    expect(formattedTimeStamp).toEqual(1523577600000);
  });
});
