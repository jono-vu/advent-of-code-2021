import { DAY1_INPUT, DAY1_INPUT_EXAMPLE } from "../../inputs";

function sonarSweep(input: Array<number>) {
  let counter = 0;

  input.forEach((_, i) => {
    if (input[i] > input[i - 1]) {
      counter = counter + 1;
    }
  });

  return counter;
}

console.log(sonarSweep(DAY1_INPUT_EXAMPLE)); // 7
console.log(sonarSweep(DAY1_INPUT)); // 1696 CORRECT

export { sonarSweep };
