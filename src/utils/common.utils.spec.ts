import { getRandomColor } from "./common.utils";

describe("commonUtils", () => {
  it("getRandomColor returns random distinct colors on each call", () => {
    const color1 = getRandomColor();
    const color2 = getRandomColor();
    const color3 = getRandomColor();
    expect(color1).toHaveLength(7);
    expect(color2).toHaveLength(7);
    expect(color3).toHaveLength(7);
    expect(color1).not.toEqual(color2);
    expect(color2).not.toEqual(color3);
  });
});
