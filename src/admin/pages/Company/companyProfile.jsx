import { IconButton } from "@mui/material";
import { Line } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { Button } from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CallIcon from '@mui/icons-material/Call';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
import { useCompanyController } from "./companyController";
import formatDate from "../../utils/formatDate";

ChartJS.register(
  ArcElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const CompanyProfile = () => {
    
  // To fetch the company data
   const { fetchCompanyDataById} = useCompanyController(); 
   const [company, setCompany] = useState();


   // Fetch the id from url.
     const { id } = useParams();

   
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

  const pieData = {
    labels: ['Sales', 'Marketing', 'Development', 'Support'],
    datasets: [
      {
        label: 'Department Budget',
        data: [300, 200, 400, 100],
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0'],
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
    },
  };

  const enabledModules = [
  {
    name: "Leads",
    description: "Manage potential customers before they convert into contacts or deals.",
  },
  {
    name: "Contacts",
    description: "Store individual contact details of clients, suppliers, or partners.",
  },
  {
    name: "Deals",
    description: "Track ongoing sales activities and their progress toward closure.",
  },
  {
    name: "Support",
    description: "Record and resolve customer issues using a structured ticketing system.",
  },
  // Add more modules as needed
];



const fullAddress = `${company?.caddress1 || ''}, ${company?.caddress2 || ''}, ${company?.caddress3 || ''}, ${company?.city?.cCity_name || ''}`;

//Format dates
const created_at = formatDate(company?.dCreated_dt); //check for null
const modified_at = formatDate(company?.dModified_dt); //check for null

//Render when the application loads.
useEffect(() => {
  const loadCompany = async () => {
    try {
      const data = await fetchCompanyDataById(id);
      setCompany(data);
    } catch (error) {
      console.error("Failed to fetch company data:", error);
    }
  };

  if (id) loadCompany();
}, [id]);



  
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src="" alt="Company Logo" className="w-16 h-16 bg-gray-200 rounded-full object-cover" />
          <div>
            <h1 className="text-2xl font-bold">Company Name</h1>
            <div className="space-x-4 mt-2">
              <Button variant="outlined" size="small" startIcon={<ChatIcon />}>
                Message
            </Button>

            <Button variant="outlined" size="small" startIcon={<NotificationsIcon />}>
                Reminders
            </Button>

            <Button variant="outlined" size="small" startIcon={<CallIcon />}>
                Call
            </Button>
            </div>
          </div>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Edit</button>
      </div>

      {/* Profile Info */}
      <div className="p-6 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Company Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-800">
          {/* Column 1 */}
          <div className="space-y-6">
            <p><span className="text-gray-500">Company Name:</span> <span className="font-semibold">{company?.cCompany_name || "Loading..."}</span></p>
            <p><span className="text-gray-500">Reseller ID:</span> <span className="font-semibold">{company?.iReseller_id || "Loading..."}</span></p>
            <p className="flex items-center gap-2">
              <span className="text-gray-500">Status:</span>
              <span
                className={`${
                  company?.bactive ? "bg-green-500" : "bg-red-500"
                } text-white px-2 py-0.5 rounded text-xs`}
              >
                {company?.bactive ? "Active" : "Inactive"}
              </span>            </p>
            <p><span className="text-gray-500">Subscription Plan:</span> <span className="font-semibold">{company?.iReseller_id || "Loading..."}</span></p>
          </div>

          {/* Column 2 */}
          <div className="space-y-6">
            <p><span className="text-gray-500">No. of Users:</span> <span className="font-semibold">{company?.iUser_no || "Loading..."}</span></p>
            <p><span className="text-gray-500">Phone Number:</span> <span className="font-semibold">{company?.iPhone_no || "Loading..."}</span></p>
            <p><span className="text-gray-500">GST Number:</span> <span className="font-semibold">{company?.cGst_no || "Loading..."}</span></p>
            <p><span className="text-gray-500">CIN Number:</span> <span className="font-semibold">{company?.icin_no || "None"}</span></p>
          </div>

          {/* Column 3 */}
          <div className="space-y-6">
            <p><span className="text-gray-500">Address:</span> <span className="font-semibold">{fullAddress}</span></p>
            <p><span className="text-gray-500">Created At:</span> <span className="font-semibold">{created_at || "Loading..."}</span></p>
            <p><span className="text-gray-500">Modified At:</span> <span className="font-semibold">{modified_at || "Loading..."}</span></p>
          </div>
        </div>

        <hr className="my-6 border-gray-300" />

        {/* Charts */}
        <div className="flex gap-6">
          {/* Line Chart */}
          <div className="w-full md:w-3/4 bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">Monthly Sales</h2>
            <Line data={lineData} options={lineOptions} />
          </div>

          {/* Pie Chart */}
          <div className="w-full md:w-1/4 bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-24">Budget Allocation</h2>
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-md shadow border">
      <h2 className="text-lg font-semibold mb-6">General Settings</h2>

      <div className="space-y-6">
        {/* Row 1 - Preferred Currency */}
        <div className="flex justify-between items-start">
          <div>
            <p className="font-medium text-gray-800">Preferred Currency</p>
            <p className="text-sm text-gray-500">All transactions and reports will be displayed using this currency.</p>
          </div>
          <select className="border px-3 py-1.5 rounded text-sm font-medium">
            <option>₹ INR</option>
            <option>$ USD</option>
            <option>€ EUR</option>
          </select>
        </div>

        {/* Row 2 - Time Zone */}
        <div className="flex justify-between items-start">
          <div>
            <p className="font-medium text-gray-800">Time Zone</p>
            <p className="text-sm text-gray-500">System events, reminders, and schedules will follow this time zone.</p>
          </div>
          <select className="border px-3 py-1.5 rounded text-sm font-medium">
            <option>GMT +5:30) Asia/Kolkata</option>
            <option>GMT +1:00) Europe/London</option>
            <option>GMT -8:00) America/Los_Angeles</option>
          </select>
        </div>

        {/* Row 3 - Language */}
        <div className="flex justify-between items-start">
          
          <div>
            <p className="font-medium text-gray-800">Language</p>
            <p className="text-sm text-gray-500">The CRM interface and default communication will use this language.</p>
          </div>
          <select className="border px-3 py-1.5 rounded text-sm font-medium">
            <option>English</option>
            <option>Hindi</option>
            <option>Tamil</option>
          </select>
        </div>

         
      </div>
    





    </div> 
    <div className="bg-white p-6 rounded-xl shadow border space-y-5">
      <h2 className="text-xl font-bold text-gray-800">Enabled Modules</h2>

      {enabledModules.map((module, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xl font-semibold">
              ✓
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700">{module.name}</p>
              <p className="text-xs text-gray-500 mt-1">{module.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default CompanyProfile;
