import { DAY3_INPUT, DAY3_INPUT_EXAMPLE } from "../../inputs/day3";
import { arrayFrom } from "../utils";

function resolveBinaries(
  method: "MOST_COMMON" | "LEAST_COMMON",
  input: Array<string>
) {
  let count0 = input.filter((item) => item === "0").length;
  let count1 = input.filter((item) => item === "1").length;

  if (method === "MOST_COMMON") {
    if (count1 >= count0) {
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

  function getRating(method: "MOST_COMMON" | "LEAST_COMMON") {
    let validBinaries = input;

    arrayFrom(binaryLength).forEach((_, i) => {
      if (validBinaries.length === 1) {
        return;
      }

      const binaryValues = validBinaries.map((binary) => binary[i]);
      const mostOccuringValue = resolveBinaries(method, binaryValues);

      validBinaries = validBinaries.filter(
        (binary) => binary[i] === mostOccuringValue
      );
    });

    const rating = parseInt(validBinaries[0], 2);

    return rating;
  }

  const oxygenGeneratorRating = getRating("MOST_COMMON");
  const co2ScrubberRating = getRating("LEAST_COMMON");

  const lifeSupportRating = oxygenGeneratorRating * co2ScrubberRating;

  return lifeSupportRating;
}

console.log(binaryDiagnostic(DAY3_INPUT_EXAMPLE)); // 230
console.log(binaryDiagnostic(DAY3_INPUT)); // 1662846 CORRECT

export { binaryDiagnostic };
