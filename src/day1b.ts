import { DAY1_INPUT } from "../inputs";

const WINDOW_SIZE = 3;

function arrayFrom(length: number) {
  return Array.from(Array(length - 1).keys());
}

function sonarSweep(input: Array<number>) {
  let counter = 0;

  function windowSum(startIndex: number) {
    return arrayFrom(WINDOW_SIZE).reduce(
      (prev, currentIndex) => prev + input[startIndex + (currentIndex + 1)],
      input[startIndex]
    );
  }

  input.forEach((_, i) => {
    if (windowSum(i) > windowSum(i - 1)) {
      counter = counter + 1;
    }
  });

  return counter;
}

console.log(sonarSweep(DAY1_INPUT)); // 1737 CORRECT
