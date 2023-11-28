import "./styles/board.css";
import { Row } from "./Row";
import { Sudoku, SudokuSolver } from "./sudokusolver";
import sudokus from "../../sudoku.json";

const id = getRandomInt(0, 10_000).toString();
const { board, answer_board } = generateSudoku(id);

type Props = {
  life: number;
  onLifeChange: (newLife: number) => void;
};

type GeneratedSudoku = {
  board: Uint8Array;
  answer_board: Uint8Array;
};

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateSudoku(id: string): GeneratedSudoku {
  const solver = new SudokuSolver();
  let sudoku = new Sudoku(
    sudokus["quizzes"][id as keyof (typeof sudokus)["quizzes"]]
  );
  let board = new Uint8Array(sudoku.board);
  solver.solve(sudoku);
  let answer_board = sudoku.board;
  return {
    board,
    answer_board,
  };
}

function rows({ life, onLifeChange }: Props) {
  const rows = [];
  for (let idx = 0; idx < 9; idx++) {
    rows.push(
      <Row
        key={idx}
        values={board.slice(idx * 9, (idx + 1) * 9)}
        answer={answer_board.slice(idx * 9, (idx + 1) * 9)}
        life={life}
        onLifeChange={onLifeChange}
        rowIndex={idx}
      />
    );
  }
  return rows;
}

function Board({ life, onLifeChange }: Props) {
  return (
    <>
      <div className="container">
        <h1 className="text">Game ID: {id}</h1>
        <h1 className="text">Life: {life}</h1>
        {rows({ life, onLifeChange })}
      </div>
    </>
  );
}

export default Board;
