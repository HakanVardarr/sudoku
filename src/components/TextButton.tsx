import "./styles/textbutton.css";

type Props = {
  text: string;
  buttonText: string;
  onClick: () => void;
};

export function TextButton({ text, buttonText, onClick }: Props) {
  return (
    <>
      <h1 className="uiText">{text}</h1>
      <button
        className="uiButton"
        onClick={() => {
          onClick();
        }}
      >
        {buttonText}
      </button>
    </>
  );
}
