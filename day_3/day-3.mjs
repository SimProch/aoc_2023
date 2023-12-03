import { fetchData } from "../fetch-data.mjs";

const getData = async (data = "") => {
  if (!data) {
    data = await fetchData({ day: 3 });
  }

  return data.split("\n").filter(Boolean);
};

export const day = async (unformatted, isPartTwo = false) => {
  const data = await getData(unformatted);
  const grid = data.map((i) => i.split(""));
  const numberInfo = getNumbersInGrid(grid);
  const { result: numbersAdjacentToSymbol, starSymbols } =
    getNumbersAdjacentToSymbols(grid, numberInfo);
  if (!isPartTwo) {
    return numbersAdjacentToSymbol.reduce((x, y) => x + parseInt(y.number), 0);
  }
  const values = Object.values(starSymbols);
  return values.reduce((x, y) => {
    if (y.length !== 2) return x;
    return x + y.reduce((x, y) => x * parseInt(y.number), 1);
  }, 0);
};

const getNumbersInGrid = (arr) => {
  const numbers = arr.map((row, rowIndex) => {
    const numbersInLine = [];
    let number = "";
    let startIndex;
    row.forEach((cell, index) => {
      const num = parseInt(cell);
      if (!isNaN(num)) {
        startIndex = startIndex ?? index;
        number += cell;
        return;
      }

      if (number) {
        const numberInfo = {
          number,
          endIndex: index - 1,
          startIndex: startIndex,
          rowIndex,
        };
        number = "";
        startIndex = undefined;
        numbersInLine.push(numberInfo);
      }
    });
    if (number) {
      const numberInfo = {
        number,
        endIndex: row.length - 1,
        startIndex: startIndex,
        rowIndex,
      };
      number = "";
      startIndex = undefined;
      numbersInLine.push(numberInfo);
    }
    return numbersInLine;
  });
  return numbers.flat();
};

const getNumbersAdjacentToSymbols = (grid, numberInfo) => {
  const result = [];
  const starSymbols = {};

  numberInfo.forEach((number) => {
    const { endIndex, startIndex, rowIndex } = number;
    const columnStart = startIndex - 1;
    const columnEnd = endIndex + 1;
    const rowStart = rowIndex - 1;
    const rowEnd = rowIndex + 1;

    const potentialPreviousSymbol = grid[rowIndex]?.[columnStart];
    if (isSymbol(potentialPreviousSymbol)) {
      result.push(number);
      if (potentialPreviousSymbol === "*") {
        const key = `${rowIndex}${columnStart}`;
        starSymbols[key] ??= [];
        starSymbols[key].push(number);
      }
      return;
    }
    const potentialNextSymbol = grid[rowIndex]?.[columnEnd];
    if (isSymbol(potentialNextSymbol)) {
      result.push(number);
      if (potentialNextSymbol === "*") {
        const key = `${rowIndex}${columnEnd}`;
        starSymbols[key] ??= [];
        starSymbols[key].push(number);
      }
      return;
    }

    for (let i = columnStart; i <= columnEnd; i++) {
      const potentialPreviousRowSymbol = grid[rowStart]?.[i];
      const previousRowHasSymbol = isSymbol(potentialPreviousRowSymbol);

      if (previousRowHasSymbol) {
        result.push(number);
        if (potentialPreviousRowSymbol === "*") {
          const key = `${rowStart}${i}`;
          starSymbols[key] ??= [];
          starSymbols[key].push(number);
        }
        return;
      }

      const potentialNextRowSymbol = grid[rowEnd]?.[i];
      const nextRowHasSymbol = isSymbol(potentialNextRowSymbol);
      if (nextRowHasSymbol) {
        result.push(number);
        if (potentialNextRowSymbol === "*") {
          const key = `${rowEnd}${i}`;
          starSymbols[key] ??= [];
          starSymbols[key].push(number);
          return;
        }
      }
    }
  });

  return { result, starSymbols };
};

const isSymbol = (char) => {
  if (char == null) return false;
  const zeroCharCode = "0".charCodeAt(0);
  const nineCharCode = "9".charCodeAt(0);
  const dotCharCode = ".".charCodeAt(0);
  const currentCharCode = char.charCodeAt(0);
  if (currentCharCode > zeroCharCode && currentCharCode < nineCharCode)
    return false;
  if (currentCharCode === dotCharCode) return false;
  return true;
};

(async () => {
  const first = await day(undefined);
  const second = await day(undefined, true);
  console.log(first);
  console.log(second);
})();
