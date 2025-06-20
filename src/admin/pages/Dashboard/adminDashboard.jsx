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

    // For Reseller list 
  const users = [
    { id: 1, name: "Alice", email: "alice@example.com", role: "Admin", revenue: "₹500K", activeClients: 50, commission: "₹50K", region: "North", status: "Active" },
    { id: 2, name: "Bob", email: "bob@example.com", role: "User", revenue: "₹500K", activeClients: 50, commission: "₹50K", region: "North", status: "Active" },
    { id: 3, name: "Charlie", email: "charlie@example.com", role: "User", revenue: "₹500K", activeClients: 50, commission: "₹50K", region: "North", status: "In-Active" }, 
  ];

//   For Bar chart data
  const data = [
  { name: 'Jan', users: 400 },
  { name: 'Feb', users: 300 },
  { name: 'Mar', users: 500 },
  { name: 'Apr', users: 200 },
  { name: 'May', users: 350 },
  { name: 'June', users: 300 },
];

// Data for Storage Usage
const storageData = [
  { name: 'Used', value: 30 },
  { name: 'Available', value: 70 },
];



//Function to find the largest
const maxValueIndex = storageData.reduce(
  (maxIdx, item, idx, arr) => (item.value > arr[maxIdx].value ? idx : maxIdx),
  0
);

//Function to fetch the dashboard data
const {dashboardData} = useDashboardController();

const resellerList = dashboardData?.resellerRanking;

console.log("The dashboard data are", dashboardData?.resellerRanking);


const COLORS = ['#FF6363', '#00C49F']; // Red for used, green for available


  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 p-8 font-casuten">
      <h1 className="text-4xl font-semi-bold text-gray-800 mb-10 tracking-tight">
        🧭 Admin Dashboard
      </h1>

      {/* Card Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Card
          title="Total Company"
          count= {dashboardData?.totalCompany}
          color="bg-indigo-100 text-indigo-800"
        />
        <Card
          title="Total Reseller"
          count= {dashboardData?.totalReseller}
          color="bg-emerald-100 text-emerald-800"
        />

         <Card
      title="Total Users"
      count={
        <>
          {dashboardData?.totalUsers}
          <div className="text-xs text-gray-600 mt-2">
            <span className="text-green-700">Active: {dashboardData?.activeUsers}</span>
            <span className="ml-2 text-red-700">Inactive: {dashboardData?.inActiveUsers}</span>
          </div>
        </>
      }
      color="bg-blue-100 text-blue-800"
    />


        <Card
          title="Total Revenue"
          count="₹1.2M"
          color="bg-yellow-100 text-yellow-800"
        />

        
      </div>

         {/* Row Layout: Bar chart + Donut chart */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Bar Chart */}

        <div className="border border-gray-200 rounded-lg p-4 w-full lg:w-[72%]">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Server Down time</h3>
            
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} barSize={30}>
              <XAxis dataKey="name" />
            <Tooltip content={(props) => <CustomTooltip {...props} suffix="hrs"/>} />
              <Bar dataKey="users" fill="#164CA1" radius={[10, 10, 0, 0]} barGap="10%" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Donut Chart */}
        <div className="border border-gray-200 rounded-lg p-4 w-full lg:w-1/2 flex flex-col items-center justify-center">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Available Storage</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={storageData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {storageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              
            </PieChart>
           
          </ResponsiveContainer>
           {/* Legend below donut chart */}
            <div className="flex justify-center mt-4 space-x-6 text-sm">
            <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-[#FF6363] rounded-full"></div>
                <span className="text-gray-700">Used</span>
            </div>
            <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-[#00C49F] rounded-full"></div>
                <span className="text-gray-700">Available</span>
            </div>
            </div>
        </div>

      </div>

    

      {/* Table Section */}
      <div className="bg-gradient-to-tr from-white via-gray-50 to-white shadow-xl rounded-2xl p-8 mt-10 border border-gray-200">
  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
    🏅 Reseller Rankings
  </h2>

  <div className="overflow-x-auto rounded-xl border border-gray-300 shadow-inner">
    <table className="min-w-full text-sm text-gray-800 divide-y divide-gray-200">
      <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
        <tr>
          <th className="px-6 py-3 text-left">S.No</th>
          <th className="px-6 py-3 text-left">Name</th>
          <th className="px-6 py-3 text-left">Email</th>
          <th className="px-6 py-3 text-left">Company</th>
          <th className="px-6 py-3 text-left">Active clients</th>
          <th className="px-6 py-3 text-left">Commission earned</th>
          <th className="px-6 py-3 text-left">Admin ID</th>
          <th className="px-6 py-3 text-left">Status</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {resellerList?.map((user, idx) => (
          <tr
            key={user.id}
            className={`hover:bg-indigo-50 transition duration-200 ${
              idx % 2 === 0 ? "bg-white" : "bg-gray-50"
            }`}
          >
            <td className="px-6 py-4 text-gray-600">{idx + 1}</td>            
            <td className="px-6 py-4 font-medium">{user.cFull_name}</td>
            <td className="px-6 py-4 text-gray-600">{user.cEmail}</td>
            <td className="px-6 py-4 text-gray-600 text-center">{user.iCompany_id}</td>
            <td className="px-6 py-4 text-gray-600">{user.activeClients}</td>
            <td className="px-6 py-4 text-gray-600">{user.companyRevenue}</td>
            <td className="px-6 py-4 text-gray-600">{user.iUser_id}</td>
            <td className="px-6 py-4">  <span
                className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                  user.bactive  
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
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
