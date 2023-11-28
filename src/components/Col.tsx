import { useState } from "react";
import "./styles/col.css";

type Props = {
  value: number;
  answer: number;
  life: number;
  onLifeChange: (newLife: number) => void;
  colIndex: number;
  rowIndex: number;
};

type ClickEventProps = {
  e: React.ChangeEvent<HTMLInputElement>;
  setColValue: React.Dispatch<React.SetStateAction<number>>;
  onLifeChange: (newLife: number) => void;
  colValue: number;
  answer: number;
  life: number;
};

function checkValue(inputValue: number, colValue: number): boolean {
  return (
    inputValue > 0 &&
    inputValue <= 9 &&
    colValue + inputValue > 0 &&
    colValue + inputValue <= 9
  );
}

function handleClick({
  e,
  setColValue,
  onLifeChange,
  colValue,
  answer,
  life,
}: ClickEventProps) {
  let inputValue = +e.target.value as number;

  if (colValue === answer) {
    return;
  }

  if (checkValue(inputValue, colValue)) {
    setColValue(inputValue);
    if (inputValue === answer) {
      e.target.style.backgroundColor = "green";
    } else {
      e.target.style.backgroundColor = "red";
      let newLife = life - 1;
      onLifeChange(newLife);
    }
  } else if (inputValue === 0) {
    setColValue(0);
    e.target.style.backgroundColor = "";
  }
}

export function Col({
  value,
  answer,
  life,
  onLifeChange,
  colIndex,
  rowIndex,
}: Props) {
  let [colValue, setColValue] = useState(value);
  let clickable = colValue === answer;
  let inputClass = "col";
  let inputDivClass = "col notClickable";

  if (rowIndex === 2 || rowIndex === 5) {
    inputClass = "col borderBottom";
    inputDivClass = "col notClickable  borderBottom";
  }

  if (colIndex === 3 || colIndex == 6) {
    inputClass = "col borderLeft";
    inputDivClass = "col notClickable borderLeft";
    if (rowIndex === 2 || rowIndex === 5) {
      inputClass = "col borderLeft borderBottom";
      inputDivClass = "col notClickable borderLeft borderBottom";
    }
  }

  let inputDiv = <div className={inputDivClass}>{colValue}</div>;
  let input = (
    <input
      type="tel"
      name={value.toLocaleString()}
      className={inputClass}
      value={colValue === 0 ? " " : colValue}
      onChange={(e) => {
        handleClick({
          e,
          setColValue,
          onLifeChange,
          colValue,
          answer,
          life,
        });
      }}
    />
  );

  return <>{clickable ? inputDiv : input}</>;
}
