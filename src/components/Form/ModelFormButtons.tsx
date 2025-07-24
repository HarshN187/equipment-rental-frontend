import React from "react";

interface Props {
  onClose: () => void;
  isSubmitting: boolean;
}

function ModelFormButtons({ onClose, isSubmitting }: Props) {
  return (
    <div>
      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

export default ModelFormButtons;
