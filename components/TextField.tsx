import React from "react";

interface Props {
    label: string;
    type: string;
    placeholder: string;
    mandatory?: boolean;
    value: string
}

const TextField = ({ label, type, placeholder, mandatory = false, value }: Props) => {

  return (
    <div>
      <div className="text-neutral-700">
        <label className="block text-sm font-medium mb-2">{label} { mandatory ? "*" : "" }</label>
        <input
          value={value}
          type={type}
          placeholder={placeholder}
          className="w-full p-4 border rounded-2xl bg-gray-50"
        />
      </div>
    </div>
  );
};

export default TextField;
