import { Link } from 'react-router-dom';

const MasterData = () => {
  const cardData = [
    { id: 1, title: 'Lead Status', description: 'Indicates the current stage or progress of the lead in the sales process.', image_path: '/icons/status.svg', route: '/lead-status'},
    { id: 2, title: 'Lead Source', description: 'Identifies where the lead came from—useful for tracking marketing effectiveness.', image_path: '/icons/coding.svg', route: '/lead-source' },
    { id: 3, title: 'Lead Potential', description: 'Estimates the business value or conversion likelihood of the lead.', image_path: '/icons/progress.svg', route: '/lead-potential' },
    { id: 4, title: 'Industry', description: 'Categorizes the business based on its primary economic activity.', image_path: '/icons/industrial-park.svg', route: '/industry' }, 
    { id: 5, title: 'Country', description: 'Specifies the nation where the business is located.', image_path: '/icons/industrial-park.svg', route:'/country'},
    { id: 6, title: 'State', description: 'Indicates the state or province of business operation.', image_path: '/icons/industrial-park.svg', route:'/state'},
    { id: 7, title: 'District', description: 'Represents the district within the selected state.', image_path: '/icons/industrial-park.svg', route:'/district'},
    { id: 8, title: 'City', description: 'Identifies the specific city of the business.', image_path: '/icons/industrial-park.svg', route:'/city' },
    { id: 9, title: 'Currency', description: 'Specifies the type of currency used in the business location.', image_path: '/icons/currency.svg', route:'/currency'},

  ];

  return (
    <div className="min-h-screen bg-white p-6 sm:p-8 font-sans antialiased">
      <div className="max-w-7xl mx-auto"> 
        <h1 className="text-4xl font-extrabold text-gray-800 mb-12 leading-tight">
          Masters 
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cardData.map(card => (
            <Link
              to={card.route}
              key={card.id}
              className="block h-full group" 
            > 
              <div className="
                h-full flex flex-col justify-between 
                bg-white
                rounded-2xl 
                shadow-md 
                hover:shadow-xl 
                transition-all duration-300 ease-in-out
                transform group-hover:-translate-y-1 
                p-6 *:
                border border-gray-200v">
                <div className="flex items-start mb-4"> 
                  {/* Icon */}
                  <img src={card.image_path} alt={`${card.title} icon`} className="w-10 h-10 mr-4 flex-shrink-0" />

                  {/* Title */}
                  <h2 className="text-xl font-bold text-gray-900 leading-tight">
                    {card.title}
                  </h2>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed"> 
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