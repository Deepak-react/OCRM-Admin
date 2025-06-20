import React, { useState } from 'react';
import {  useResellerController} from '../Reseller/resellerController';
import CompanyForm from '../Company/companyForm';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import formatDate from '../../utils/formatDate';
import Card from '../../components/card';

import {
  Chart as ChartJS,
  ArcElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);



// Reusable Company Card
const ResellerGrid = ({
  data
}) => {


  const initial = data.creseller_name?.charAt(0).toUpperCase() || 'U';
  const created_at  = formatDate(data.dCreated_dt);

  return (
<table className="min-w-full border border-gray-300 rounded-xl overflow-hidden shadow-sm mt-10">
  <thead className='bg-gray-200 text-gray-700 text-sm uppercase tracking-wider'>
    <tr>
      <th className="py-3 px-4">Reseller ID</th>
      <th className="py-3 px-4">Name</th>
      <th className="py-3 px-4">Email</th>
      <th className="py-3 px-4">Status</th>
      <th className="py-3 px-4">Created Date</th>
    </tr>
  </thead>
  <tbody>
    {data?.map((reseller) => (
      <Link
        key={reseller.ireseller_id}
        to={`/reseller-profile/${reseller.ireseller_id}`}
        className="contents"
      >
        <tr className="border-b hover:bg-gray-50 cursor-pointer">
          <td className="py-2 px-4 text-center">{reseller.ireseller_id}</td>
          <td className="py-2 px-4 text-center">{reseller.creseller_name || "Unknown"}</td>
          <td className="py-2 px-4 text-center">{reseller.cEmail}</td>
          <td className="py-2 px-4 text-center">
            {reseller.bactive ? (
              <span className="text-green-600 font-semibold ">Active</span>
            ) : (
              <span className="text-red-600 font-semibold">In-active</span>
            )}
          </td>
          <td className="py-2 px-4 text-center">
            {new Date(reseller.dCreated_dt).toLocaleDateString()}
          </td>
        </tr>
      </Link>
    ))}
  </tbody>
</table>
  );
};

// Main Component
const Reseller = () => {
  const [searchQuery, setSearchQuery] = useState('');


      // To control the form visiblity    
      const [showForm, setShowForm] = useState(false); 

      //Function to fetch the company data and to create new company
      const {fetchAllResellerData, resellerData} = useResellerController();


      // to filter the data based on the search
      const filteredData = resellerData.filter((reseller) =>
        `${reseller.cEmail} ${reseller.creseller_name}`.toLowerCase()
          .includes(searchQuery.toLowerCase()) );

           //Demo data for graph and pie chart
   const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Sales',
        data: [150, 200, 180, 220, 250],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.4,
        fill: false,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };


  const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  datasets: [
    {
      label: 'Revenue',
      data: [12000, 19000, 3000, 5000, 20000],
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
      borderRadius: 5,
    },
  ],
};

const options = {
  responsive: true,

  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Monthly Revenue',
    },
  },
  scales: {
    y: {
        grid: {
            display: false
        },
      beginAtZero: true,
    },
    x: {
        grid: {
            display: false
        }
    }
  },
};


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
        + Add Reseller
        </button>



        
    {/* Renders the form according to the state */}
     {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">
            < CompanyForm onClose={() => setShowForm(false)}  onSuccess={fetchAllResellerData}/>
            </div>
        </div>
        )}
    </div>

      </div>
    <div className='flex'>

    </div>
<div className='mb-10 flex gap-10'>

    <Card count={2500} title={"Active Reseller"} iconUrl={'public/icons/reseller.svg'}>
    </Card>

<Card count={3000} title={"Active Reseller"} iconUrl={'public/icons/pending.svg'}>
    </Card>

<Card count={500} title={"Active Reseller"} iconUrl={'public/icons/suspended.svg'}>
    </Card>

</div>


           {/* Charts */}
                  <div className="flex gap-6 p-6">
                    {/* Line Chart */}
                    <div className="w-full md:w-1/2 bg-white p-4 rounded shadow">
                      <h2 className="text-lg font-semibold mb-4">Monthly Revenue Contribution</h2>
                      <Line data={lineData} options={lineOptions} />
                    </div>
          
                    {/* Bar Chart */}
                    <div className="w-full md:w-1/2 bg-white p-4 rounded shadow mx-auto" >
                      <h2 className="text-lg font-semibold mb-4">Top 5 Resellers by Revenue</h2>
                          <Bar data={data} options={options} />
                    </div>
                  </div>
                
                
    
      {/* Grid of Cards */}
      <div className="grid ">
        {filteredData.length > 0 ? (
            <ResellerGrid
              data={filteredData}
              cardClass="bg-blue-50"
              statusClass="bg-green-100 text-green-800"
              textClass="text-gray-700"
            />
        ) : (
          <p className="text-gray-500">No reseller match your search.</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default Reseller;
