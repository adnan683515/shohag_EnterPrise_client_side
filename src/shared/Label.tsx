import React from "react";

type LabelProps = {
  text: string;
  htmlFor?: string;
  required?: boolean;
  className?: string;
};

const Label: React.FC<LabelProps> = ({
  text,
  htmlFor,
  required = false,
  className = "",
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-sm font-medium text-gray-700 mb-1 ${className}`}
    >
      {text}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
};

export default Label;
