"use client";

import CheckButton from "@/components/ui/Button/CheckButton";
import Card from "@/components/ui/Card";
import { preventEnterSubmit } from "@/utils/keyboardEventUtils";
import { useState } from "react";

interface TodoHeaderCardProps {
  checkboxName: string;
  textInputName: string;
  initialCompleted: boolean;
  initalText?: string;
  className?: string;
}

export default function TodoNameHeaderCard({
  checkboxName,
  textInputName,
  initialCompleted,
  initalText = "",
  className = "",
}: TodoHeaderCardProps) {
  const [isCompleted, setIsCompleted] = useState(initialCompleted);

  const handleCheckboxChange = (checked: boolean) => {
    setIsCompleted(checked);
  };
  console.log("isCompleted", isCompleted);

  return (
    <Card
      isActive={isCompleted}
      className={`flex justify-center rounded-[20px] ${className}`}
    >
      <CheckButton
        isCompleted={isCompleted}
        onClick={() => handleCheckboxChange(!isCompleted)}
      />
      <label htmlFor={checkboxName} className="sr-only">
        TODO 완료 여부
      </label>
      <input
        type="hidden"
        name="completed"
        value={isCompleted ? "true" : "false"}
      />
      <input
        type="checkbox"
        name={checkboxName}
        checked={isCompleted}
        className="sr-only"
        onChange={() => handleCheckboxChange(!isCompleted)}
        id={checkboxName}
      />
      <label htmlFor={textInputName} className="sr-only">
        TODO 항목 이름
      </label>
      <div className="ml-2" />
      <input
        type="text"
        name={textInputName}
        defaultValue={initalText || ""}
        className="border-0 underline font-bold text-xl w-1/3"
        onKeyDown={preventEnterSubmit}
        id={textInputName}
      />
    </Card>
  );
}
