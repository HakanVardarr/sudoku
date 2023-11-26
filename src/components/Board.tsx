import "./styles/board.css";
import { Row } from "./Row";
import { Sudoku, SudokuSolver } from "./sudokusolver";
import sudokus from "../../sudoku.json";

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const id = getRandomInt(0, 10_000).toString();

let solver = new SudokuSolver();
let sudoku = new Sudoku(
  sudokus["quizzes"][id as keyof (typeof sudokus)["quizzes"]]
);
let board = new Uint8Array(81);
let i = 0;
for (let number of sudoku.board) {
  board[i] = number;
  i++;
}

solver.solve(sudoku);
let answer_board = sudoku.board;

type Props = {
  life: number;
  onLifeChange: (newLife: number) => void;
};

function Board({ life, onLifeChange }: Props) {
  const rows = [];
  for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
    rows.push(
      <Row
        key={rowIndex}
        values={board.slice(rowIndex * 9, (rowIndex + 1) * 9)}
        answer={answer_board.slice(rowIndex * 9, (rowIndex + 1) * 9)}
        life={life}
        onLifeChange={onLifeChange}
      />
    );
  }

  return (
    <>
      <div className="container">
        <h1 className="text">Game ID: {id}</h1>
        <h1 className="text">Life: {life}</h1>
        {rows}
      </div>
    </>
  );
}

export default Board;
