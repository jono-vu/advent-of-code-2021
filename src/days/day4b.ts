import { DAY4_INPUT, DAY4_INPUT_EXAMPLE } from "../../inputs";

type Cell = { marked: boolean; value: number };
type Row<T> = Array<T>;

type Board = Array<Row<number>>;
type VirtualBoard = Array<Row<Cell>>;

function giantSquidBingo(input: { draw: Array<number>; boards: Array<Board> }) {
  const { draw, boards } = input;

  let currentDrawIndex = 0;
  let virtualBoards: Array<VirtualBoard> = boards.map((board) => {
    const virtualBoard = board.map((row) =>
      row.map((value) => ({ marked: false, value }))
    );

    return virtualBoard;
  });
  let boardsThatHaveWon: Array<number> = [];
  let score = 0;

  function updateVirtualBoards(currentDraw: number) {
    virtualBoards = virtualBoards.map((board) =>
      board.map((row) =>
        row.map(({ marked, value }) => {
          if (value === currentDraw) {
            return {
              marked: true,
              value,
            } as Cell;
          } else {
            return {
              marked,
              value,
            };
          }
        })
      )
    );
  }

  function getScore(virtualBoard: VirtualBoard) {
    const winningDraw = draw[currentDrawIndex];

    const unmarkedNumbers = virtualBoard
      .map((row) =>
        row
          .map((cell) => (cell.marked ? null : cell.value))
          .filter((item) => item !== null)
      )
      .flat(2) as Array<number>;
    const sumUnmarkedNumbers = unmarkedNumbers.reduce(
      (prev, nextValue) => prev + nextValue,
      0
    );

    const winningScore = sumUnmarkedNumbers * winningDraw;
    return winningScore;
  }

  function checkBoardWin(currentDraw: number) {
    updateVirtualBoards(currentDraw);

    virtualBoards.forEach((board, boardNumber) => {
      if (boardsThatHaveWon.includes(boardNumber)) return;

      function checkColumnsWin() {
        const defaultRow = board[0];

        defaultRow.forEach((_, i) => {
          const isColumnFilled = !board.some((row) => row[i].marked === false);

          if (isColumnFilled) {
            boardsThatHaveWon.push(boardNumber);
            score = getScore(
              virtualBoards[boardsThatHaveWon[boardsThatHaveWon.length - 1]]
            );

            return;
          }
        });
      }

      function checkRowsWin() {
        board.forEach((row) => {
          const isRowFilled = !row.some((cell) => cell.marked === false);

          if (isRowFilled) {
            boardsThatHaveWon.push(boardNumber);
            score = getScore(
              virtualBoards[boardsThatHaveWon[boardsThatHaveWon.length - 1]]
            );

            return;
          }
        });
      }

      checkColumnsWin();
      checkRowsWin();
    });

    currentDrawIndex = currentDrawIndex + 1;
  }

  draw.forEach((currentDraw) => {
    checkBoardWin(currentDraw);
  });

  return score;
}

console.log(giantSquidBingo(DAY4_INPUT)); // 2730 CORRECT

export { giantSquidBingo };
