import type React from "react";

interface Props {
  handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  type?: "submit" | "reset" | "button" | undefined;
  text: string;
}

export default function FormAction({
  // handleSubmit,
  type = "submit",
  text,
}: Props) {
  return (
    <>
      <button
        type={type}
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 "
        // onSubmit={handleSubmit}
      >
        {text}
      </button>
    </>
  );
}
