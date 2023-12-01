import fetch from "node-fetch";
import { session } from "./cookie.js";
const getUrl = (day) => `https://adventofcode.com/2023/day/${day}/input`;

const fetchData = async ({day}) => {
  const url = getUrl(day);
  const res = await fetch(url, {
    headers: {
      cookie: `session=${session}`,
    },
  });

  const data = await res.text();
  return data;
};

export { fetchData };
