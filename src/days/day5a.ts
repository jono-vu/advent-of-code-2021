import { DAY5_INPUT, DAY5_INPUT_EXAMPLE } from "../../inputs";
import { arrayFrom } from "../utils";

type PositionInput = Array<number>;
type LineInput = Array<PositionInput>;

function isLineInputHorizontal(lineInput: LineInput) {
  return lineInput[0][1] === lineInput[1][1];
}

function isLineInputVertical(lineInput: LineInput) {
  return lineInput[0][0] === lineInput[1][0];
}

function hydrothermalVenture(input: Array<LineInput>) {
  const allXValues = input
    .map((lineInput) => lineInput.map(([x, y]) => x))
    .flat();

  const allYValues = input
    .map((lineInput) => lineInput.map(([x, y]) => y))
    .flat();

  const boundaries = {
    x: [0, Math.max(...allXValues)],
    y: [0, Math.max(...allYValues)],
  };

  const validVents = input.filter(
    (lineInput) =>
      isLineInputHorizontal(lineInput) || isLineInputVertical(lineInput)
  );

  const ventMap = arrayFrom(boundaries.y[1] + 1).map((row) =>
    arrayFrom(boundaries.x[1] + 1).map((column) => ({
      overlap: 0,
      position: { x: column, y: row },
    }))
  );

  validVents.forEach((lineInput) => {
    const [[x1, y1], [x2, y2]] = lineInput;

    if (isLineInputHorizontal(lineInput)) {
      const isBackwards = x1 > x2;

      if (isBackwards) {
        for (let i = x2; i <= x1; i++) {
          const currentCell = ventMap[y1][i];
          currentCell.overlap = currentCell.overlap + 1;
        }
      } else {
        for (let i = x1; i <= x2; i++) {
          const currentCell = ventMap[y1][i];
          currentCell.overlap = currentCell.overlap + 1;
        }
      }
    }

    if (isLineInputVertical(lineInput)) {
      const isBackwards = y1 > y2;

      if (isBackwards) {
        for (let i = y2; i <= y1; i++) {
          const currentCell = ventMap[i][x1];
          currentCell.overlap = currentCell.overlap + 1;
        }
      } else {
        for (let i = y1; i <= y2; i++) {
          const currentCell = ventMap[i][x1];
          currentCell.overlap = currentCell.overlap + 1;
        }
      }
    }
  });

  let sumTwoOverlaps = 0;

  ventMap.forEach((row) =>
    row.forEach((cell) => {
      if (cell.overlap >= 2) {
        sumTwoOverlaps = sumTwoOverlaps + 1;
      }
    })
  );

  return sumTwoOverlaps;
}

console.log(hydrothermalVenture(DAY5_INPUT_EXAMPLE)); // 5
console.log(hydrothermalVenture(DAY5_INPUT)); // 6225

export { hydrothermalVenture };
