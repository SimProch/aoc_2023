import { fetchData } from "../fetch-data.mjs";

const MAX = {
  red: 12,
  green: 13,
  blue: 14,
};

const CUBE_COLORS = Object.keys(MAX);

const getData = async (data = "") => {
  if (!data) {
    data = await fetchData({ day: 2 });
  }

  return data.split("\n").filter(Boolean);
};

export const day = async (unformatted, isPartTwo = false) => {
  const data = await getData(unformatted);
  const gamesAndPlaysPair = data
    .map((line) => {
      const [game, play] = line.split(":");
      const gameNumber = game.split(" ")[1];
      const plays = play.split(";").map((i) => i.trim());
      return [gameNumber, plays];
    })
    .map(([gameNumber, plays]) => {
      const amountOfPlays = {};
      const fewestPossibleCubes = {
        red: 0,
        green: 0,
        blue: 0,
      };
      let isValid = true;
      plays.forEach((round) => {
        const play2 = round.split(",").map((i) => i.trim());
        play2.forEach((play) => {
          const [amount, color] = play.split(" ");
          const playedColor = CUBE_COLORS.find((col) => color.includes(col));
          amountOfPlays[playedColor] ??= 0;
          amountOfPlays[playedColor] += +amount;
          if (fewestPossibleCubes[playedColor] < +amount) {
            fewestPossibleCubes[playedColor] = +amount;
          }
          if (amount > MAX[color]) isValid = false;
        });
      });

      return { gameNumber, amountOfPlays, isValid, fewestPossibleCubes };
    });

  const partOne = gamesAndPlaysPair.reduce((x, y) => {
    return y.isValid ? x + +y.gameNumber : x;
  }, 0);

  if (!isPartTwo) return partOne;

  return gamesAndPlaysPair.reduce((x, { fewestPossibleCubes }) => {
    const mul = Object.values(fewestPossibleCubes).reduce((x, y) => x * y, 1);
    return x + mul;
  }, 0);
};

// (async () => {
//   const first = await day("", { isPartTwo: true });
//   console.log(first);
// })();
