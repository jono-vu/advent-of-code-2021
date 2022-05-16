import { DAY2_INPUT } from "../inputs";

function resolveDistance(input: string) {
  return Number(input.replace(/[^0-9]+/, ""));
}

function dive(input: Array<string>) {
  let position = { x: 0, y: 0 };

  function moveSubmarine(input: string) {
    if (input.includes("forward")) {
      position.x = position.x + resolveDistance(input);
    } else if (input.includes("up")) {
      position.y = position.y - resolveDistance(input);
    } else if (input.includes("down")) {
      position.y = position.y + resolveDistance(input);
    }
  }

  input.forEach((item) => moveSubmarine(item));

  const result = position.x * position.y;
  return result;
}

console.log(dive(DAY2_INPUT)); // 1714950 CORRECT
