import { Link } from 'react-router-dom';

const MasterData = () => {
  // Demo cards data (keeping as is per your request)
  const cardData = [
    { id: 1, title: 'Lead Status', description: 'Indicates the current stage or progress of the lead in the sales process.', image_path: '/icons/status.svg', route: '/lead-status' },
    { id: 2, title: 'Lead Source', description: 'Identifies where the lead came from—useful for tracking marketing effectiveness.', image_path: '/icons/coding.svg', route: '/lead-source' },
    { id: 3, title: 'Lead Potential', description: 'Estimates the business value or conversion likelihood of the lead.', image_path: '/icons/progress.svg', route: '/lead-potential' },
    { id: 4, title: 'Industry', description: 'Categorizes the business based on its primary economic activity.', image_path: '/icons/industrial-park.svg', route: '/industry' }, // Corrected description for Industry
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 p-6 sm:p-8 font-sans antialiased">
      <div className="max-w-7xl mx-auto"> {/* Max width and center for larger screens */}
        <h1 className="text-4xl font-extrabold text-gray-800 mb-12 leading-tight">
          Masters
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cardData.map(card => (
            <Link
              to={card.route}
              key={card.id}
              className="block h-full group" // 'block' makes the whole area clickable, 'h-full' ensures equal height, 'group' for hover effects
            >
              <div className="
                h-full flex flex-col justify-between // Ensure content pushes down and card fills height
                bg-white
                rounded-2xl // Slightly more rounded corners
                shadow-md // Softer initial shadow
                hover:shadow-xl // More pronounced shadow on hover
                transition-all duration-300 ease-in-out // Smooth transitions
                transform group-hover:-translate-y-1 // Subtle lift effect on hover
                p-6 // Increased padding for more breathing room
                border border-gray-200
              ">
                <div className="flex items-start mb-4"> {/* Aligned icon and title */}
                  {/* Icon */}
                  <img src={card.image_path} alt={`${card.title} icon`} className="w-10 h-10 mr-4 flex-shrink-0" />

                  {/* Title */}
                  <h2 className="text-xl font-bold text-gray-900 leading-tight">
                    {card.title}
                  </h2>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed"> {/* Increased line height for readability */}
                  {card.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MasterData;