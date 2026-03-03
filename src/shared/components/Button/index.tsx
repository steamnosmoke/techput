export default function Button({
  text,
  twclass,
  onClick,
}: {
  text: string;
  twclass?: string;
  onClick?: () => void;
}) {
  return (
    <button
      className={`min-w-125 cursor-pointer rounded-[70px] border-4 border-orange py-3 px-10 bg-transparent transition-all duration-300 ease-in-out hover:bg-orange text-white text-4xl ${twclass}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
