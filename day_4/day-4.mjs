import { fetchData } from "../fetch-data.mjs";

const getData = async (data = "") => {
  if (!data) {
    data = await fetchData({ day: 4 });
  }

  return data.split("\n").filter(Boolean);
};

export const day = async (unformatted, isPartTwo = false) => {
  const data = await getData(unformatted);
  const cards = data.map((line) => {
    const [card, numbers] = line.split(":");
    const [winning, chance] = numbers
      .split("|")
      .map((i) => i.trim())
      .map((i) => i.split(" "))
      .map((i) => i.filter(Boolean));

    return { card, winning, chance };
  });

  if (!isPartTwo) {
    const points = getNumberOfWinningPoints(cards);
    return points.reduce((x, y) => x + y, 0);
  }

  const cardMap = {};
  cards.forEach((parsedCard) => {
    const { card, winning, chance } = parsedCard;
    const [_, cardNumber] = card.split(" ").filter(Boolean);
    cardMap[cardNumber] = {
      card,
      winning,
      chance,
      count: 1,
    };
  });

  const cardMapAsArray = Object.values(cardMap);
  cardMapAsArray.forEach((parsedCard, index) => {
    const { card, winning, chance, count } = parsedCard;

    const hashMap = {};
    chance.forEach((number) => {
      hashMap[number] = true;
    });
    for (let i = 0; i < count; i++) {
      let winningIndex = index + 1;
      winning.forEach((win) => {
        if (hashMap[win]) {
          if (winningIndex < cardMapAsArray.length) {
            cardMapAsArray[winningIndex].count++;
            winningIndex++;
          }
        }
      });
    }
  });
  return cardMapAsArray.reduce((x,y) => x + parseInt(y.count), 0);
};

const getNumberOfWinningPoints = (cards) => {
  return cards.map((parsedCard) => {
    const { card, winning, chance } = parsedCard;
    const hashMap = {};
    chance.forEach((number) => {
      hashMap[number] = true;
    });
    let result = 0;
    winning.forEach((win) => {
      if (hashMap[win]) {
        if (!result) result = 1;
        else result *= 2;
      }
    });
    return result;
  });
};

const testInput = `
Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
`;


(async () => {
  const second = await day(undefined, true);
  console.log(second);
})();
