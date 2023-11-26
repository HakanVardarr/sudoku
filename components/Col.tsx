import { useState } from "react";
import "./styles/col.css";

type Props = {
  value: number;
  answer: number;
  life: number;
  onLifeChange: (newLife: number) => void;
};

export function Col({ value, answer, life, onLifeChange }: Props) {
  let [colValue, setColValue] = useState(value);
  return (
    <input
      name={value.toLocaleString()}
      className="col"
      value={colValue === 0 ? " " : colValue}
      onChange={(e) => {
        let inputValue = +e.target.value as number;
        if (
          inputValue > 0 &&
          inputValue <= 9 &&
          colValue + inputValue <= 9 &&
          colValue + inputValue > 0
        ) {
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
      }}
    />
  );
}
