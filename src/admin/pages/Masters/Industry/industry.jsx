import React, { useState } from 'react';
import { useIndustryController } from './industryController';
import IndustryForm from './Sub-Components/industryFormData';


const LeadPotential = () => {


  //custom hooks for CRUD operations
const { industries, fetchIndustryData } = useIndustryController();

// To control the form visiblity    
const [showForm, setShowForm] = useState(false); 


  return (
        <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 p-8 font-casuten">


    <div className='p-8 mt-10'>
        <div className="flex gap-4 justify-center sm:justify-end mb-7">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition" onClick={()=> setShowForm(true)}>
        + Add lead industry
        </button>
            
        </div>

    {/* Renders the form according to the state */}
     {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">
            <IndustryForm onClose={() => setShowForm(false)}  onSuccess={fetchIndustryData}/>
            </div>
        </div>
        )}

    {/* Lead status table */}
<table className="min-w-full border border-gray-300 rounded-xl overflow-hidden shadow-sm">
  <thead className="bg-gray-200 text-gray-700 text-sm uppercase tracking-wider">
    <tr>
      <th className="border px-4 py-3 text-left">S.No</th>
      <th className="border px-4 py-3 text-left">Lead Industry</th>
      <th className="border px-4 py-3 text-left">Id</th>
    </tr>
  </thead>
  <tbody className="text-sm text-gray-700">
    {industries.map((industry, index) => (
      <tr
        key={index}
        className="odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition-colors duration-200">
        <td className="border px-4 py-2 font-bold text-gray-500">{index + 1}</td>
        <td className="border px-4 py-2 font-semibold text-gray-500">{industry.cindustry_name}</td>
        <td className="border px-4 py-2 font-bold text-gray-500">{industry.iindustry_id}</td>

      </tr>
    ))}
  </tbody>
</table>    
    </div>
    </div>
  );
};

export default LeadPotential;
