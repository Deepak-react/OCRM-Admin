import React, { useState } from 'react';
import { useCompanyController } from './companyController';
import CompanyForm from './companyForm';
import { Link } from 'react-router-dom';

// ---
// ## Reusable Company Card (CompanyGrid) Enhanced Design
// ---
const CompanyGrid = ({
  data
}) => {
  const initial = data.cCompany_name?.charAt(0).toUpperCase() || '?';

  return (
    <Link to={`/company-profile/${data.iCompany_id}`} className="block h-full"> {/* Ensure link block takes full height */}
      <div className="
        bg-white
        rounded-2xl
        shadow-sm
        hover:shadow-md
        transition-all duration-200 ease-in-out
        transform hover:-translate-y-0.5
        overflow-hidden
        p-7 sm:p-8 {/* More generous padding */}
        border border-gray-200
        flex flex-col {/* Use flexbox for vertical layout */}
        h-full {/* Ensure the div fills the height of the link block */}
      ">
        {/* Top Section: Company Name, Initial, Website */}
        <div className="flex items-start gap-5 mb-6"> {/* Increased gap and margin */}
          {/* Profile Initial Circle */}
          <div className="
            w-14 h-14 flex items-center justify-center
            bg-blue-50 text-blue-700 font-bold rounded-full text-2xl
            flex-shrink-0
            border border-blue-200 {/* Subtle border */}
          ">
            {initial}
          </div>
          <div className="flex-grow"> {/* Allows name/website to take available space */}
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 leading-tight mb-0.5">
              {data.cCompany_name}
            </h2>
            <p className="text-base text-blue-600 hover:underline">{data.cWebsite}</p>
          </div>
        </div>

        {/* Separator Line */}
        <div className="border-t border-gray-100 my-4"></div> {/* Subtle separator */}

        {/* Details Section: Phone, Plan, City */}
        <div className="text-base text-gray-700 flex-grow"> {/* Allows details section to grow */}
          <div className="flex justify-between items-center mb-3"> {/* Consistent spacing */}
            <span className="font-medium text-gray-500">Phone:</span>
            <span className="font-semibold text-gray-800">{data.iPhone_no}</span>
          </div>

          <div className="flex justify-between items-center mb-3">
            <span className="font-medium text-gray-500">Plan:</span>
            <span
              className={`
                text-sm font-bold px-3 py-1.5 rounded-full
                uppercase
                ${
                  data.pricing_plan.plan_name.toLowerCase() === 'gold'
                    ? 'bg-yellow-50 text-yellow-700'
                    : data.pricing_plan.plan_name.toLowerCase() === 'silver'
                    ? 'bg-gray-100 text-gray-700'
                    : data.pricing_plan.plan_name.toLowerCase() === 'bronze'
                    ? 'bg-amber-50 text-amber-700'
                    : 'bg-indigo-50 text-indigo-700'
                }`}
            >
              {data.pricing_plan.plan_name}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-500">City:</span>
            <span className="font-semibold text-gray-800">{data.city.cCity_name}</span>
          </div>
        </div>

        {/* Status Badge at the bottom, aligned to right */}
        <div className="flex justify-end mt-6 pt-4 border-t border-gray-100"> {/* Separated and aligned */}
          <span
            className={`
              text-sm font-semibold px-4 py-2 rounded-full
              uppercase tracking-wide
              ${
                data.bactive
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }
            `}
          >
            {data.bactive ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>
    </Link>
  );
};

// ---
// ## Main Company Page (Company) Enhanced Design
// ---
const Company = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);

  const { companyData, fetchAllCompanyData, createCompany } = useCompanyController();

  const filteredData = companyData.filter((company) =>
    `${company.cCompany_name} ${company.cWebsite} ${company.iPhone_no}`.toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-8 font-sans antialiased"> {/* Clean background, updated font */}
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 tracking-tight">
        Companies <span className="text-blue-600">Overview</span>
      </h1>

      <div className="p-4 bg-white rounded-xl shadow-sm mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Search Box */}
        <div className="flex-grow"> {/* Allows search to take more space */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name, website, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="
                w-full px-4 py-2 pl-10
                border border-gray-300 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                shadow-sm
                placeholder-gray-400 text-gray-700
              "
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
        </div>

        {/* Grid/List Toggle Icons (No functional change, just styling) */}
        <div className="flex gap-2 justify-center sm:justify-start flex-shrink-0">
          <button
            className="
              p-2 border border-gray-300 rounded-lg bg-blue-50 text-blue-600
              hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors
            "
            title="Grid View"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 3h5v5H3V3zm0 9h5v5H3v-5zm9-9h5v5h-5V3zm0 9h5v5h-5v-5z" />
            </svg>
          </button>
          <button
            className="
              p-2 border border-gray-300 rounded-lg text-gray-600
              hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors
            "
            title="List View"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 5h14v2H3V5zm0 4h14v2H3V9zm0 4h14v2H3v-2z" />
            </svg>
          </button>
        </div>

        {/* Create Company Button */}
        <div className="flex-shrink-0">
          <button
            className="
              px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg
              shadow-md hover:bg-blue-700 hover:shadow-lg transition-all
              flex items-center justify-center gap-2
            "
            onClick={() => setShowForm(true)}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            Add Company
          </button>

          {/* Renders the form according to the state (Modal) */}
          {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"> {/* Darker overlay */}
              <div className="
                bg-white p-7 rounded-xl shadow-2xl
                w-full max-w-lg md:max-w-xl lg:max-w-2xl
                transform scale-95 animate-fade-in
              ">
                <CompanyForm onClose={() => setShowForm(false)} onSuccess={fetchAllCompanyData} />
              </div>
            </div>
          )}
        </div>
      </div>


      {/* Grid of Company Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"> {/* Added xl grid column */}
        {filteredData.length > 0 ? (
          filteredData.map((company) => (
            <CompanyGrid
              key={company.iCompany_id} // Added key for list rendering optimization
              data={company}
              // Removed unused props: cardClass, statusClass, textClass
            />
          ))
        ) : (
          <p className="text-gray-600 text-lg text-center col-span-full py-10"> {/* Centered and styled */}
            No companies match your search criteria.
          </p>
        )}
      </div>
    </div>
  );
};

export default Company;