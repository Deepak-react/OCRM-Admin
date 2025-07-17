import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Card from "../../components/card";
import CustomTooltip from "../../components/customTooltip";
import { useDashboardController } from "./dashboardController";

function AdminDashboard() {
  // For Bar chart data (Static) - Keeping as is since core logic is not to be changed
  const data = [
    { name: 'Jan', users: 400 },
    { name: 'Feb', users: 300 },
    { name: 'Mar', users: 500 },
    { name: 'Apr', users: 200 },
    { name: 'May', users: 350 },
    { name: 'June', users: 300 },
  ];

  // Data for Storage Usage (Static) - Keeping as is since core logic is not to be changed
  const storageData = [
    { name: 'Used', value: 30 },
    { name: 'Available', value: 70 },
  ];

  // Function to find the largest - Keeping as is since core logic is not to be changed
  const maxValueIndex = storageData.reduce(
    (maxIdx, item, idx, arr) => (item.value > arr[maxIdx].value ? idx : maxIdx),
    0
  );

  // Function to fetch the dashboard data - Keeping as is since core logic is not to be changed
  const { dashboardData } = useDashboardController();

  const resellerList = dashboardData?.resellerRanking;

  console.log("The dashboard data are", dashboardData?.resellerRanking);

  // Enhanced color palette for consistency and modern feel
  const COLORS = ['#FF7043', '#4CAF50']; // A more vibrant red-orange for used, and a classic green for available

  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-8 font-sans antialiased">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 sm:mb-10 tracking-tight">
        <span className="text-indigo-600">🧭</span> Admin Dashboard
      </h1>

      {/* Card Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Card
          title="Total Company"
          count={dashboardData?.totalCompany}
          color="bg-indigo-50 text-indigo-700 shadow-sm"
        />
        <Card
          title="Total Reseller"
          count={dashboardData?.totalReseller}
          color="bg-emerald-50 text-emerald-700 shadow-sm"
        />
        <Card
          title="Total Users"
          count={
            <>
              {dashboardData?.totalUsers}
              <div className="text-sm text-gray-600 mt-2 font-medium">
                <span className="text-green-600">Active: {dashboardData?.activeUsers}</span>
                <span className="ml-3 text-red-600">Inactive: {dashboardData?.inActiveUsers}</span>
              </div>
            </>
          }
          color="bg-blue-50 text-blue-700 shadow-sm"
        />
        <Card
          title="Total Revenue"
          count="₹1.2M"
          color="bg-yellow-50 text-yellow-700 shadow-sm"
        />
      </div>

      {/* Row Layout: Bar chart + Donut chart */}
      <div className="flex flex-col lg:flex-row gap-6 mb-10">
        {/* Bar Chart */}
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-md w-full lg:w-[70%]">
          <h3 className="text-xl font-semibold text-gray-700 mb-5">Server Downtime (Hrs)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} barSize={30} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} className="text-sm text-gray-500" />
              <Tooltip cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} content={(props) => <CustomTooltip {...props} suffix="hrs" />} />
              <Bar dataKey="users" fill="#4F46E5" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Donut Chart */}
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-md w-full lg:w-[30%] flex flex-col items-center justify-center">
          <h3 className="text-xl font-semibold text-gray-700 mb-5">Storage Availability</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={storageData}
                cx="50%"
                cy="50%"
                innerRadius={60} // Slightly larger inner radius for a bolder donut
                outerRadius={90} // Slightly smaller outer radius
                fill="#8884d8"
                paddingAngle={4} // Reduced padding angle
                dataKey="value"
                labelLine={false} // Hide label lines for a cleaner look
              >
                {storageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value}%`, name]} />
            </PieChart>
          </ResponsiveContainer>
          {/* Legend below donut chart */}
          <div className="flex justify-center mt-4 space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#FF7043] rounded-full shadow-sm"></div>
              <span className="text-gray-700 font-medium">Used</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#4CAF50] rounded-full shadow-sm"></div>
              <span className="text-gray-700 font-medium">Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <span className="text-yellow-500">🏅</span> Reseller Rankings
        </h2>

        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-inner">
          <table className="min-w-full text-sm text-gray-700 divide-y divide-gray-200">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wide font-semibold">
              <tr>
                <th className="px-6 py-3 text-left">S.No</th>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-center">Company</th>
                <th className="px-6 py-3 text-left">Active Clients</th>
                <th className="px-6 py-3 text-left">Commission Earned</th>
                <th className="px-6 py-3 text-left">Admin ID</th>
                <th className="px-6 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {resellerList?.map((user, idx) => (
                <tr
                  key={user.id}
                  className={`hover:bg-blue-50 transition duration-200 ease-in-out ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="px-6 py-4 text-gray-600">{idx + 1}</td>
                  <td className="px-6 py-4 font-medium text-gray-800">{user.cFull_name}</td>
                  <td className="px-6 py-4 text-gray-600">{user.cEmail}</td>
                  <td className="px-6 py-4 text-gray-600 text-center">{user.iCompany_id}</td>
                  <td className="px-6 py-4 text-gray-600">{user.activeClients}</td>
                  <td className="px-6 py-4 text-gray-600">₹{user.companyRevenue}</td>
                  <td className="px-6 py-4 text-gray-600">{user.iUser_id}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${
                        user.bactive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.bactive ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;