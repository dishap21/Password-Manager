import React from "react";
import PassCard from "./PassCard";

export default function OverlayForm({ isVisible, onClose }) {
  if (!isVisible) {
    return null;
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="relative w-1/2 md:w-1/4 bg-white p-6 rounded shadow-lg">
        <div className="w-full rounded-sm bg-slate-500">
          <button
            className="p-4 text-xl absolute top-0 right-0 m-2 text-gray-900"
            onClick={onClose}
          >
            &#10005; {/* X symbol */}
          </button>
        </div>
        <PassCard />
      </div>
    </div>
  );
}
