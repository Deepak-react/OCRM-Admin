import React, { useState } from 'react';
import { useCompanyController } from './companyController';
import CompanyForm from './companyForm';
import { Link } from 'react-router-dom';

// Reusable Company Card
const CompanyGrid = ({
  data
}) => {


  const initial = data.cCompany_name?.charAt(0).toUpperCase() || '?';

  return (
  <Link to={`/company-profile/${data.iCompany_id}`} >
    <div className="bg-white shadow-[0_8px_20px_rgba(0,0,0,0.05)] rounded-2xl p-6 border border-gray-100 transition-transform hover:scale-[1.01]">
      <div className="flex justify-between items-start mb-5">
        <div className="flex items-center gap-3">

          {/* Profile Initial Circle */}
          <div className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-800 font-semibold rounded-full text-lg">
            {initial}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{data.cCompany_name}</h2>
            <p className="text-sm text-gray-500">{data.cWebsite}</p>
          </div>
        </div>


        {/* Status */}
        <span
          className={`text-xs font-medium px-3 py-3 rounded-full  ${
            data.bactive
              ? 'bg-green-400 text-green-700'
              : 'bg-red-400 text-red-600'
          }`}
        >
        </span>
      </div>

      <div className="text-sm text-gray-700 space-y-3 mt-2">
        <div className="flex justify-between border-b pb-2">
          <span className="font-medium text-gray-500">Phone</span>
          <span>{data.iPhone_no}</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="font-medium text-gray-500">Plan</span>
           
                    <span
            className={`text-xs font-medium px-3 py-1 rounded-full ${
                data.pricing_plan.plan_name.toLowerCase() === 'gold'
                ? 'bg-yellow-100 text-yellow-800'
                : data.pricing_plan.plan_name.toLowerCase() === 'silver'
                ? 'bg-gray-100 text-gray-700'
                : data.pricing_plan.plan_name.toLowerCase() === 'bronze'
                ? 'bg-orange-100 text-orange-700'
                : 'bg-blue-100 text-blue-700'
            }`}
            >
            {data.pricing_plan.plan_name}
            </span> 
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-500">City</span>
          <span>{data.city.cCity_name}</span>
        </div>
      </div>
    </div>
    </Link>
  );
};

// Main Component
const Company = () => {
  const [searchQuery, setSearchQuery] = useState('');


      // To control the form visiblity    
      const [showForm, setShowForm] = useState(false); 

      //Function to fetch the company data and to create new company
      const {companyData, fetchAllCompanyData, createCompany} = useCompanyController();


      // to filter the data based on the search
      const filteredData = companyData.filter((company) =>
        `${company.cCompany_name} ${company.cWebsite} ${company.iPhone_no}`.toLowerCase()
          .includes(searchQuery.toLowerCase()) );

  return (
        <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 p-8 font-casuten">

    <div className="p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

      {/* Search Box */}
      <div className="mb-6 sm:basis-3/4">
        <input
          type="text"
          placeholder="Search by name, email or phone"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

       {/* Grid/List Toggle Icons */}
    <div className="flex gap-2 justify-center sm:justify-start">
        <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-100" title="Grid View">
        <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 3h5v5H3V3zm0 9h5v5H3v-5zm9-9h5v5h-5V3zm0 9h5v5h-5v-5z" />
        </svg>
        </button>
        <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-100" title="List View">
        <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 5h14v2H3V5zm0 4h14v2H3V9zm0 4h14v2H3v-2z" />
        </svg>
        </button>
    </div>

        {/* Create Company Button */}
    <div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"onClick={()=> setShowForm(true)}>
        + Add Company
        </button>

        
    {/* Renders the form according to the state */}
     {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">
            < CompanyForm onClose={() => setShowForm(false)}  onSuccess={fetchAllCompanyData}/>
            </div>
        </div>
        )}
    </div>

      </div>


      {/* Grid of Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.length > 0 ? (
          filteredData.map((company, index) => (
            <CompanyGrid
              data={company}
              cardClass="bg-blue-50"
              statusClass="bg-green-100 text-green-800"
              textClass="text-gray-700"
            />
          ))
        ) : (
          <p className="text-gray-500">No companies match your search.</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default Company;
