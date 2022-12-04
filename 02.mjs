import { readFile } from "node:fs/promises";

const lines = (await readFile("./02.txt", { encoding: "UTF8" }))
  .split("\n")
  .filter((line) => line);

const rock = ["A", "X"];
const paper = ["B", "Y"];
const scissors = ["C", "Z"];

const scoreMap = {
  X: 0,
  Y: 3,
  Z: 6,
};

const game1 = [
  [...rock, (x) => scissors.includes(x)],
  [...paper, (x) => rock.includes(x)],
  [...scissors, (x) => paper.includes(x)],
];

const getIndex = (input) =>
  game1.findIndex(([first, second]) => input === first || input === second);

const totalScore = lines.reduce((score, row) => {
  const [a, b] = row.split(" ");
  const i1 = getIndex(a);
  const i2 = getIndex(b);

  return (
    score +
    (i1 === i2
      ? scoreMap["Y"]
      : game1[i2][2](a)
      ? scoreMap["Z"]
      : scoreMap["X"]) +
    (i2 + 1)
  );
}, 0);

const game2 = [
  [rock[0], 3, 1, 2],
  [paper[0], 1, 2, 3],
  [scissors[0], 2, 3, 1],
];

const totalScore2 = lines.reduce((score, row) => {
  const [a, b] = row.split(" ");
  const selected = game2.find(([f]) => f === a);

  return score + scoreMap[b] + selected[Object.keys(scoreMap).indexOf(b) + 1];
}, 0);

console.log(`Answer 1: ${totalScore}`);
console.log(`Answer 2: ${totalScore2}`);
