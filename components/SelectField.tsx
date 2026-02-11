import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface Props {
  label: string;
  items: string[];
  placeholder: string;
  mandatory?: boolean;
  value: string;
}

const SelectField = ({ label, items, placeholder, mandatory = false, value }: Props) => {
  return (
    <div>
      <div className="text-neutral-700">
        <label className="block text-sm font-medium mb-2">
          {label} {mandatory ? "*" : ""}
        </label>
        <Select value={value}>
          <SelectTrigger className="w-full mb-2 p-4 rounded-2xl py-7">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {items.map((item, key) => (
                <SelectItem value={item.toLowerCase()} key={key}>{item}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SelectField;
