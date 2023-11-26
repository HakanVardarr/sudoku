interface SudokuBoard {
  get(x: number, y: number): number;
  set(x: number, y: number, num: number): void;
  isSafe(row: number, col: number, num: number): boolean;
}

export class Sudoku implements SudokuBoard {
  board: Uint8Array;

  constructor(initialState: string) {
    if (initialState.length !== 81)
      throw new Error("ERROR: Input strings length needs to be 81.");

    let board = new Uint8Array(81);

    let i = 0;
    for (let c of initialState) {
      let number = c.charCodeAt(0) - 48;
      if (number <= 9 && number >= 0) {
        board[i] = number;
        i++;
      } else {
        throw new Error("ERROR: Invalid input.");
      }
    }

    this.board = board;
  }

  get(x: number, y: number): number {
    return this.board[x * 9 + y];
  }

  set(x: number, y: number, num: number): void {
    this.board[x * 9 + y] = num;
  }

  isSafe(row: number, col: number, num: number): boolean {
    for (let x = 0; x < 9; x++) {
      if (this.get(col, x) === num || this.get(x, row) === num) {
        return false;
      }
    }

    let sr = row - (row % 3);
    let sc = col - (col % 3);

    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 3; x++) {
        if (this.get(y + sc, x + sr) === num) {
          return false;
        }
      }
    }

    return true;
  }
}

export class SudokuSolver<T extends SudokuBoard> {
  solve(sudoku: T): void {
    this._solve(0, 0, sudoku);
  }

  private _solve(row: number, col: number, sudoku: T): boolean {
    if (row == 9) {
      return true;
    } else if (col == 9) {
      return this._solve(row + 1, 0, sudoku);
    } else if (sudoku.get(col, row) !== 0) {
      return this._solve(row, col + 1, sudoku);
    } else {
      for (let num = 0; num < 10; num++) {
        if (sudoku.isSafe(row, col, num)) {
          sudoku.set(col, row, num);
          if (this._solve(row, col + 1, sudoku)) return true;
        }
        sudoku.set(col, row, 0);
      }
      return false;
    }
  }
}
