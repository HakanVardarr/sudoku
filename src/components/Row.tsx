import { Col } from "./Col";
import "./styles/row.css";

type Props = {
  values: Uint8Array;
  answer: Uint8Array;
  life: number;
  onLifeChange: (newLife: number) => void;
};

function cols({ values, answer, life, onLifeChange }: Props) {
  const cols = [];
  for (let colIndex = 0; colIndex < 9; colIndex++) {
    cols.push(
      <Col
        key={colIndex}
        value={values[colIndex]}
        answer={answer[colIndex]}
        life={life}
        onLifeChange={onLifeChange}
      ></Col>
    );
  }
  return cols;
}

export function Row(props: Props) {
  return <div className="row">{cols(props)}</div>;
}
