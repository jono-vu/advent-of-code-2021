import { DAY3_INPUT, DAY3_INPUT_EXAMPLE } from "../../inputs/day3";
import { arrayFrom } from "../utils";

function resolveBinaries(
  method: "MOST_COMMON" | "LEAST_COMMON",
  input: Array<string>
) {
  let count0 = input.filter((item) => item === "0").length;
  let count1 = input.filter((item) => item === "1").length;

  if (method === "MOST_COMMON") {
    if (count1 > count0) {
      return "1";
    } else {
      return "0";
    }
  }

  if (method === "LEAST_COMMON") {
    if (count1 < count0) {
      return "1";
    } else {
      return "0";
    }
  }
}

function binaryDiagnostic(input: Array<string>) {
  const binaryLength = input[0].length;

  function getRate(method: "MOST_COMMON" | "LEAST_COMMON") {
    const binaryArray = arrayFrom(binaryLength).map((_, i) => {
      const binaryValues = input.map((binary) => binary[i]);

      return resolveBinaries(method, binaryValues);
    });

    const rate = parseInt(binaryArray.join(""), 2);

    return rate;
  }

  const gammaRate = getRate("MOST_COMMON");
  const epsilonRate = getRate("LEAST_COMMON");

  const powerConsumption = gammaRate * epsilonRate;

  return powerConsumption;
}

console.log(binaryDiagnostic(DAY3_INPUT_EXAMPLE)); // 198
console.log(binaryDiagnostic(DAY3_INPUT)); // 2954600 CORRECT

export { binaryDiagnostic };
