import { day } from "./day-1.mjs";

const testInput = `
1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
`;

const testInput2 = `
two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
7sevensixseven
`;

describe("day1", () => {
  it("returns the first 2 digits from string", async () => {
    expect(await day(testInput)).toBe(142);
  });
  it("returns also text digits from str", async () => {
    expect(await day(testInput2, { isPartTwo: true })).toBe(358);
  });
});
