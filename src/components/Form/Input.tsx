import type { JSX } from "react";
import type { FieldError, UseFormRegister } from "react-hook-form";

const fixedInputClass =
  "rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm";

// type fieldNames = "email" | "password" | "username" | "confirm-password";

// interface DataFields {
//   email: string;
//   password: string;
// }

export interface InputProps {
  labelText: string;
  labelFor: string;
  name: string;
  type: string;
  defaultValue?: string | number;
  register: UseFormRegister<any>;

  placeholder?: string;
  customClass?: string;
  valueAsNumber?: boolean;
  error: FieldError | undefined;
}

export function Input({
  labelText,
  labelFor,
  name,
  type,
  placeholder,
  register,
  defaultValue,
  customClass,
  valueAsNumber,
  error,
}: InputProps): JSX.Element {
  return (
    <>
      <div className="mt-5 mb-4">
        <label
          htmlFor={labelFor}
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          {labelText}
        </label>
        <input
          id={labelFor}
          type={type}
          defaultValue={defaultValue}
          className={fixedInputClass + customClass}
          placeholder={placeholder}
          {...register(name, { valueAsNumber })}
        />
        {error && (
          <span className="text-red-500 justify-end">{error.message}</span>
        )}
      </div>
    </>
  );
}
