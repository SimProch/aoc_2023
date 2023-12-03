import { day } from "./day-3.mjs";

const testInput = `
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
.../...*..
.664...598
`;

describe("day3", () => {
  it("should return sum of all numbers adjacent to symbols", async () => {
    const result = await day(testInput, false)
    expect(result).toBe(4361);
  })
  it("should return multiple of gears", async () => {
    const result = await day(testInput, true)
    expect(result).toBe(467835);
  })
});
