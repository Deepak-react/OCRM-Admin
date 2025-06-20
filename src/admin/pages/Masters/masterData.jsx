
import { Link } from 'react-router-dom';

const MasterData = ()=>{

// Demo cards data
const cardData = [
  { id: 1, title: 'Lead status', description: 'Indicates the current stage or progress of the lead in the sales process.', image_path: '/icons/status.svg', route: '/lead-status' },
  { id: 2, title: 'Lead source', description: 'Identifies where the lead came from—useful for tracking marketing effectiveness.', image_path: '/icons/coding.svg', route: '/lead-source' },
  { id: 3, title: 'Lead Potential', description: 'Estimates the business value or conversion likelihood of the lead.', image_path: '/icons/progress.svg', route: '/lead-potential' },
  { id: 4, title: 'Industry', description: 'Estimates the business value or conversion likelihood of the lead.', image_path: '/icons/industrial-park.svg', route: '/industry' },
];



    return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 p-8 font-casuten">
        <h1 className="text-3xl font-semi-bold text-gray-600 mb-10 tracking-tight">
        Masters
      </h1> 

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {cardData.map(card => (
            <Link to={card.route} key={card.id}>
           <div className=" h-40  bg-white rounded-xl shadow p-4 border border-gray-200 hover:shadow-lg transition ">
            <div className="flex flex-wrap gap-4">
            <img src={card.image_path} alt="Status" className="w-8 h-8" />
            <h2 className="text-lg font-semibold text-gray-800">{card.title}</h2>
            <p className="text-gray-600 text-sm mt-2">{card.description}</p>
            </div>
        </div>
          </Link>
        ))}
            </div>
        </div>
        
    );
}

export default MasterData;