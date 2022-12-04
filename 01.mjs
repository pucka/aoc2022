import { readFile } from "node:fs/promises";

const input = (await readFile("./01.txt", { encoding: "UTF8" }))
  .split("\n\n")
  .filter((line) => line);

const sum = (arr) => arr.reduce((a, b) => +a + +b);

const elfCalories = input.map((elf) => sum(elf.split("\n")));
const topThree = elfCalories.sort((a, b) => b - a).slice(0, 3);

console.log(`Answer 1: ${Math.max(...elfCalories)}`);
console.log(`Answer 2: ${sum(topThree)}`);
