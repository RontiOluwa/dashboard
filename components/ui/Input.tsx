import React, { ChangeEvent } from "react";

interface InputProps {
  type: string;
  placeholder: string;
  className: string;
  value: string;
  func: (value: string) => void
}

function Input({ type, placeholder, className, value, func }: InputProps) {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    func(e.target.value);
  };
  return <input type={type} placeholder={placeholder} value={value} className={className} onChange={handleInputChange} />;
}

export default Input;
