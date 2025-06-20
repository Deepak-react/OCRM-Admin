import React, { useState } from 'react';
import LeadSourceForm from './Sub-Components/leadSourceForm';
import { useLeadSourceController } from './leadSourceController';
import formatDate from '../../../utils/formatDate';


const LeadSource = () => {

  //custom hooks for CRUD operations
const { leadSource, fetchLeadSource } = useLeadSourceController();

// To set the company values from the lead status list.
const [selectedCompany, setSelectedCompany] = useState('');

// To control the form visiblity    
const [showForm, setShowForm] = useState(false); 


// Generate an unique list of companies from the lead status response
const companies = [...new Set(leadSource.map(source => source.company.cCompany_name))]; //Changes to companies

// Filter the data based on the dropdown menu else return the whole lead status
const filteredleadSource = selectedCompany ? leadSource.filter(source => source.company.cCompany_name === selectedCompany) : 
leadSource;


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
        + Add lead source
        </button>
            
        </div>

    {/* Renders the form according to the state */}
     {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">
            <LeadSourceForm onClose={() => setShowForm(false)}  onSuccess={fetchLeadSource}/>
            </div>
        </div>
        )}

    {/* Lead status table */}
<table className="min-w-full border border-gray-300 rounded-xl overflow-hidden shadow-sm">
  <thead className="bg-gray-200 text-gray-700 text-sm uppercase tracking-wider">
    <tr>
      <th className="border px-4 py-3 text-left">S.No</th>
      <th className="border px-4 py-3 text-left">Source name</th>
      <th className="border px-4 py-3 text-left">Company</th>
      <th className="border px-4 py-3 text-left">Description</th>
      <th className="border px-4 py-3 text-left">Created at</th>
    </tr>
  </thead>
  <tbody className="text-sm text-gray-700">
    {filteredleadSource.map((source, index) => (
      <tr
        key={index}
        className="odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition-colors duration-200">
        <td className="border px-4 py-2 font-bold text-gray-500">{index + 1}</td>
        <td className="border px-4 py-2 font-semibold text-gray-500">{source.source_name}</td>
        <td className="border px-4 py-2 font-semibold text-gray-500">
          <span className="inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold ">
            {source.company.cCompany_name}
          </span>
        </td>
        <td className="border px-4 py-2 font-semibold text-gray-500">{source.description || "None"}</td>
        <td className="border px-4 py-2 font-semibold text-gray-500">  {formatDate(source.updated_at)}</td>
      </tr>
    ))}
  </tbody>
</table>    
    </div>
    </div>
  );
};

export default LeadSource;
