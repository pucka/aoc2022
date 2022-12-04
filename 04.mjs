import { readFile } from "node:fs/promises";

const lines = (await readFile("./04.txt", { encoding: "UTF8" }))
  .split("\n")
  .filter((line) => line);

const inRange = (x, min, max) => (x - min) * (x - max) <= 0;

const isOverlap = (first, second, fn) =>
  fn(
    inRange(first[0], second[0], second[1]),
    inRange(first[1], second[0], second[1])
  ) ||
  fn(
    inRange(second[0], first[0], first[1]),
    inRange(second[1], first[0], first[1])
  );

const nrOfOverlap = lines.reduce((total, line) => {
  const [first, second] = line.split(",").map((pair) => pair.split("-"));
  return isOverlap(first, second, (a, b) => a && b) ? ++total : total;
}, 0);

const nrOfSomeOverlap = lines.reduce((total, line) => {
  const [first, second] = line.split(",").map((pair) => pair.split("-"));
  return isOverlap(first, second, (a, b) => a || b) ? ++total : total;
}, 0);

console.log(`Answer 1: ${nrOfOverlap}`);
console.log(`Answer 2: ${nrOfSomeOverlap}`);
