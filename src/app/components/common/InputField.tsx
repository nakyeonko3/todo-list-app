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
    <div className="w-full h-12 px-6 py-3 rounded-full bg-slate-100 border border-slate-900 flex items-center relative">
      <div className="w-full h-12 rounded-full absolute left-1 top-1 border bg-slate-900 border-slate-900 -z-10"></div>
      <label htmlFor={inputId} className="text-gray-500 mr-2 sr-only">
        {label}
      </label>
      <input
        id={inputId}
        name={name}
        type="text"
        className="bg-transparent border-none outline-none w-full"
        placeholder={placeholder}
      />
    </div>
  );
}
