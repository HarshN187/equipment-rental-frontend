import React, { type JSX } from "react";

function FormModal(props: { children: React.ReactNode }): JSX.Element {
  return (
    <div>
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default FormModal;
