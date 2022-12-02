import { readFile } from "node:fs/promises";

const input = await readFile("./01.txt", { encoding: "UTF8" });

const elfCalories = input
  .split(/\n\n/)
  .map((elf) => elf.split("\n").reduce((sum, val) => Number(val) + sum, 0));

const topThree = elfCalories.sort((a, b) => b - a).slice(0, 3);

console.log(`Answer 1: ${Math.max(...elfCalories)}`);
console.log(`Answer 2: ${topThree.reduce((a, b) => a + b)}`);
