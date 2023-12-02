import { fetchData } from "../fetch-data.mjs";

const getData = async (data = "") => {
  if (!data) {
    data = await fetchData({ day: 1 });
  }
  return data.split("\n").filter(Boolean);
};

const day1 = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => i.toString());
const day2 = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];
const stringToNumeric = {};
day2.forEach((x, i) => {
  stringToNumeric[x] = day1[i];
  stringToNumeric[day1[i]] = day1[i];
});

export const day = async (
  unformatted,
  { isPartTwo } = { isPartTwo: false }
) => {
  const data = await getData(unformatted);
  const digitsToFind = !isPartTwo ? day1 : [...day1, ...day2];

  const lineValues = data.map((str) => {
    const sortedDigits = digitsToFind
      .map((digit) => Array.from(str.matchAll(digit)))
      .filter((i) => i.length > 0)
      .flat()
      .sort((x, y) => (x.index > y.index ? 1 : -1));

    const first = stringToNumeric[sortedDigits.at(0)[0]];
    const last = stringToNumeric[sortedDigits.at(-1)[0]];
    return parseInt(`${first}${last}`);
  });

  const result = lineValues.reduce((x, y) => x + y, 0);
  return result;
};

// (async () => {
//   const first = await day("", { isPartTwo: true });
//   console.log(first);
// })();
