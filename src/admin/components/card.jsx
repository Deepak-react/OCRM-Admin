import React from 'react';

function Card({ title, count, iconUrl, color = 'bg-blue-500', textColor = 'text-blue-800' }) {
  // Determine text color for the count based on the provided color prop
  // This adds more flexibility than just 'text-gray-900'
  const countTextColor = textColor;

  return (
    <div className={`
      relative
      overflow-hidden
      rounded-xl
      shadow-md
      hover:shadow-lg
      transform hover:-translate-y-1
      transition-all duration-300 ease-in-out
      p-6 sm:p-7
      w-full
      max-w-xs
      border-l-4
      ${color.replace('bg-', 'border-')} // Dynamically apply border color from background color
      ${color.replace('-500', '-50')} // Lighter background for the card body
    `}>
      <div className="flex items-center justify-between gap-4">
        {/* Text Section */}
        <div className="flex-1">
          <div className={`${countTextColor} text-3xl sm:text-4xl font-extrabold leading-tight mb-1`}>
            {count}
          </div>
          <h3 className="text-sm sm:text-base font-semibold text-gray-600 tracking-wide">{title}</h3>
        </div>

        {/* Icon Section */}
        <div className={`
          flex-shrink-0
          w-14 h-14 sm:w-16 sm:h-16
          rounded-full
          flex items-center justify-center
          opacity-90
          ${color} // Use the main color prop for the icon background
          shadow-inner
        `}>
          <img
            src={iconUrl}
            alt={`${title} Icon`}
            className="w-8 h-8 sm:w-10 sm:h-10 object-contain filter brightness-0 invert" // Invert icon color for contrast
          />
        </div>
      </div>
      {/* Optional: Add a subtle overlay for extra depth if desired */}
      {/* <div className="absolute inset-0 bg-black opacity-5 rounded-xl pointer-events-none"></div> */}
    </div>
  );
}

export default Card;