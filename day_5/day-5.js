import { fetchData } from "../fetch-data.mjs";

const getData = async (data = "") => {
  if (!data) {
    data = await fetchData({ day: 5 });
  }

  return data.split("\n").filter(Boolean);
};

export const day = async (unformatted, isPartTwo = false) => {
  const data = await getData(unformatted);
  let { seeds, mapStack } = retrieveMaps(data);

  if (isPartTwo) {
    let finalSeeds = [];
    let result = 0
    for (let i = 0; i < seeds.length; i++) {
      if (i % 2 === 1) continue;
      const seed = parseInt(seeds[i]);
      const count = parseInt(seeds[i + 1]);
      console.memory()
      try {
        for (let j = 0; j < count; j++) {
          finalSeeds.push(j + seed)
        }
      } catch {
        console.memory
      }
    }
    console.log(result);
    seeds = finalSeeds;
    return
  }

  const locations = seeds.map((seed) => {
    return getLocation(seed, mapStack);
  });

  console.log(locations)

  return Math.min(...locations.map((i) => parseInt(i)));
};

export const retrieveMaps = (data) => {
  const mapStack = [];
  let seeds = [];
  data.forEach((line) => {
    if (line.includes("seeds")) {
      seeds = line.split(":")[1].split(" ").filter(Boolean);
      return;
    }
    if (line.includes("to")) {
      mapStack.push([]);
      return;
    }
    const [destinationRange, sourceRange, rangeLength] = line
      .split(" ")
      .filter(Boolean);
    mapStack.at(-1).push({
      sourceRange: parseInt(sourceRange),
      destinationRange: parseInt(destinationRange),
      rangeLength: parseInt(rangeLength),
    });
  });

  mapStack.forEach((stack) =>
    stack.sort((x, y) => x.sourceRange - y.sourceRange)
  );

  return {
    seeds,
    mapStack,
  };
};

const getLocation = (current, mapStack, stackIndex = 0) => {
  const sourceStack = mapStack[stackIndex];
  let sourceIndex =
    sourceStack.findIndex((rangeMap) => rangeMap.sourceRange >= current) - 1;

  if (sourceIndex === -2) sourceIndex = sourceStack.length - 1;
  const source = sourceStack[sourceIndex];

  const isDefined = source !== undefined;
  const isInCurrentRange = () =>
    current < source.rangeLength + source.sourceRange &&
    current >= source.sourceRange;
  const isInRange = isDefined && isInCurrentRange();
  let target;
  if (source && isInRange) {
    const sourceDiff = current - source.sourceRange;
    target = source.destinationRange + sourceDiff;
  } else {
    target = current;
  }

  stackIndex++;
  if (mapStack[stackIndex]) return getLocation(target, mapStack, stackIndex);
  return target;
};

const testInput = `
seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4
`;

(async () => {
  const second = await day(undefined, true);
  console.log(second);
})();