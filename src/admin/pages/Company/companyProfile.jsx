import { Button, IconButton } from "@mui/material"; // IconButton is imported but not used, kept for now.
import { Line, Pie } from 'react-chartjs-2'; // Combine imports for brevity
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CallIcon from '@mui/icons-material/Call';
import EditIcon from '@mui/icons-material/Edit'; // Added for the Edit button
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
import formatDate from "../../utils/formatDate"; // Ensure this path is correct

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
  const { fetchCompanyDataById } = useCompanyController();
  const [company, setCompany] = useState(null); // Initialize as null for clearer loading state

  const { id } = useParams();

  // Demo data for graph and pie chart (keeping as is per request)
  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Sales',
        data: [150, 200, 180, 220, 250],
        borderColor: '#4A90E2', // Modern blue
        backgroundColor: 'rgba(74, 144, 226, 0.2)', // Light blue fill
        tension: 0.4,
        fill: true, // Fill the area under the line
        pointBackgroundColor: '#4A90E2',
        pointBorderColor: '#fff',
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#4A90E2',
        pointHoverBorderColor: '#fff',
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allow custom height
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            family: 'Inter, sans-serif'
          },
          color: '#374151' // Gray-700
        }
      },
      tooltip: {
        backgroundColor: '#374151',
        titleFont: { size: 14, family: 'Inter, sans-serif' },
        bodyFont: { size: 12, family: 'Inter, sans-serif' },
        padding: 10,
        cornerRadius: 4,
      }
    },
    scales: {
      x: {
        grid: {
          display: false, // Hide x-axis grid lines
        },
        ticks: {
          color: '#6B7280', // Gray-500
          font: { family: 'Inter, sans-serif' }
        },
        border: {
          display: false // Hide x-axis border line
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#E5E7EB', // Light gray grid lines
        },
        ticks: {
          color: '#6B7280', // Gray-500
          font: { family: 'Inter, sans-serif' }
        },
        border: {
          display: false // Hide y-axis border line
        }
      },
    },
  };

  const pieData = {
    labels: ['Sales', 'Marketing', 'Development', 'Support'],
    datasets: [
      {
        label: 'Department Budget',
        data: [300, 200, 400, 100],
        backgroundColor: ['#4A90E2', '#FF6384', '#F5A623', '#50E3C2'], // Updated colors for vibrancy
        borderColor: '#fff',
        borderWidth: 2, // Thicker borders for slices
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allow custom height
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 14,
            family: 'Inter, sans-serif'
          },
          color: '#374151' // Gray-700
        }
      },
      tooltip: {
        backgroundColor: '#374151',
        titleFont: { size: 14, family: 'Inter, sans-serif' },
        bodyFont: { size: 12, family: 'Inter, sans-serif' },
        padding: 10,
        cornerRadius: 4,
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed);
            }
            return label;
          }
        }
      }
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
  ];

  // Dynamically build full address, filtering out empty parts
  const fullAddressParts = [
    company?.caddress1,
    company?.caddress2,
    company?.caddress3,
    company?.city?.cCity_name,
    company?.country?.cCountry_name // Assuming a country field might exist
  ].filter(Boolean); // Filter out null, undefined, and empty strings
  const fullAddress = fullAddressParts.length > 0 ? fullAddressParts.join(', ') : 'N/A';

  // Format dates
  const created_at = formatDate(company?.dCreated_dt);
  const modified_at = formatDate(company?.dModified_dt);

  // Initial for company logo placeholder
  const companyInitial = company?.cCompany_name?.charAt(0).toUpperCase() || '?';

  useEffect(() => {
    const loadCompany = async () => {
      try {
        const data = await fetchCompanyDataById(id);
        setCompany(data);
      } catch (error) {
        console.error("Failed to fetch company data:", error);
        setCompany(null); // Set to null on error to show "Loading..." or "N/A"
      }
    };

    if (id) loadCompany();
  }, [id, fetchCompanyDataById]); // Added fetchCompanyDataById to dependency array

  return (
    <div className="p-6 lg:p-8 space-y-8 bg-gray-50 min-h-screen font-sans antialiased">
      {/* --- Header Section --- */}
      <div className="bg-white rounded-xl shadow-md p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border border-gray-100">
        <div className="flex items-center gap-6">
          {/* Company Logo/Initial */}
          {company?.cCompany_logo_url ? ( // Assuming a logo URL exists
            <img src={company.cCompany_logo_url} alt="Company Logo" className="w-20 h-20 rounded-full object-cover shadow-sm ring-2 ring-blue-200" />
          ) : (
            <div className="w-20 h-20 flex items-center justify-center bg-blue-100 text-blue-700 font-extrabold rounded-full text-3xl shadow-sm ring-2 ring-blue-200">
              {companyInitial}
            </div>
          )}

          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">
              {company?.cCompany_name || "Loading Company..."}
            </h1>
            <p className="text-sm text-gray-500 mt-1">Company ID: {company?.iCompany_id || 'N/A'}</p>
            <div className="flex flex-wrap gap-3 mt-4">
              <Button
                variant="outlined"
                size="medium"
                startIcon={<ChatIcon />}
                className="!normal-case !text-blue-600 !border-blue-300 hover:!bg-blue-50 transition-colors"
                sx={{
                  '&.MuiButton-outlined': {
                    borderColor: '#93C5FD', // blue-300
                    color: '#2563EB', // blue-600
                    '&:hover': {
                      backgroundColor: '#EFF6FF', // blue-50
                      borderColor: '#60A5FA', // blue-400
                    },
                  },
                }}
              >
                Message
              </Button>
              <Button
                variant="outlined"
                size="medium"
                startIcon={<NotificationsIcon />}
                className="!normal-case !text-purple-600 !border-purple-300 hover:!bg-purple-50 transition-colors"
                sx={{
                  '&.MuiButton-outlined': {
                    borderColor: '#D8B4FE', // purple-300
                    color: '#9333EA', // purple-600
                    '&:hover': {
                      backgroundColor: '#F3E8FF', // purple-50
                      borderColor: '#C084FC', // purple-400
                    },
                  },
                }}
              >
                Reminders
              </Button>
              <Button
                variant="outlined"
                size="medium"
                startIcon={<CallIcon />}
                className="!normal-case !text-green-600 !border-green-300 hover:!bg-green-50 transition-colors"
                sx={{
                  '&.MuiButton-outlined': {
                    borderColor: '#86EFAC', // green-300
                    color: '#16A34A', // green-600
                    '&:hover': {
                      backgroundColor: '#DCFCE7', // green-50
                      borderColor: '#4ADE80', // green-400
                    },
                  },
                }}
              >
                Call
              </Button>
            </div>
          </div>
        </div>
        <Button
          variant="contained"
          size="large"
          startIcon={<EditIcon />}
          className="!bg-blue-600 !text-white !font-semibold !rounded-lg hover:!bg-blue-700 !shadow-md hover:!shadow-lg transition-all !normal-case"
        >
          Edit Company
        </Button>
      </div>

      {/* --- Profile Info & Charts Section --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Company Profile Info Card (Span 2 columns on large screens) */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Company Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-5 gap-x-6 text-base text-gray-800">
            {/* Column 1 */}
            <p><span className="text-gray-500 font-medium">Company Name:</span> <span className="font-semibold">{company?.cCompany_name || "N/A"}</span></p>
            <p><span className="text-gray-500 font-medium">Reseller ID:</span> <span className="font-semibold">{company?.iReseller_id || "N/A"}</span></p>
            <p className="flex items-center gap-2">
              <span className="text-gray-500 font-medium">Status:</span>
              <span
                className={`
                  text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm uppercase
                  ${company?.bactive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}
                `}
              >
                {company?.bactive ? "Active" : "Inactive"}
              </span>
            </p>
            <p><span className="text-gray-500 font-medium">Subscription Plan:</span> <span className="font-semibold">{company?.pricing_plan?.plan_name || "N/A"}</span></p>
            <p><span className="text-gray-500 font-medium">No. of Users:</span> <span className="font-semibold">{company?.iUser_no || "N/A"}</span></p>

            {/* Column 2 */}
            <p><span className="text-gray-500 font-medium">Phone Number:</span> <span className="font-semibold">{company?.iPhone_no || "N/A"}</span></p>
            <p><span className="text-gray-500 font-medium">GST Number:</span> <span className="font-semibold">{company?.cGst_no || "N/A"}</span></p>
            <p><span className="text-gray-500 font-medium">CIN Number:</span> <span className="font-semibold">{company?.icin_no || "N/A"}</span></p>
            <p className="md:col-span-2 lg:col-span-1"><span className="text-gray-500 font-medium">Website:</span> <a href={`http://${company?.cWebsite}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 hover:underline">{company?.cWebsite || "N/A"}</a></p>


            {/* Column 3 */}
            <p className="md:col-span-2 lg:col-span-1"><span className="text-gray-500 font-medium">Address:</span> <span className="font-semibold">{fullAddress}</span></p>
            <p><span className="text-gray-500 font-medium">Created At:</span> <span className="font-semibold">{created_at || "N/A"}</span></p>
            <p><span className="text-gray-500 font-medium">Modified At:</span> <span className="font-semibold">{modified_at || "N/A"}</span></p>
          </div>
        </div>

        {/* Charts Container (single column on large screens) */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-md p-6 border border-gray-100 flex flex-col gap-6">
          {/* Line Chart */}
          {/* <div className="flex-1 min-h-[250px] relative"> 
            <h3 className="text-xl font-bold text-gray-800 mb-4">Monthly Sales</h3>
            <Line data={lineData} options={lineOptions} />
          </div> */}

          {/* Pie Chart */}
         <div className="min-h-[250px] relative">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Budget Allocation</h3>
          <div className="h-[250px]">
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>
        </div>
      </div>

      {/* --- General Settings Section --- */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">General Settings</h2>
        <div className="space-y-6">
          {/* Setting Row: Preferred Currency */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-gray-200">
            <div>
              <p className="font-semibold text-gray-800 text-lg">Preferred Currency</p>
              <p className="text-sm text-gray-500 mt-1">All transactions and reports will be displayed using this currency.</p>
            </div>
            <select className="border border-gray-300 px-4 py-2 rounded-lg text-base font-medium text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2 sm:mt-0 shadow-sm">
              <option>₹ INR</option>
              <option>$ USD</option>
              <option>€ EUR</option>
            </select>
          </div>

          {/* Setting Row: Time Zone */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-gray-200">
            <div>
              <p className="font-semibold text-gray-800 text-lg">Time Zone</p>
              <p className="text-sm text-gray-500 mt-1">System events, reminders, and schedules will follow this time zone.</p>
            </div>
            <select className="border border-gray-300 px-4 py-2 rounded-lg text-base font-medium text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2 sm:mt-0 shadow-sm">
              <option>GMT +5:30) Asia/Kolkata</option>
              <option>GMT +1:00) Europe/London</option>
              <option>GMT -8:00) America/Los_Angeles</option>
            </select>
          </div>

          {/* Setting Row: Language */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center"> {/* No bottom border for last item */}
            <div>
              <p className="font-semibold text-gray-800 text-lg">Language</p>
              <p className="text-sm text-gray-500 mt-1">The CRM interface and default communication will use this language.</p>
            </div>
            <select className="border border-gray-300 px-4 py-2 rounded-lg text-base font-medium text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2 sm:mt-0 shadow-sm">
              <option>English</option>
              <option>Hindi</option>
              <option>Tamil</option>
            </select>
          </div>
        </div>
      </div>

      {/* --- Enabled Modules Section --- */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Enabled Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">
          {enabledModules.map((module, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-sm"
            >
              <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0 shadow-md">
                ✓
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-800">{module.name}</p>
                <p className="text-sm text-gray-600 mt-1">{module.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;