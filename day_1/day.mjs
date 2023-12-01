import { fetchData } from "../fetch-data.mjs";

const getData = async () => {
  const data = await fetchData({ day: 1 });
  return data;
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
});

export const day = (dailyData, isDayOne = true) => {
  const data = dailyData.split("\n").filter(Boolean);
  const digitsArr = getDigitsArr(data, isDayOne);
  console.log(digitsArr);
  const result = getResult(digitsArr);
  return result;
};

const getDigitsArr = (data, isDayOne = true) => {
  const result = [];
  const digitsToFind = isDayOne ? day1 : [...day1, ...day2];
  data.forEach((str) => {
    const indexDigitPair = [];
    digitsToFind.forEach((digit) => {
      const arr = Array.from(str.matchAll(digit));
      arr.forEach((iterable) => {
        const digit = iterable[0];
        const index = iterable.index;
        const result = isNaN(parseInt(digit))
          ? [index, stringToNumeric[digit]]
          : [index, digit];
        indexDigitPair.push(result);
      });
      indexDigitPair.sort((x, y) => (x[0] > y[0] ? 1 : -1));
    });
    result.push([indexDigitPair[0][1], indexDigitPair.at(-1)[1]]);
  });

  return result;
};

const getResult = (resultNumbers) => {
  const numbers = resultNumbers.map(([first, second]) => {
    return parseInt(`${first}${second}`);
  });

  numbers.forEach((x, i) => {
    if (isNaN[x]) {
      console.log(resultNumbers[i]);
    }
  });
  return numbers.reduce((x, y) => x + y, 0);
};

(async () => {
  const dayData = await getData();
  const first = day(dayData, false);
  console.log(first);
})();
