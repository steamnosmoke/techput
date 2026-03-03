import useAuthInputs from "../config/inputs";

export default function AuthInputs() {

  const inputs = useAuthInputs();

  return (
    <ul className="list flex flex-col gap-4 max-w-150 w-full">
      {inputs.map((el) => (
        <li key={el.label} className="relative">
          <label
            htmlFor={el.label}
            className="capitalize absolute left-4 top-2 text-[14px] cursor-text"
          >
            {el.label}
          </label>
          <input
            className="pt-8 px-4 pb-2 border border-stone-300 rounded-lg max-w-150 w-full placeholder:text-stone-500 transition-all duration-200 hover:border-black"
            type={el.type}
            name={el.label}
            placeholder={el.placeholder}
            id={el.label}
            value={el.value}
            onChange={(e) => el.func(e.target.value)}
          />
        </li>
      ))}
    </ul>
  );
}
