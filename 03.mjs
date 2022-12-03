import { readFile } from "node:fs/promises";

const lines = (await readFile("./03.txt", { encoding: "UTF8" }))
  .split("\n")
  .filter((row) => row);

const getDuplicate = (arrays) => {
  return [
    ...new Set(
      arrays.shift().filter(function (v) {
        return arrays.every(function (a) {
          return a.indexOf(v) !== -1;
        });
      })
    ),
  ][0];
};

const getPriority = (arrays) => {
  var errorType = getDuplicate(arrays);

  let priority = parseInt(errorType, 36) - 9;

  if (errorType === errorType.toUpperCase()) {
    priority += 26;
  }
  return priority;
};

const groupByThree = ([a, b, c, ...rest]) =>
  [[a, b, c]].concat(rest.length ? groupByThree(rest) : []);

const score = lines.reduce((total, row) => {
  const first = row.slice(0, row.length / 2).split("");
  const second = row.slice(row.length / 2, row.length).split("");

  return total + getPriority([first, second]);
}, 0);

const score2 = groupByThree(lines).reduce(
  (total, group) => total + getPriority(group.map((row) => row.split(""))),
  0
);

console.log(`Answer 1: ${score}`);
console.log(`Answer 2: ${score2}`);
