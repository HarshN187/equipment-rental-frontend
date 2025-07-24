import type { JSX } from "react";
import { type FieldError, type UseFormRegister } from "react-hook-form";

const fixedInputClass =
  "rounded-md  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm";

export interface SelectProps {
  labelText: string;
  labelFor: string;
  name: string;
  register: UseFormRegister<any>;
  defaultValue?: string | number;
  options: Array<{ label: string; value: string | number }> | undefined;
  placeholder: string;
  customClass?: string;
  valueAsNumber?: boolean;
  error: FieldError | undefined;
}

export function Dropdown({
  labelText,
  labelFor,
  name,
  register,
  defaultValue,
  options,
  placeholder,
  customClass,
  valueAsNumber,
  error,
}: SelectProps): JSX.Element {
  return (
    <div className="mt-5 mb-4">
      <label
        htmlFor={labelFor}
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        {labelText}
      </label>
      <div className="relative">
        <select
          id={labelFor}
          defaultValue={defaultValue ? defaultValue : "def"}
          className={fixedInputClass + customClass}
          {...register(name, { valueAsNumber })}
        >
          <option disabled value="def">
            {placeholder}
          </option>
          {options?.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {error && (
        <span className="text-red-500 justify-end">{error.message}</span>
      )}
    </div>
  );
}
