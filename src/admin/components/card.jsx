import React from 'react';

function Card({ title, count, iconUrl, bgColor = 'bg-gradient-to-br from-blue-100 to-white' }) {
  return (
    <div className={`shadow-lg rounded-3xl p-6 w-full max-w-xs transition duration-300 ${bgColor} border-t-4 border-blue-500`}>
      <div className="flex items-center justify-between gap-4">
        {/* Text Section */}
        <div className="flex-1">
          <div className="text-gray-900 text-3xl font-bold leading-tight">
            {count}
          </div>
          <h3 className="text-sm font-semibold text-gray-700 mt-2">{title}</h3>
        </div>

        {/* Icon Section */}
        <div className="w-16 h-16 bg-transparent  flex items-center justify-center">
          <img
            src={iconUrl}
            alt="Card Icon"
            className="w-10 h-10 object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default Card;
