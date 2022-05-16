import { DAY2_INPUT } from "../../inputs";

function resolveMagnitude(input: string) {
  return Number(input.replace(/[^0-9]+/, ""));
}

function dive(input: Array<string>) {
  let position = { x: 0, y: 0, aim: 0 };

  function moveSubmarine(input: string) {
    if (input.includes("down")) {
      position.aim = position.aim + resolveMagnitude(input);
    } else if (input.includes("up")) {
      position.aim = position.aim - resolveMagnitude(input);
    } else if (input.includes("forward")) {
      position.x = position.x + resolveMagnitude(input);
      position.y = position.y + position.aim * resolveMagnitude(input);
    }
  }

  input.forEach((item) => moveSubmarine(item));

  const result = position.x * position.y;
  return result;
}

console.log(dive(DAY2_INPUT)); // 1281977850 CORRECT

export { dive };
