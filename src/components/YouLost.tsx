import "./styles/youlost.css";

type Props = {
  onClick: (newLife: number) => void;
};

export function YouLost({ onClick }: Props) {
  return (
    <>
      <h1 className="lost">You Lost</h1>
      <button
        className="againBtn"
        onClick={() => {
          onClick(3);
        }}
      >
        Try Again?
      </button>
    </>
  );
}
