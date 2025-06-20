import { Line, Pie, Doughnut } from 'react-chartjs-2';
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
import { useResellerController } from "./resellerController";
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

const ResellerProfile = () => {
  const { fetchResellerDataById } = useResellerController(); 
  const [reseller, setReseller] = useState();
  const { id } = useParams();

  const created_at = formatDate(reseller?.dCreated_dt);
  const modified_at = formatDate(reseller?.dUpdated_dt);

  useEffect(() => {
    const loadReseller = async () => {
      try {
        const data = await fetchResellerDataById(id);
        setReseller(data);
      } catch (error) {
        console.error("Failed to fetch reseller data:", error);
      }
    };
    if (id) loadReseller();
  }, [id]);

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [{
      label: 'Revenue',
      data: [15000, 20000, 18000, 22000, 25000],
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.4,
      fill: false,
    }]
  };

  const pieData = {
    labels: ['Used Storage', 'Available Storage'],
    datasets: [{
      data: [65, 35],
      backgroundColor: ['#FF6384', '#36A2EB'],
      borderColor: '#fff',
      borderWidth: 1,
    }]
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gray-200 rounded-full" />
          <div>
            <h1 className="text-2xl font-bold">{reseller?.creseller_name || "Reseller Name"}</h1>
            <div className="space-x-2 mt-2">
              <Button variant="outlined" size="small" startIcon={<ChatIcon />}>Message</Button>
              <Button variant="outlined" size="small" startIcon={<NotificationsIcon />}>Reminders</Button>
              <Button variant="outlined" size="small" startIcon={<CallIcon />}>Call</Button>
            </div>
          </div>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Edit</button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-2xl font-bold text-blue-600">321</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold">Companies</h3>
          <p className="text-2xl font-bold text-green-600">12</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold">Revenue</h3>
          <p className="text-2xl font-bold text-purple-600">₹1.2L</p>
        </div>
       
      </div>

      {/* Profile Details - Redesigned Card */}
      <div className="bg-white rounded-2xl p-6 shadow">
        <h2 className="text-xl font-semibold mb-4">Reseller Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[{
            label: "Reseller Name",
            value: reseller?.creseller_name || "Unknown"
          }, {
            label: "Reseller ID",
            value: reseller?.ireseller_id
          }, {
            label: "Status",
            value: reseller?.bactive ? 'Active' : 'Inactive'
          }, {
            label: "Plan",
            value: reseller?.plan_id
          }, {
            label: "Email",
            value: reseller?.cEmail
          }, {
            label: "Industry",
            value: reseller?.iindustry_id
          }, {
            label: "Created At",
            value: created_at
          }, {
            label: "Modified At",
            value: modified_at
          }].map(({ label, value }, index) => (
            <div key={index} className="flex justify-between border-b pb-2">
              <span className="text-gray-500 font-medium">{label}</span>
              <span className="text-gray-800">{value || '-'}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Section */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-3/4 bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Revenue Trend</h2>
          <Line data={lineData} options={{ responsive: true, plugins: { legend: { position: 'top' } }, scales: { y: { beginAtZero: true } } }} />
        </div>
        <div className="w-full md:w-1/4 bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Storage Usage</h2>
          <Pie data={pieData} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
        </div>
      </div>
    </div>
  );
};

export default ResellerProfile;
