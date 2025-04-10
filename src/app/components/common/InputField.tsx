import { useId } from "react";

export function InputField({
  placeholder = "검색어를 입력하세요",
  label,
  name,
}: {
  label: string;
  name: string;
  placeholder?: string;
}) {
  const inputId = `${name}-${useId()}`;
  return (
    <div className="w-full h-[52px] px-6 py-3 rounded-full bg-slate-100 border-2 border-slate-900 flex items-center relative">
      <label htmlFor={inputId} className="text-gray-500 mr-2 sr-only">
        {label}
      </label>
      <input
        id={inputId}
        name={name}
        type="text"
        className="bg-transparent border-none outline-none w-full relative"
        placeholder={placeholder}
      />
      <div className="w-full text-base h-[52px] rounded-full absolute left-1 top-0.5 border bg-slate-900 border-slate-900 -z-10"></div>
    </div>
  );
}
