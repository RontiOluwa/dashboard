import React, { ChangeEvent } from "react";

type SelectProps = {
  value: string;
  items: string[];
  className: string;
  func: (value: string) => void
};

function Select({ value, items, className, func }: SelectProps) {
  const handleInputChange = (e: ChangeEvent<HTMLSelectElement>) => {
    func(e.target.value);
  };

  return (
    <select value={value} className={className} onChange={handleInputChange}>
      {items.map((item, i) => (
        <option value={item} key={i}>
          {item.toUpperCase()}
        </option>
      ))}
    </select>
  );
}

export default Select;
