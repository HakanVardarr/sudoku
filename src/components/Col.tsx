import { useState } from "react";
import "./styles/col.css";

type Props = {
  value: number;
  answer: number;
  life: number;
  onLifeChange: (newLife: number) => void;
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

export function Col({ value, answer, life, onLifeChange }: Props) {
  let [colValue, setColValue] = useState(value);
  return (
    <input
      type="tel"
      name={value.toLocaleString()}
      className="col"
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
}
