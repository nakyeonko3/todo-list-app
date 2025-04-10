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
    <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
      <label htmlFor={inputId} className="text-gray-500 mr-2 sr-only">
        {label}
      </label>
      <input
        id={inputId}
        name={name}
        type="text"
        className="bg-transparent border-none outline-none flex-grow"
        placeholder={placeholder}
      />
    </div>
  );
}
