import { Button, IconButton, Tabs, Tab, Box, Typography, Menu, MenuItem, Switch, FormControlLabel, TextField } from "@mui/material"; // Added TextField
import { Line, Pie } from 'react-chartjs-2';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import MoreVertIcon from '@mui/icons-material/MoreVert'; 
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Chart as ChartJS, ArcElement, LineElement, CategoryScale, LinearScale,
PointElement, Tooltip, Legend } from 'chart.js';
import { useCompanyController } from "./companyController";
import formatDate from "../../utils/formatDate";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material"; 
import GeneralSettingsTab from './GeneralSettingsTab';
import MasterData from "../Masters/masterData.jsx";
import AuditLoginTab from './AuditLoginTab'; 

ChartJS.register( ArcElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

// A simple panel component to show content based on active tab
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const CompanyProfile = () => {
  const { fetchCompanyDataById } = useCompanyController();
  const [company, setCompany] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  const { id } = useParams();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Demo data for graph and pie chart (keeping as is per request)
  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Sales',
        data: [150, 200, 180, 220, 250],
        borderColor: '#4A90E2',
        backgroundColor: 'rgba(74, 144, 226, 0.2)',
        tension: 0.4,
        fill: true,
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
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            family: 'Inter, sans-serif'
          },
          color: '#374151'
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
          display: false,
        },
        ticks: {
          color: '#6B7280',
          font: { family: 'Inter, sans-serif' }
        },
        border: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#E5E7EB',
        },
        ticks: {
          color: '#6B7280',
          font: { family: 'Inter, sans-serif' }
        },
        border: {
          display: false
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
        backgroundColor: ['#4A90E2', '#FF6384', '#F5A623', '#50E3C2'],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 14,
            family: 'Inter, sans-serif'
          },
          color: '#374151'
        }
      },
      tooltip: {
        backgroundColor: '#374151',
        titleFont: { size: 14, family: 'Inter, sans-serif' },
        bodyFont: { size: 12, family: 'Inter, sans-serif' },
        padding: 10,
        cornerRadius: 4,
        callbacks: {
          label: function (context) {
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

  // State for dynamically managed modules
  const [modules, setModules] = useState([
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
  ]);

  // Placeholder for user data (you'd fetch this from your API)
  const [users, setUsers] = useState([
    { id: 1, name: 'Alice Johnson', email: 'alice.j@example.com', role: 'Admin', status: 'Active', createdAt: '2023-01-15T10:00:00Z', bactive: true },
    { id: 2, name: 'Bob Williams', email: 'bob.w@example.com', role: 'Sales', status: 'Active', createdAt: '2023-03-20T11:30:00Z', bactive: true },
    { id: 3, name: 'Charlie Brown', email: 'charlie.b@example.com', role: 'Support', status: 'Inactive', createdAt: '2023-05-01T09:00:00Z', bactive: false },
    { id: 4, name: 'Diana Prince', email: 'diana.p@example.com', role: 'Marketing', status: 'Active', createdAt: '2023-07-10T14:15:00Z', bactive: true },
  ]);


  // Dynamically build full address, filtering out empty parts
  const fullAddressParts = [
    company?.caddress1,
    company?.caddress2,
    company?.caddress3,
    company?.city?.cCity_name,
    company?.country?.cCountry_name
  ].filter(Boolean);
  const fullAddress = fullAddressParts.length > 0 ? fullAddressParts.join(', ') : '-';

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
        setCompany(null);
      }
    };

    if (id) loadCompany();
  }, [id, fetchCompanyDataById]);


  // for edit form
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editCompanyData, setEditCompanyData] = useState({});

  const handleOpenEditDialog = () => {
    setEditCompanyData(company);
    setOpenEditDialog(true);
  };

  // Function to close the edit dialog
  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  // Function to handle changes in the edit form fields
  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditCompanyData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Function to handle saving the edited company data
  const handleSaveEditedCompany = () => {
    console.log("Saving edited company data:", editCompanyData);
    setOpenEditDialog(false);
  };

  // State for activate/deactivate user dialog
  const [openUserStatusDialog, setOpenUserStatusDialog] = useState(false);
  const [userToModify, setUserToModify] = useState(null);

  // State for the ellipsis menu anchor
  const [anchorEl, setAnchorEl] = useState(null); 

  // Function to open the ellipsis menu
  const handleMenuOpen = (event, user) => {
    setAnchorEl(event.currentTarget);
    setUserToModify(user); 
  };

  // Function to close the ellipsis menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Function to open the confirmation dialog from the menu item
  const handleOpenStatusConfirmation = () => {
    setOpenUserStatusDialog(true);
    handleMenuClose(); 
  };

  // Function to close the confirmation dialog
  const handleCloseUserStatusDialog = () => {
    setOpenUserStatusDialog(false);
    setUserToModify(null); 
  };

  // Function to handle the actual status toggle (activate/deactivate)
  const handleToggleUserStatus = () => {
    if (userToModify) {
      const newStatus = userToModify.bactive ? 'Inactive' : 'Active';
      const newBactive = !userToModify.bactive; 

      console.log(`${newStatus} user: ${userToModify.name}`);
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === userToModify.id ? { ...user, status: newStatus, bactive: newBactive } : user
        )
      );
      handleCloseUserStatusDialog();
    }
  };

  // State for company activate/deactivate dialog
  const [openCompanyStatusDialog, setOpenCompanyStatusDialog] = useState(false);

  // Function to open the company status confirmation dialog
  const handleOpenCompanyStatusDialog = () => {
    setOpenCompanyStatusDialog(true);
  };

  // Function to close the company status confirmation dialog
  const handleCloseCompanyStatusDialog = () => {
    setOpenCompanyStatusDialog(false);
  };

  // Function to handle company status toggle
  const handleToggleCompanyStatus = () => {
    if (company) {
      const newBactiveStatus = !company.bactive;
      console.log(`Toggling company status to: ${newBactiveStatus ? 'Active' : 'Inactive'}`);
      setCompany(prevCompany => ({ ...prevCompany, bactive: newBactiveStatus }));
      handleCloseCompanyStatusDialog();
    }
  };

  // --- State and Handlers for Add Module Dialog ---
  const [openAddModuleDialog, setOpenAddModuleDialog] = useState(false);
  const [newModuleName, setNewModuleName] = useState('');
  const [newModuleDescription, setNewModuleDescription] = useState('');
  const [moduleNameError, setModuleNameError] = useState(false);
  const [moduleDescriptionError, setModuleDescriptionError] = useState(false);

  const handleOpenAddModuleDialog = () => {
    setNewModuleName(''); 
    setNewModuleDescription('');
    setModuleNameError(false); 
    setModuleDescriptionError(false);
    setOpenAddModuleDialog(true);
  };

  const handleCloseAddModuleDialog = () => {
    setOpenAddModuleDialog(false);
  };

  const handleAddModule = () => {
    let hasError = false;

    // Validate module name
    if (newModuleName.trim() === '' || newModuleName.length > 25) {
      setModuleNameError(true);
      hasError = true;
    } else {
      setModuleNameError(false);
    }

    // Validate module description (word count)
    const wordCount = newModuleDescription.trim().split(/\s+/).filter(word => word.length > 0).length;
    if (wordCount > 100) {
      setModuleDescriptionError(true);
      hasError = true;
    } else {
      setModuleDescriptionError(false);
    }

    if (hasError) {
      return; 
    }

    // Add the new module
    setModules(prevModules => [
      ...prevModules,
      { name: newModuleName.trim(), description: newModuleDescription.trim() }
    ]);
    handleCloseAddModuleDialog();
  };
  const [formData, setFormData] = useState({
  name: "",
  email: "",
  appPassword: "",
});

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
};


  return (
    <div className="p-6 lg:p-8 space-y-8 bg-gray-50 min-h-screen font-sans antialiased">
      {/* --- Header Section --- */}
      <div className="bg-white rounded-xl shadow-md p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border border-gray-100">
        <div className="flex items-center gap-6">
          {/* Company Logo/Initial */}
          {company?.cCompany_logo_url ? (
            <img src={company.cCompany_logo_url} alt="Company Logo" className="w-20 h-20 rounded-full object-cover shadow-sm ring-2 ring-blue-200" />
          ) : (
            <div className="w-20 h-20 flex items-center justify-center bg-blue-100 text-blue-700 font-extrabold rounded-full text-4xl shadow-sm ring-2 ring-blue-200">
              {companyInitial}
            </div>
          )}

          <div>
              <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">
                {company?.cCompany_name || "Loading Company..."}
              </h1>
              <p className="text-sm text-gray-500 mt-1 flex items-center gap-2"> 
                Company ID: <span className="font-semibold text-gray-700">{company?.iCompany_id || '-'}</span> 
                {company && (
                  <span
                    className={`
                      text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm uppercase
                      ${company.bactive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}
                    `}
                  >
                    {company.bactive ? "Active" : "Inactive"}
                  </span>
                )}
              </p>

               <p className="text-sm text-gray-500 mt-1">
                Subscription Plan: <span className="font-semibold text-gray-700">{company?.pricing_plan?.plan_name || "-"}</span>
              </p>
            </div>
        </div>

       <button
            className="bg-black text-white font-semibold rounded-lg px-4 py-2 hover:bg-blue-700 shadow-md hover:shadow-lg flex items-center gap-2 transition-all"
            onClick={handleOpenEditDialog}
          >
            <EditSquareIcon />
          </button>
      </div>

      {/* --- Tabs Section --- */}
      <div className="bg-black rounded-xl shadow-md p-0 border border-gray-100">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={handleTabChange} aria-label="company profile tabs"
            sx={{'.MuiTabs-indicator': {backgroundColor: '#2563EB', },}}>
            <Tab label={<span className="font-semibold text-gray-700 hover:text-blue-600">Company Profile</span>} {...a11yProps(0)} />
            <Tab label={<span className="font-semibold text-gray-700 hover:text-blue-600">General Settings</span>} {...a11yProps(1)} />
            <Tab label={<span className="font-semibold text-gray-700 hover:text-blue-600">Users</span>} {...a11yProps(2)} />
            <Tab label={<span className="font-semibold text-gray-700 hover:text-blue-600">Masters</span>} {...a11yProps(3)} />
            <Tab label={<span className="font-semibold text-gray-700 hover:text-blue-600">Audit login</span>} {...a11yProps(4)} />
          </Tabs>
        </Box>

        

        {/* --- Tab Panel: Company Profile --- */}
        <CustomTabPanel value={activeTab} index={0}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Company Profile Info Card (Span 2 columns on large screens) */}

            <div className="lg:col-span-3 bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Company Details</h2>
              {/* The grid below ensures content wraps and flows responsively */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-5 gap-x-6 text-base text-gray-800">
                {/* Column 1 */}
                <p className="flex items-center gap-2"><img src="/icons/company.png" alt="Company" width={30} height={30} /><span className="font-semibold">{company?.cCompany_name || "-"}</span></p>
                <p className="flex items-center gap-2"><PhoneIcon className="text-gray-500" /> <span className="font-semibold">{company?.iPhone_no || "-"}</span></p>
                <p className="flex items-center gap-2"><EmailIcon className="text-gray-500" /><span className="font-semibold">{company?.cEmail || "-"}</span></p>
                <p className="md:col-span-2 lg:col-span-1 flex items-center gap-2"><LanguageIcon className="text-gray-500" /><a href={`http://${company?.cWebsite}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 hover:underline">{company?.cWebsite || "-"}</a></p>
                <p className="flex items-center gap-2"><img src="/icons/reseller.png" alt="Reseller" width={30} height={30} /><span className="font-semibold">{company?.iReseller_id || "-"}</span></p>
                <p className="flex items-center gap-2"><img src="/icons/user.png" alt="User" width={30} height={30} /><span className="font-semibold">{company?.iUser_no || "-"}</span></p>
                <p className="flex items-center gap-2"><img src="/icons/gst.png" alt="GST Number" width={30} height={30} /><span className="font-semibold">{company?.cGst_no || "-"}</span></p>
                <p className="flex items-center gap-2"><img src="/icons/cin.png" alt="CIN Number" width={30} height={30} /> <span className="font-semibold">{company?.icin_no || "-"}</span></p>
                <p className="md:col-span-2 lg:col-span-1 flex items-start gap-2"><LocationOnIcon className="text-gray-500 mt-1" /><span className="font-semibold">{fullAddress}</span></p>
                <p className="flex items-center gap-2"><EventIcon className="text-gray-500" /><span className="font-semibold">{created_at || "-"}</span></p>
                <p className="flex items-center gap-2"><EditDocumentIcon className="text-gray-500" /> <span className="font-semibold">{modified_at || "-"}</span></p>
              </div>
            </div>
          </div>
          {/* Pie Chart */}
            <div className="lg:col-span-1 bg-white rounded-xl shadow-md p-6 border border-gray-100 flex flex-col gap-6 mt-6"> {/* Added mt-6 for spacing */}
              <div className="min-h-[250px] relative">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Storage Allocation</h3>
                <div className="h-[250px]">
                  <Pie data={pieData} options={pieOptions} />
                </div>
              </div>
            </div>
        </CustomTabPanel>

        {/* --- Tab Panel: General Settings & Enabled Modules --- */}
        <CustomTabPanel value={activeTab} index={1}>
  <GeneralSettingsTab />
</CustomTabPanel> 
        

        {/* --- Tab Panel: Users --- */}
        <CustomTabPanel value={activeTab} index={2}>
       <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
       <h2 className="text-2xl font-bold text-gray-800 mb-6">Users</h2>
       {users.length > 0 ? (
       <div className="overflow-x-auto">
         <table className="min-w-full divide-y divide-gray-200">
           <thead className="bg-gray-50">
             <tr>
               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
               <th className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
             </tr>
           </thead>

           <tbody className="bg-white divide-y divide-gray-200">
             {users.map((user) => (
               <tr key={user.id}>
                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                   {user.name}
                 </td>
                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                   {user.email}
                 </td>
                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                   {user.role}
                 </td>
                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                   {new Date(user.createdAt).toLocaleDateString('en-IN', {
                     day: '2-digit',
                     month: 'short',
                     year: 'numeric',
                   })}
                 </td>
                 <td className="px-6 py-4 whitespace-nowrap">
                   <span
                     className={`
                       px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                       ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                     `}
                   >
                     {user.status}
                   </span>
                 </td>
                 <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                   <IconButton
                     aria-label="more"
                     aria-controls={`user-actions-menu-${user.id}`}
                     aria-haspopup="true"
                     onClick={(event) => handleMenuOpen(event, user)} // Pass event and user
                   >
                     <MoreVertIcon />
                   </IconButton>
                   {/* Only render the Menu if anchorEl is set for the current user's row */}
                   {userToModify?.id === user.id && (
                     <Menu
                       id={`user-actions-menu-${user.id}`}
                       anchorEl={anchorEl}
                       open={Boolean(anchorEl)} // Use Boolean(anchorEl) to check if menu is open
                       onClose={handleMenuClose}
                       MenuListProps={{
                         'aria-labelledby': 'more-button',
                       }}
                       PaperProps={{
                         style: {
                           maxHeight: 48 * 4.5,
                           width: '20ch',
                         },
                       }}
                     >
                       <MenuItem onClick={handleOpenStatusConfirmation}>
                         {user.bactive ? "Deactivate" : "Activate"}
                       </MenuItem>
                     </Menu>
                   )}
                 </td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>
       ) : (
         <p className="text-gray-500">No user data available.</p>
       )}
     </div>
       </CustomTabPanel>
      </div>

      <CustomTabPanel value={activeTab} index={3}> {/* New index for Masters */}
  <MasterData />
</CustomTabPanel>
<CustomTabPanel value={activeTab} index={4}>
  <AuditLoginTab />
</CustomTabPanel> 

      {/* --- Edit Company Dialog --- */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog} fullWidth maxWidth="md">
        <DialogTitle className="text-2xl font-bold text-center text-gray-1000 border-b pb-4">Edit Company Details</DialogTitle>
        <DialogContent dividers>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <TextField
              label={<span>Company Name <span className="text-red-500">*</span></span>}
              name="cCompany_name"
              value={editCompanyData?.cCompany_name || ''}
              onChange={handleEditFormChange}
              fullWidth
              variant="outlined"
            />
            <TextField
              label={<span>Phone Number <span className="text-red-500">*</span></span>}
              name="iPhone_no"
              value={editCompanyData?.iPhone_no || ''}
              onChange={handleEditFormChange}
              fullWidth
              variant="outlined"
            />
            <TextField
              label={<span>Email </span>}
              name="cEmail"
              value={editCompanyData?.cEmail || ''}
              onChange={handleEditFormChange}
              fullWidth
              variant="outlined"
            />
            <TextField
              label={<span>Website </span>}
              name="cWebsite"
              value={editCompanyData?.cWebsite || ''}
              onChange={handleEditFormChange}
              fullWidth
              variant="outlined"
            />
            <TextField
              label={<span>Reseller ID <span className="text-red-500">*</span></span>}
              name="iReseller_id"
              value={editCompanyData?.iReseller_id || ''}
              onChange={handleEditFormChange}
              fullWidth
              variant="outlined"
            />
            <TextField
              label={<span>Number of Users <span className="text-red-500">*</span></span>}
              name="iUser_no"
              value={editCompanyData?.iUser_no || ''}
              onChange={handleEditFormChange}
              fullWidth
              variant="outlined"
            />
            <TextField
              label={<span>GST Number <span className="text-red-500">*</span></span>}
              name="cGst_no"
              value={editCompanyData?.cGst_no || ''}
              onChange={handleEditFormChange}
              fullWidth
              variant="outlined"
            />
            <TextField
              label={<span>CIN Number <span className="text-red-500">*</span></span>}
              name="icin_no"
              value={editCompanyData?.icin_no || ''}
              onChange={handleEditFormChange}
              fullWidth
              variant="outlined"
            />
            <TextField
              label={<span>Address Line 1 <span className="text-red-500">*</span></span>}
              name="caddress1"
              value={editCompanyData?.caddress1 || ''}
              onChange={handleEditFormChange}
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Address Line 2"
              name="caddress2"
              value={editCompanyData?.caddress2 || ''}
              onChange={handleEditFormChange}
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Address Line 3"
              name="caddress3"
              value={editCompanyData?.caddress3 || ''}
              onChange={handleEditFormChange}
              fullWidth
              variant="outlined"
            />
            <TextField
              label={<span>City <span className="text-red-500">*</span></span>}
              name="cCity_name"
              value={editCompanyData?.city?.cCity_name || ''}
              onChange={(e) => setEditCompanyData(prev => ({ ...prev, city: { ...prev.city, cCity_name: e.target.value } }))}
              fullWidth
              variant="outlined"
            />
          </div>
        </DialogContent>
        <DialogActions className="p-4">
          <Button onClick={handleCloseEditDialog} color="primary" variant="outlined" className="px-4 py-2 rounded-lg font-semibold">
            Cancel
          </Button>
          <Button onClick={handleSaveEditedCompany} color="primary" variant="contained" className="px-4 py-2 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* --- Activate/Deactivate User Dialog --- */}
      <Dialog open={openUserStatusDialog} onClose={handleCloseUserStatusDialog}>
        <DialogTitle className="text-xl font-bold text-gray-900">
          Confirm {userToModify?.bactive ? "Deactivation" : "Activation"}
        </DialogTitle>
        <DialogContent dividers>
          <Typography>
            Are you sure you want to {userToModify?.bactive ? "deactivate" : "activate"} user: <span className="font-semibold">{userToModify?.name}</span>?
          </Typography>
          <Typography className="mt-2 text-sm text-gray-600">
            This action will set the user's status to "{userToModify?.bactive ? "Inactive" : "Active"}".
          </Typography>
        </DialogContent>
        <DialogActions className="p-4">
          <Button onClick={handleCloseUserStatusDialog} color="primary" variant="outlined" className="px-4 py-2 rounded-lg font-semibold">
            No
          </Button>
          <Button
            onClick={handleToggleUserStatus}
            color={userToModify?.bactive ? "error" : "success"}
            variant="contained"
            className={`px-4 py-2 rounded-lg font-semibold ${userToModify?.bactive ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"} text-white`}
          >
            Yes, {userToModify?.bactive ? "Deactivate" : "Activate"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* --- Company Status Confirmation Dialog --- */}
      <Dialog open={openCompanyStatusDialog} onClose={handleCloseCompanyStatusDialog}>
        <DialogTitle className="text-xl font-bold text-gray-900">
          Confirm Company {company?.bactive ? "Deactivation" : "Activation"}
        </DialogTitle>
        <DialogContent dividers>
          <Typography>
            Are you sure you want to {company?.bactive ? "deactivate" : "activate"} the company: <span className="font-semibold">{company?.cCompany_name}</span>?
          </Typography>
          <Typography className="mt-2 text-sm text-gray-600">
            This action will set the company's status to "{company?.bactive ? "Inactive" : "Active"}".
          </Typography>
        </DialogContent>
        <DialogActions className="p-4">
          <Button onClick={handleCloseCompanyStatusDialog} color="primary" variant="outlined" className="px-4 py-2 rounded-lg font-semibold">
            No
          </Button>
          <Button
            onClick={handleToggleCompanyStatus}
            color={company?.bactive ? "error" : "success"}
            variant="contained"
            className={`px-4 py-2 rounded-lg font-semibold ${company?.bactive ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"} text-white`}
          >
            Yes, {company?.bactive ? "Deactivate" : "Activate"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* --- Add New Module Dialog --- */}
      <Dialog open={openAddModuleDialog} onClose={handleCloseAddModuleDialog} fullWidth maxWidth="sm">
        <DialogTitle className="text-2xl font-bold text-center text-gray-1000 border-b pb-4">Add New Module</DialogTitle>
        <DialogContent dividers>
          <div className="py-4 space-y-5">
            <TextField
              autoFocus
              margin="dense"
              id="module-name"
              label={<span>Module Name <span className="text-red-500">*</span></span>}
              type="text"
              fullWidth
              variant="outlined"
              value={newModuleName}
              onChange={(e) => setNewModuleName(e.target.value)}
              inputProps={{ maxLength: 25 }}
              error={moduleNameError}
              helperText={moduleNameError ? "Module Name is mandatory and must be 25 characters or less." : `Characters: ${newModuleName.length}/25`}
            />
            <TextField
              margin="dense"
              id="module-description"
              label="Description"
              type="text"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              value={newModuleDescription}
              onChange={(e) => setNewModuleDescription(e.target.value)}
              error={moduleDescriptionError}
              helperText={
                moduleDescriptionError
                  ? `Description must be 100 words or less. Current: ${newModuleDescription.trim().split(/\s+/).filter(word => word.length > 0).length} words.`
                  : `Words: ${newModuleDescription.trim().split(/\s+/).filter(word => word.length > 0).length}/100`
              }
            />
          </div>
        </DialogContent>
        <DialogActions className="p-4">
          <Button onClick={handleCloseAddModuleDialog} color="primary" variant="outlined" className="px-4 py-2 rounded-lg font-semibold">
            Cancel
          </Button>
          <Button onClick={handleAddModule} color="primary" variant="contained" className="px-4 py-2 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700">
            Add Module
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CompanyProfile;


// import { Button, IconButton } from "@mui/material"; // IconButton is imported but not used, kept for now.
// import { Line, Pie } from 'react-chartjs-2'; // Combine imports for brevity
// import ChatIcon from '@mui/icons-material/Chat';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import CallIcon from '@mui/icons-material/Call';
// import EditIcon from '@mui/icons-material/Edit'; // Added for the Edit button
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// import {Chart as ChartJS,
//   ArcElement,
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   Tooltip,
//   Legend
// } from 'chart.js';
// import { useCompanyController } from "./companyController";
// import formatDate from "../../utils/formatDate"; // Ensure this path is correct

// ChartJS.register(
//   ArcElement,
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   Tooltip,
//   Legend
// );

// const CompanyProfile = () => {
//   const { fetchCompanyDataById } = useCompanyController();
//   const [company, setCompany] = useState(null); // Initialize as null for clearer loading state

//   const { id } = useParams();

//   // Demo data for graph and pie chart (keeping as is per request)
//   const lineData = {
//     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
//     datasets: [
//       {
//         label: 'Sales',
//         data: [150, 200, 180, 220, 250],
//         borderColor: '#4A90E2', // Modern blue
//         backgroundColor: 'rgba(74, 144, 226, 0.2)', // Light blue fill
//         tension: 0.4,
//         fill: true, // Fill the area under the line
//         pointBackgroundColor: '#4A90E2',
//         pointBorderColor: '#fff',
//         pointHoverRadius: 6,
//         pointHoverBackgroundColor: '#4A90E2',
//         pointHoverBorderColor: '#fff',
//       },
//     ],
//   };

//   const lineOptions = {
//     responsive: true,
//     maintainAspectRatio: false, // Allow custom height
//     plugins: {
//       legend: {
//         position: 'top',
//         labels: {
//           font: {
//             size: 14,
//             family: 'Inter, sans-serif'
//           },
//           color: '#374151' // Gray-700
//         }
//       },
//       tooltip: {
//         backgroundColor: '#374151',
//         titleFont: { size: 14, family: 'Inter, sans-serif' },
//         bodyFont: { size: 12, family: 'Inter, sans-serif' },
//         padding: 10,
//         cornerRadius: 4,
//       }
//     },
//     scales: {
//       x: {
//         grid: {
//           display: false, // Hide x-axis grid lines
//         },
//         ticks: {
//           color: '#6B7280', // Gray-500
//           font: { family: 'Inter, sans-serif' }
//         },
//         border: {
//           display: false // Hide x-axis border line
//         }
//       },
//       y: {
//         beginAtZero: true,
//         grid: {
//           color: '#E5E7EB', // Light gray grid lines
//         },
//         ticks: {
//           color: '#6B7280', // Gray-500
//           font: { family: 'Inter, sans-serif' }
//         },
//         border: {
//           display: false // Hide y-axis border line
//         }
//       },
//     },
//   };

//   const pieData = {
//     labels: ['Sales', 'Marketing', 'Development', 'Support'],
//     datasets: [
//       {
//         label: 'Department Budget',
//         data: [300, 200, 400, 100],
//         backgroundColor: ['#4A90E2', '#FF6384', '#F5A623', '#50E3C2'], // Updated colors for vibrancy
//         borderColor: '#fff',
//         borderWidth: 2, // Thicker borders for slices
//       },
//     ],
//   };

//   const pieOptions = {
//     responsive: true,
//     maintainAspectRatio: false, // Allow custom height
//     plugins: {
//       legend: {
//         position: 'bottom',
//         labels: {
//           font: {
//             size: 14,
//             family: 'Inter, sans-serif'
//           },
//           color: '#374151' // Gray-700
//         }
//       },
//       tooltip: {
//         backgroundColor: '#374151',
//         titleFont: { size: 14, family: 'Inter, sans-serif' },
//         bodyFont: { size: 12, family: 'Inter, sans-serif' },
//         padding: 10,
//         cornerRadius: 4,
//         callbacks: {
//           label: function(context) {
//             let label = context.label || '';
//             if (label) {
//               label += ': ';
//             }
//             if (context.parsed !== null) {
//               label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed);
//             }
//             return label;
//           }
//         }
//       }
//     },
//   };

//   const enabledModules = [
//     {
//       name: "Leads",
//       description: "Manage potential customers before they convert into contacts or deals.",
//     },
//     {
//       name: "Contacts",
//       description: "Store individual contact details of clients, suppliers, or partners.",
//     },
//     {
//       name: "Deals",
//       description: "Track ongoing sales activities and their progress toward closure.",
//     },
//     {
//       name: "Support",
//       description: "Record and resolve customer issues using a structured ticketing system.",
//     },
//   ];

//   // Dynamically build full address, filtering out empty parts
//   const fullAddressParts = [
//     company?.caddress1,
//     company?.caddress2,
//     company?.caddress3,
//     company?.city?.cCity_name,
//     company?.country?.cCountry_name // Assuming a country field might exist
//   ].filter(Boolean); // Filter out null, undefined, and empty strings
//   const fullAddress = fullAddressParts.length > 0 ? fullAddressParts.join(', ') : 'N/A';

//   // Format dates
//   const created_at = formatDate(company?.dCreated_dt);
//   const modified_at = formatDate(company?.dModified_dt);

//   // Initial for company logo placeholder
//   const companyInitial = company?.cCompany_name?.charAt(0).toUpperCase() || '?';

//   useEffect(() => {
//     const loadCompany = async () => {
//       try {
//         const data = await fetchCompanyDataById(id);
//         setCompany(data);
//       } catch (error) {
//         console.error("Failed to fetch company data:", error);
//         setCompany(null); // Set to null on error to show "Loading..." or "N/A"
//       }
//     };

//     if (id) loadCompany();
//   }, [id, fetchCompanyDataById]); // Added fetchCompanyDataById to dependency array

//   return (
//     <div className="p-6 lg:p-8 space-y-8 bg-gray-50 min-h-screen font-sans antialiased">
//       {/* --- Header Section --- */}
//       <div className="bg-white rounded-xl shadow-md p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border border-gray-100">
//         <div className="flex items-center gap-6">
//           {/* Company Logo/Initial */}
//           {company?.cCompany_logo_url ? ( // Assuming a logo URL exists
//             <img src={company.cCompany_logo_url} alt="Company Logo" className="w-20 h-20 rounded-full object-cover shadow-sm ring-2 ring-blue-200" />
//           ) : (
//             <div className="w-20 h-20 flex items-center justify-center bg-blue-100 text-blue-700 font-extrabold rounded-full text-4xl shadow-sm ring-2 ring-blue-200">
//               {companyInitial}
//             </div>

//           )}

//           <div>
//             <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">
//               {company?.cCompany_name || "Loading Company..."}
//             </h1>
//             <p className="text-sm text-gray-500 mt-1">Company ID: {company?.iCompany_id || 'N/A'}</p>
//             <div className="flex flex-wrap gap-3 mt-4">
//               <Button
//                 variant="outlined"
//                 size="medium"
//                 startIcon={<ChatIcon />}
//                 className="!normal-case !text-blue-600 !border-blue-300 hover:!bg-blue-50 transition-colors"
//                 sx={{
//                   '&.MuiButton-outlined': {
//                     borderColor: '#93C5FD', // blue-300
//                     color: '#2563EB', // blue-600
//                     '&:hover': {
//                       backgroundColor: '#EFF6FF', // blue-50
//                       borderColor: '#60A5FA', // blue-400
//                     },
//                   },
//                 }}
//               >
//                 Message
//               </Button>
//               <Button
//                 variant="outlined"
//                 size="medium"
//                 startIcon={<NotificationsIcon />}
//                 className="!normal-case !text-purple-600 !border-purple-300 hover:!bg-purple-50 transition-colors"
//                 sx={{
//                   '&.MuiButton-outlined': {
//                     borderColor: '#D8B4FE', // purple-300
//                     color: '#9333EA', // purple-600
//                     '&:hover': {
//                       backgroundColor: '#F3E8FF', // purple-50
//                       borderColor: '#C084FC', // purple-400
//                     },
//                   },
//                 }}
//               >
//                 Reminders
//               </Button>
//               <Button
//                 variant="outlined"
//                 size="medium"
//                 startIcon={<CallIcon />}
//                 className="!normal-case !text-green-600 !border-green-300 hover:!bg-green-50 transition-colors"
//                 sx={{
//                   '&.MuiButton-outlined': {
//                     borderColor: '#86EFAC', // green-300
//                     color: '#16A34A', // green-600
//                     '&:hover': {
//                       backgroundColor: '#DCFCE7', // green-50
//                       borderColor: '#4ADE80', // green-400
//                     },
//                   },
//                 }}
//               >
//                 Call
//               </Button>
//             </div>
//           </div>
//         </div>
//         <button
//           className="bg-blue-600 text-white font-semibold rounded-lg px-4 py-2 hover:bg-blue-700 shadow-md hover:shadow-lg flex items-center gap-2 transition-all"
//         >
//           <EditIcon />
//           Edit Company
//         </button>

//       </div>

//       {/* --- Profile Info & Charts Section --- */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Company Profile Info Card (Span 2 columns on large screens) */}
//         <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6 border border-gray-100">
//           <h2 className="text-2xl font-bold text-gray-800 mb-6">Company Profile</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-5 gap-x-6 text-base text-gray-800">
//             {/* Column 1 */}
//             <p><span className="text-gray-500 font-medium">Company Name:</span> <span className="font-semibold">{company?.cCompany_name || "N/A"}</span></p>
//             <p><span className="text-gray-500 font-medium">Reseller ID:</span> <span className="font-semibold">{company?.iReseller_id || "N/A"}</span></p>
//             <p className="flex items-center gap-2">
//               <span className="text-gray-500 font-medium">Status:</span>
//               <span
//                 className={`
//                   text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm uppercase
//                   ${company?.bactive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}
//                 `}
//               >
//                 {company?.bactive ? "Active" : "Inactive"}
//               </span>
//             </p>
//             <p><span className="text-gray-500 font-medium">Subscription Plan:</span> <span className="font-semibold">{company?.pricing_plan?.plan_name || "N/A"}</span></p>
//             <p><span className="text-gray-500 font-medium">No. of Users:</span> <span className="font-semibold">{company?.iUser_no || "N/A"}</span></p>

//             {/* Column 2 */}
//             <p><span className="text-gray-500 font-medium">Phone Number:</span> <span className="font-semibold">{company?.iPhone_no || "N/A"}</span></p>
//             <p><span className="text-gray-500 font-medium">GST Number:</span> <span className="font-semibold">{company?.cGst_no || "N/A"}</span></p>
//             <p><span className="text-gray-500 font-medium">CIN Number:</span> <span className="font-semibold">{company?.icin_no || "N/A"}</span></p>
//             <p className="md:col-span-2 lg:col-span-1"><span className="text-gray-500 font-medium">Website:</span> <a href={`http://${company?.cWebsite}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 hover:underline">{company?.cWebsite || "N/A"}</a></p>


//             {/* Column 3 */}
//             <p className="md:col-span-2 lg:col-span-1"><span className="text-gray-500 font-medium">Address:</span> <span className="font-semibold">{fullAddress}</span></p>
//             <p><span className="text-gray-500 font-medium">Created At:</span> <span className="font-semibold">{created_at || "N/A"}</span></p>
//             <p><span className="text-gray-500 font-medium">Modified At:</span> <span className="font-semibold">{modified_at || "N/A"}</span></p>
//           </div>
//         </div>

//         {/* Charts Container (single column on large screens) */}
//         <div className="lg:col-span-1 bg-white rounded-xl shadow-md p-6 border border-gray-100 flex flex-col gap-6">
//           {/* Line Chart */}
//           {/* <div className="flex-1 min-h-[250px] relative"> 
//             <h3 className="text-xl font-bold text-gray-800 mb-4">Monthly Sales</h3>
//             <Line data={lineData} options={lineOptions} />
//           </div> */}

//           {/* Pie Chart */}
//          <div className="min-h-[250px] relative">
//           <h3 className="text-xl font-bold text-gray-800 mb-4">Budget Allocation</h3>
//           <div className="h-[250px]">
//             <Pie data={pieData} options={pieOptions} />
//           </div>
//         </div>
//         </div>
//       </div>

//       {/* --- General Settings Section --- */}
//       <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">General Settings</h2>
//         <div className="space-y-6">
//           {/* Setting Row: Preferred Currency */}
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-gray-200">
//             <div>
//               <p className="font-semibold text-gray-800 text-lg">Preferred Currency</p>
//               <p className="text-sm text-gray-500 mt-1">All transactions and reports will be displayed using this currency.</p>
//             </div>
//             <select className="border border-gray-300 px-4 py-2 rounded-lg text-base font-medium text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2 sm:mt-0 shadow-sm">
//               <option>₹ INR</option>
//               <option>$ USD</option>
//               <option>€ EUR</option>
//             </select>
//           </div>

//           {/* Setting Row: Time Zone */}
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-gray-200">
//             <div>
//               <p className="font-semibold text-gray-800 text-lg">Time Zone</p>
//               <p className="text-sm text-gray-500 mt-1">System events, reminders, and schedules will follow this time zone.</p>
//             </div>
//             <select className="border border-gray-300 px-4 py-2 rounded-lg text-base font-medium text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2 sm:mt-0 shadow-sm">
//               <option>GMT +5:30) Asia/Kolkata</option>
//               <option>GMT +1:00) Europe/London</option>
//               <option>GMT -8:00) America/Los_Angeles</option>
//             </select>
//           </div>

//           {/* Setting Row: Language */}
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center"> {/* No bottom border for last item */}
//             <div>
//               <p className="font-semibold text-gray-800 text-lg">Language</p>
//               <p className="text-sm text-gray-500 mt-1">The CRM interface and default communication will use this language.</p>
//             </div>
//             <select className="border border-gray-300 px-4 py-2 rounded-lg text-base font-medium text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2 sm:mt-0 shadow-sm">
//               <option>English</option>
//               <option>Hindi</option>
//               <option>Tamil</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* --- Enabled Modules Section --- */}
//       <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">Enabled Modules</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">
//           {enabledModules.map((module, index) => (
//             <div
//               key={index}
//               className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-sm"
//             >
//               <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0 shadow-md">
//                 ✓
//               </div>
//               <div>
//                 <p className="text-lg font-semibold text-gray-800">{module.name}</p>
//                 <p className="text-sm text-gray-600 mt-1">{module.description}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CompanyProfile;

//=======================================================================================================================================================
// import { Button, IconButton } from "@mui/material"; // IconButton is imported but not used, kept for now.
// import { Line, Pie } from 'react-chartjs-2'; // Combine imports for brevity
// import ChatIcon from '@mui/icons-material/Chat';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import CallIcon from '@mui/icons-material/Call';
// import EditIcon from '@mui/icons-material/Edit'; // Added for the Edit button
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// import {
//   Chart as ChartJS,
//   ArcElement,
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   Tooltip,
//   Legend
// } from 'chart.js';
// import { useCompanyController } from "./companyController";
// import formatDate from "../../utils/formatDate"; // Ensure this path is correct

// ChartJS.register(
//   ArcElement,
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   Tooltip,
//   Legend
// );

// const CompanyProfile = () => {
//   const { fetchCompanyDataById } = useCompanyController();
//   const [company, setCompany] = useState(null); // Initialize as null for clearer loading state

//   const { id } = useParams();

//   // Demo data for graph and pie chart (keeping as is per request)
//   const lineData = {
//     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
//     datasets: [
//       {
//         label: 'Sales',
//         data: [150, 200, 180, 220, 250],
//         borderColor: '#4A90E2', // Modern blue
//         backgroundColor: 'rgba(74, 144, 226, 0.2)', // Light blue fill
//         tension: 0.4,
//         fill: true, // Fill the area under the line
//         pointBackgroundColor: '#4A90E2',
//         pointBorderColor: '#fff',
//         pointHoverRadius: 6,
//         pointHoverBackgroundColor: '#4A90E2',
//         pointHoverBorderColor: '#fff',
//       },
//     ],
//   };

//   const lineOptions = {
//     responsive: true,
//     maintainAspectRatio: false, // Allow custom height
//     plugins: {
//       legend: {
//         position: 'top',
//         labels: {
//           font: {
//             size: 14,
//             family: 'Inter, sans-serif'
//           },
//           color: '#374151' // Gray-700
//         }
//       },
//       tooltip: {
//         backgroundColor: '#374151',
//         titleFont: { size: 14, family: 'Inter, sans-serif' },
//         bodyFont: { size: 12, family: 'Inter, sans-serif' },
//         padding: 10,
//         cornerRadius: 4,
//       }
//     },
//     scales: {
//       x: {
//         grid: {
//           display: false, // Hide x-axis grid lines
//         },
//         ticks: {
//           color: '#6B7280', // Gray-500
//           font: { family: 'Inter, sans-serif' }
//         },
//         border: {
//           display: false // Hide x-axis border line
//         }
//       },
//       y: {
//         beginAtZero: true,
//         grid: {
//           color: '#E5E7EB', // Light gray grid lines
//         },
//         ticks: {
//           color: '#6B7280', // Gray-500
//           font: { family: 'Inter, sans-serif' }
//         },
//         border: {
//           display: false // Hide y-axis border line
//         }
//       },
//     },
//   };

//   const pieData = {
//     labels: ['Sales', 'Marketing', 'Development', 'Support'],
//     datasets: [
//       {
//         label: 'Department Budget',
//         data: [300, 200, 400, 100],
//         backgroundColor: ['#4A90E2', '#FF6384', '#F5A623', '#50E3C2'], // Updated colors for vibrancy
//         borderColor: '#fff',
//         borderWidth: 2, // Thicker borders for slices
//       },
//     ],
//   };

//   const pieOptions = {
//     responsive: true,
//     maintainAspectRatio: false, // Allow custom height
//     plugins: {
//       legend: {
//         position: 'bottom',
//         labels: {
//           font: {
//             size: 14,
//             family: 'Inter, sans-serif'
//           },
//           color: '#374151' // Gray-700
//         }
//       },
//       tooltip: {
//         backgroundColor: '#374151',
//         titleFont: { size: 14, family: 'Inter, sans-serif' },
//         bodyFont: { size: 12, family: 'Inter, sans-serif' },
//         padding: 10,
//         cornerRadius: 4,
//         callbacks: {
//           label: function(context) {
//             let label = context.label || '';
//             if (label) {
//               label += ': ';
//             }
//             if (context.parsed !== null) {
//               label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed);
//             }
//             return label;
//           }
//         }
//       }
//     },
//   };

//   const enabledModules = [
//     {
//       name: "Leads",
//       description: "Manage potential customers before they convert into contacts or deals.",
//     },
//     {
//       name: "Contacts",
//       description: "Store individual contact details of clients, suppliers, or partners.",
//     },
//     {
//       name: "Deals",
//       description: "Track ongoing sales activities and their progress toward closure.",
//     },
//     {
//       name: "Support",
//       description: "Record and resolve customer issues using a structured ticketing system.",
//     },
//   ];

//   // Dynamically build full address, filtering out empty parts
//   const fullAddressParts = [
//     company?.caddress1,
//     company?.caddress2,
//     company?.caddress3,
//     company?.city?.cCity_name,
//     company?.country?.cCountry_name // Assuming a country field might exist
//   ].filter(Boolean); // Filter out null, undefined, and empty strings
//   const fullAddress = fullAddressParts.length > 0 ? fullAddressParts.join(', ') : 'N/A';

//   // Format dates
//   const created_at = formatDate(company?.dCreated_dt);
//   const modified_at = formatDate(company?.dModified_dt);

//   // Initial for company logo placeholder
//   const companyInitial = company?.cCompany_name?.charAt(0).toUpperCase() || '?';

//   useEffect(() => {
//     const loadCompany = async () => {
//       try {
//         const data = await fetchCompanyDataById(id);
//         setCompany(data);
//       } catch (error) {
//         console.error("Failed to fetch company data:", error);
//         setCompany(null); // Set to null on error to show "Loading..." or "N/A"
//       }
//     };

//     if (id) loadCompany();
//   }, [id, fetchCompanyDataById]); // Added fetchCompanyDataById to dependency array

//   return (
//     <div className="p-6 lg:p-8 space-y-8 bg-gray-50 min-h-screen font-sans antialiased">
//       {/* --- Header Section --- */}
//       <div className="bg-white rounded-xl shadow-md p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border border-gray-100">
//         <div className="flex items-center gap-6">
//           {/* Company Logo/Initial */}
//           {company?.cCompany_logo_url ? ( // Assuming a logo URL exists
//             <img src={company.cCompany_logo_url} alt="Company Logo" className="w-20 h-20 rounded-full object-cover shadow-sm ring-2 ring-blue-200" />
//           ) : (
//             <div className="w-20 h-20 flex items-center justify-center bg-blue-100 text-blue-700 font-extrabold rounded-full text-3xl shadow-sm ring-2 ring-blue-200">
//               {companyInitial}
//             </div>
//           )}

//           <div>
//             <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">
//               {company?.cCompany_name || "Loading Company..."}
//             </h1>
//             <p className="text-sm text-gray-500 mt-1">Company ID: {company?.iCompany_id || 'N/A'}</p>
//             <div className="flex flex-wrap gap-3 mt-4">
//               <Button
//                 variant="outlined"
//                 size="medium"
//                 startIcon={<ChatIcon />}
//                 className="!normal-case !text-blue-600 !border-blue-300 hover:!bg-blue-50 transition-colors"
//                 sx={{
//                   '&.MuiButton-outlined': {
//                     borderColor: '#93C5FD', // blue-300
//                     color: '#2563EB', // blue-600
//                     '&:hover': {
//                       backgroundColor: '#EFF6FF', // blue-50
//                       borderColor: '#60A5FA', // blue-400
//                     },
//                   },
//                 }}
//               >
//                 Message
//               </Button>
//               <Button
//                 variant="outlined"
//                 size="medium"
//                 startIcon={<NotificationsIcon />}
//                 className="!normal-case !text-purple-600 !border-purple-300 hover:!bg-purple-50 transition-colors"
//                 sx={{
//                   '&.MuiButton-outlined': {
//                     borderColor: '#D8B4FE', // purple-300
//                     color: '#9333EA', // purple-600
//                     '&:hover': {
//                       backgroundColor: '#F3E8FF', // purple-50
//                       borderColor: '#C084FC', // purple-400
//                     },
//                   },
//                 }}
//               >
//                 Reminders
//               </Button>
//               <Button
//                 variant="outlined"
//                 size="medium"
//                 startIcon={<CallIcon />}
//                 className="!normal-case !text-green-600 !border-green-300 hover:!bg-green-50 transition-colors"
//                 sx={{
//                   '&.MuiButton-outlined': {
//                     borderColor: '#86EFAC', // green-300
//                     color: '#16A34A', // green-600
//                     '&:hover': {
//                       backgroundColor: '#DCFCE7', // green-50
//                       borderColor: '#4ADE80', // green-400
//                     },
//                   },
//                 }}
//               >
//                 Call
//               </Button>
//             </div>
//           </div>
//         </div>
//         <Button
//           variant="contained"
//           size="large"
//           startIcon={<EditIcon />}
//           className="!bg-blue-600 !text-white !font-semibold !rounded-lg hover:!bg-blue-700 !shadow-md hover:!shadow-lg transition-all !normal-case"
//         >
//           Edit Company
//         </Button>
//       </div>

//       {/* --- Profile Info & Charts Section --- */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Company Profile Info Card (Span 2 columns on large screens) */}
//         <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6 border border-gray-100">
//           <h2 className="text-2xl font-bold text-gray-800 mb-6">Company Profile</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-5 gap-x-6 text-base text-gray-800">
//             {/* Column 1 */}
//             <p><span className="text-gray-500 font-medium">Company Name:</span> <span className="font-semibold">{company?.cCompany_name || "N/A"}</span></p>
//             <p><span className="text-gray-500 font-medium">Reseller ID:</span> <span className="font-semibold">{company?.iReseller_id || "N/A"}</span></p>
//             <p className="flex items-center gap-2">
//               <span className="text-gray-500 font-medium">Status:</span>
//               <span
//                 className={`
//                   text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm uppercase
//                   ${company?.bactive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}
//                 `}
//               >
//                 {company?.bactive ? "Active" : "Inactive"}
//               </span>
//             </p>
//             <p><span className="text-gray-500 font-medium">Subscription Plan:</span> <span className="font-semibold">{company?.pricing_plan?.plan_name || "N/A"}</span></p>
//             <p><span className="text-gray-500 font-medium">No. of Users:</span> <span className="font-semibold">{company?.iUser_no || "N/A"}</span></p>

//             {/* Column 2 */}
//             <p><span className="text-gray-500 font-medium">Phone Number:</span> <span className="font-semibold">{company?.iPhone_no || "N/A"}</span></p>
//             <p><span className="text-gray-500 font-medium">GST Number:</span> <span className="font-semibold">{company?.cGst_no || "N/A"}</span></p>
//             <p><span className="text-gray-500 font-medium">CIN Number:</span> <span className="font-semibold">{company?.icin_no || "N/A"}</span></p>
//             <p className="md:col-span-2 lg:col-span-1"><span className="text-gray-500 font-medium">Website:</span> <a href={`http://${company?.cWebsite}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 hover:underline">{company?.cWebsite || "N/A"}</a></p>


//             {/* Column 3 */}
//             <p className="md:col-span-2 lg:col-span-1"><span className="text-gray-500 font-medium">Address:</span> <span className="font-semibold">{fullAddress}</span></p>
//             <p><span className="text-gray-500 font-medium">Created At:</span> <span className="font-semibold">{created_at || "N/A"}</span></p>
//             <p><span className="text-gray-500 font-medium">Modified At:</span> <span className="font-semibold">{modified_at || "N/A"}</span></p>
//           </div>
//         </div>

//         {/* Charts Container (single column on large screens) */}
//         <div className="lg:col-span-1 bg-white rounded-xl shadow-md p-6 border border-gray-100 flex flex-col gap-6">
//           {/* Line Chart */}
//           {/* <div className="flex-1 min-h-[250px] relative"> 
//             <h3 className="text-xl font-bold text-gray-800 mb-4">Monthly Sales</h3>
//             <Line data={lineData} options={lineOptions} />
//           </div> */}

//           {/* Pie Chart */}
//          <div className="min-h-[250px] relative">
//           <h3 className="text-xl font-bold text-gray-800 mb-4">Budget Allocation</h3>
//           <div className="h-[250px]">
//             <Pie data={pieData} options={pieOptions} />
//           </div>
//         </div>
//         </div>
//       </div>

//       {/* --- General Settings Section --- */}
//       <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">General Settings</h2>
//         <div className="space-y-6">
//           {/* Setting Row: Preferred Currency */}
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-gray-200">
//             <div>
//               <p className="font-semibold text-gray-800 text-lg">Preferred Currency</p>
//               <p className="text-sm text-gray-500 mt-1">All transactions and reports will be displayed using this currency.</p>
//             </div>
//             <select className="border border-gray-300 px-4 py-2 rounded-lg text-base font-medium text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2 sm:mt-0 shadow-sm">
//               <option>₹ INR</option>
//               <option>$ USD</option>
//               <option>€ EUR</option>
//             </select>
//           </div>

//           {/* Setting Row: Time Zone */}
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-gray-200">
//             <div>
//               <p className="font-semibold text-gray-800 text-lg">Time Zone</p>
//               <p className="text-sm text-gray-500 mt-1">System events, reminders, and schedules will follow this time zone.</p>
//             </div>
//             <select className="border border-gray-300 px-4 py-2 rounded-lg text-base font-medium text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2 sm:mt-0 shadow-sm">
//               <option>GMT +5:30) Asia/Kolkata</option>
//               <option>GMT +1:00) Europe/London</option>
//               <option>GMT -8:00) America/Los_Angeles</option>
//             </select>
//           </div>

//           {/* Setting Row: Language */}
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center"> {/* No bottom border for last item */}
//             <div>
//               <p className="font-semibold text-gray-800 text-lg">Language</p>
//               <p className="text-sm text-gray-500 mt-1">The CRM interface and default communication will use this language.</p>
//             </div>
//             <select className="border border-gray-300 px-4 py-2 rounded-lg text-base font-medium text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2 sm:mt-0 shadow-sm">
//               <option>English</option>
//               <option>Hindi</option>
//               <option>Tamil</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* --- Enabled Modules Section --- */}
//       <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">Enabled Modules</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">
//           {enabledModules.map((module, index) => (
//             <div
//               key={index}
//               className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-sm"
//             >
//               <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0 shadow-md">
//                 ✓
//               </div>
//               <div>
//                 <p className="text-lg font-semibold text-gray-800">{module.name}</p>
//                 <p className="text-sm text-gray-600 mt-1">{module.description}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CompanyProfile;