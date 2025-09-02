// components/NextDayButton.tsx
type Props = { text: string, onNext: () => void };

export default function NextDayButton({ text, onNext }: Props) {
  return (
    <button onClick={onNext}>
      {text}
    </button>
  );
}
