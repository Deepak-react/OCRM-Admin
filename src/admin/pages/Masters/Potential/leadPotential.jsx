import React, { useState } from 'react';
import LeadPotentialForm from './Sub-Components/leadPotentialForm';
import { useLeadPotentialController } from './leadPotentialController';
import formatDate from '../../../utils/formatDate';


const LeadPotential = () => {


  //custom hooks for CRUD operations
const { leadPotential, fetchLeadPotential } = useLeadPotentialController();

// To set the company values from the lead status list.
const [selectedCompany, setSelectedCompany] = useState('');
// To control the form visiblity    
const [showForm, setShowForm] = useState(false); 


// Generate an unique list of companies from the lead status response
const companies = [...new Set(leadPotential.map(potential => potential.company.cCompany_name))]; //Changes to companies

// Filter the data based on the dropdown menu else return the whole lead status
const filteredLeadPotential = selectedCompany ? leadPotential.filter(potential => potential.company.cCompany_name === selectedCompany) : 
leadPotential;


  return (
        <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 p-8 font-casuten">


    <div className='p-8 mt-10'>
        <div className="flex gap-4 justify-center sm:justify-end mb-7">
          <select
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            className="bg-gray-300 font-semibold text-black text-sm  px-3 py-1 rounded-xl focus:outline-none "
          >
            <option value="">All Companies</option>
            {companies.map((company, index) => (
              <option key={index} value={company}>
                {company}
              </option>
            ))}
          </select>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition" onClick={()=> setShowForm(true)}>
        + Add lead Potential
        </button>
            
        </div>

    {/* Renders the form according to the state */}
     {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">
            <LeadPotentialForm onClose={() => setShowForm(false)}  onSuccess={fetchLeadPotential}/>
            </div>
        </div>
        )}

    {/* Lead status table */}
<table className="min-w-full border border-gray-300 rounded-xl overflow-hidden shadow-sm">
  <thead className="bg-gray-200 text-gray-700 text-sm uppercase tracking-wider">
    <tr>
      <th className="border px-4 py-3 text-left">S.No</th>
      <th className="border px-4 py-3 text-left">Status name</th>
      <th className="border px-4 py-3 text-left">Company</th>
      <th className="border px-4 py-3 text-left">Created at</th>
    </tr>
  </thead>
  <tbody className="text-sm text-gray-700">
    {filteredLeadPotential.map((potential, index) => (
      <tr
        key={index}
        className="odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition-colors duration-200">
        <td className="border px-4 py-2 font-bold text-gray-500">{index + 1}</td>
        <td className="border px-4 py-2 font-semibold text-gray-500">{potential.clead_name}</td>
        <td className="border px-4 py-2 font-semibold text-gray-500">
          <span className="inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold ">
            {potential.company.cCompany_name}
          </span>
        </td>
        <td className="border px-4 py-2 font-semibold text-gray-500">  {formatDate(potential.dcreated_dt)}</td>
      </tr>
    ))}
  </tbody>
</table>    
    </div>
    </div>
  );
};

export default LeadPotential;
