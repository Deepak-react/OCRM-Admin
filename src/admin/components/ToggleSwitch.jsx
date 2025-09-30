import React, { useState } from "react";

function ToggleSwitch() {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => setIsOn(!isOn);

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 focus:outline-none
        ${isOn ? "bg-green-500" : "bg-gray-300"}`}
    >
      {/* Circle */}
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300
          ${isOn ? "translate-x-6" : "translate-x-0"}`}
      ></div>
    </button>
  );
}

export default ToggleSwitch;
