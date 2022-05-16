import { DAY3_INPUT } from "../../inputs/day3";
import { arrayFrom } from "../utils";

function resolveBinaries(method: "MOST" | "LEAST", input: Array<string>) {
  let count0 = input.filter((item) => item === "0").length;
  let count1 = input.filter((item) => item === "1").length;

  if (method === "MOST") {
    if (count1 > count0) {
      return "1";
    } else {
      return "0";
    }
  }

  if (method === "LEAST") {
    if (count1 < count0) {
      return "1";
    } else {
      return "0";
    }
  }
}

function binaryDiagnostic(input: Array<string>) {
  const binaryLength = input[0].length;

  const gammaRate = arrayFrom(binaryLength)
    .map((_, i) => {
      const binaryValues = input.map((binary) => binary[i]);

      return resolveBinaries("MOST", binaryValues);
    })
    .join("");

  const epsilonRate = arrayFrom(binaryLength)
    .map((_, i) => {
      const binaryValues = input.map((binary) => binary[i]);

      return resolveBinaries("LEAST", binaryValues);
    })
    .join("");

  const powerConsumption = parseInt(gammaRate, 2) * parseInt(epsilonRate, 2);
  return powerConsumption;
}

console.log(binaryDiagnostic(DAY3_INPUT)); // 2954600 CORRECT

export { binaryDiagnostic };
