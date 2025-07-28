import { Button, IconButton, Tabs, Tab, Box, Typography, Menu, MenuItem, Switch, FormControlLabel, TextField, Autocomplete } from "@mui/material";
import { Line, Pie } from 'react-chartjs-2';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Chart as ChartJS, ArcElement, LineElement, CategoryScale, LinearScale,
  PointElement, Tooltip, Legend } from 'chart.js';
import { useCompanyController } from "./companyController";
import { useSharedController } from "../../api/shared/controller";
import formatDate from "../../utils/formatDate";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import GeneralSettingsTab from './GeneralSettingsTab';  
import MasterData from "../Masters/masterData.jsx";
import LeadStatus from "../Masters/Status/leadStauts.jsx";
import LeadPotential from "../Masters/Potential/leadPotential.jsx";
import LeadSource from "../Masters/Source/leadSource.jsx";
import LeadIndustry from "../Masters/Industry/industry.jsx";
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


const MasterDataPanel = ({companyData}) => {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const cardData = [
    { id: 1, title: 'Lead Status', description: 'Current stage of the lead.', icon: '/icons/status.svg', component: 'LeadStatus' },
    { id: 2, title: 'Lead Potential', description: 'Business value of the lead.', icon: '/icons/progress.svg', component: 'LeadPotential' },
    { id: 3, title: 'Lead Source', description: 'Business value of the lead.', icon: '/icons/industrial-park.svg', component: 'LeadSource' },
    { id: 4, title: 'Lead Industry', description: 'Business value of the lead.', icon: '/icons/industrial-park.svg', component: 'LeadIndustry' },
    { id: 5, title: 'Country', description: 'Leads across the country.', icon: '/icons/industrial-park.svg', component: 'LeadIndustry' },
    


    // Add more cards here...
  ];

  const renderComponent = () => {
    console.log("Selected company:", companyData);
    switch (selectedComponent) {
      case 'LeadStatus':
        return <LeadStatus company={companyData} />;
      case 'LeadPotential':
        return <LeadPotential company = {companyData}/>;
      case 'LeadSource':
        return <LeadSource company = {companyData}/>;  
      case 'LeadIndustry':
        return <LeadIndustry />;    
      // Add more cases for other master data
      default:
        return null;
    }
  };

  // Step 1: If a card is selected, show its component
  if (selectedComponent) {
    return (
      <div className="p-4">
        <button
          onClick={() => setSelectedComponent(null)}
          className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          ← Back to Master Cards
        </button>
        {renderComponent()}
      </div>
    );
  }

  // Step 2: Show cards when no component is selected
  return (

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cardData.map(card => (
          <button
            key={card.id}
            onClick={() => setSelectedComponent(card.component)}
            className="text-left group w-full"
          >
            <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition transform group-hover:-translate-y-1 border border-gray-200 h-full flex flex-col justify-between">
              <div className="flex items-start mb-4">
                <img src={card.icon} alt={card.title} className="w-10 h-10 mr-4" />
                <h3 className="text-xl font-semibold text-gray-900">{card.title}</h3>
              </div>
              <p className="text-sm text-gray-600">{card.description}</p>
            </div>
          </button>
        ))}
      </div>
  );
};



const CompanyProfile = () => {
  const { fetchCompanyDataById, usersByCompany, changeUserStatus, editCompanyDetails, fetchUsersByCompanyId, error } = useCompanyController();
  const {fetchAllCities, cities} = useSharedController();

  const [company, setCompany] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;



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


  //funciton to calculate the total number of pages
  // Calculate total pages
const totalPages = Math.ceil((Array.isArray(usersByCompany) ? usersByCompany.length : 0) / usersPerPage);

// Slice data based on currentPage
const paginatedUsers = (usersByCompany || []).slice(
  (currentPage - 1) * usersPerPage,
  currentPage * usersPerPage
);

  // Removed static 'users' state: const [users, setUsers] = useState([...]);

  // Dynamically build full address, filtering out empty parts
  const fullAddressParts = [
    company?.result.caddress1,
    company?.result.caddress2,
    company?.result.caddress3,
    company?.result.city?.cCity_name,
    company?.result.country?.cCountry_name
  ].filter(Boolean);
  const fullAddress = fullAddressParts.length > 0 ? fullAddressParts.join(', ') : '-';

  // Format dates
  const created_at = formatDate(company?.result.dCreated_dt);
  const modified_at = formatDate(company?.result.dModified_dt);

  // Initial for company logo placeholder
  const companyInitial = company?.result.cCompany_name?.charAt(0).toUpperCase() || '?';

  // Effect to fetch company data
  useEffect(() => {
    const loadCompany = async () => {
      try {
        const data = await fetchCompanyDataById(id);
        console.log("The company data is:", data);  
        setCompany(data);
        console.log("Rendered with id:", id);
      } catch (error) {
        console.error("Failed to fetch company data:", error);
        setCompany(null);
      }
    };

    if (id) loadCompany();
  }, [id]);


  // Effect to fetch users when the Users tab is active and company ID is available
  useEffect(() => {
    if (activeTab === 2 && id) { // Only fetch when 'Users' tab is active and a company ID is available
      //console.log("Fetching users for company ID:", id);
      console.log("Fetching users for company ID:", id);
      fetchUsersByCompanyId(id); 
    }
  }, [activeTab]); // Dependencies for this useEffect


  // for edit form
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editCompanyData, setEditCompanyData] = useState({});

  const handleOpenEditDialog = async () => {
    console.log("Opening edit dialog with company data:", company);
    await fetchAllCities(); // Fetch cities when opening the edit dialog
    setEditCompanyData(company.result);
    setOpenEditDialog(true);
  };

  // Function to close the edit dialog
  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  // Function to handle changes in the edit form fields
  const handleEditFormChange = (e) => {
  const { name, value } = e.target;

  // Fields that must be converted to integers
  const intFields = ['iUser_no', 'iReseller_id', 'iPhone_no', 'ireseller_admin_id', 'isubscription_plan'];

  setEditCompanyData(prevData => ({
    ...prevData,
    [name]: intFields.includes(name) ? (value === '' ? '' : parseInt(value, 10)) : value
  }));
};


  // Function to handle saving the edited company data
  const handleSaveEditedCompany = () => {

    const { iCompany_id,iReseller_id,icity_id,ireseller_admin_id,isubscription_plan, ...payload } = editCompanyData;
    editCompanyDetails(payload, editCompanyData.iCompany_id);
    //console.log("Saving edited company data:", editCompanyData);
    setOpenEditDialog(false);
  };

  // State for activate/deactivate user dialog
  const [openUserStatusDialog, setOpenUserStatusDialog] = useState(false);
  const [userToModify, setUserToModify] = useState(null);
  const [userActive, setUserActive] = useState(1);


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

  const handleToggleUserStatus =  async () => {
    if (userToModify) {
        console.log(userToModify);                
        await changeUserStatus(userToModify.iUser_id);
        const newStatus = userToModify.bactive ? 'Inactive' : 'Active';
      console.log(`Attempting to ${newStatus} user: ${userToModify.cFull_name}. (Implement API call here)`);
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
      const newBactiveStatus = !company.result.bactive;
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
  const [inputValue, setInputValue] = useState('');

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
              {company?.result.cCompany_name || "Loading Company..."}
            </h1>
            <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
              Company ID: <span className="font-semibold text-gray-700">{company?.result.iCompany_id || '-'}</span>
              {company && (
                <span
                  className={`
                    text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm uppercase
                    ${company.result.bactive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}
                  `}
                >
                  {company.result.bactive ? "Active" : "Inactive"}
                </span>
              )}
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Subscription Plan: <span className="font-semibold text-gray-700">{company?.result.pricing_plan?.plan_name || "-"}</span>
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
      <div className="bg-white rounded-xl shadow-md p-0 border border-gray-100">
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

            <div className="lg:col-span-3 bg-white rounded-xl  p-6 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Company Details</h2>
              {/* The grid below ensures content wraps and flows responsively */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-5 gap-x-6 text-base text-gray-800">
                {/* Column 1 */}
                <p className="flex items-center gap-2"><img src="/icons/company.png" alt="Company" width={30} height={30} /><span className="font-semibold">{company?.result.cCompany_name || "-"}</span></p>
                <p className="flex items-center gap-2"><PhoneIcon className="text-gray-500" /> <span className="font-semibold">{company?.result.iPhone_no || "-"}</span></p>
                <p className="flex items-center gap-2"><EmailIcon className="text-gray-500" /><span className="font-semibold">{company?.result.cemail_address || "-"}</span></p>
                <p className="md:col-span-2 lg:col-span-1 flex items-center gap-2"><LanguageIcon className="text-gray-500" /><a href={`http://${company?.result.cWebsite}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 hover:underline">{company?.result.cWebsite || "-"}</a></p>
                <p className="flex items-center gap-2"><img src="/icons/reseller.png" alt="Reseller" width={30} height={30} /><span className="font-semibold">{company?.result.iReseller_id || "-"}</span></p>
                <p className="flex items-center gap-2"><img src="/icons/user.png" alt="User" width={30} height={30} /><span className="font-semibold">{company?.result.iUser_no || "-"}</span></p>
                <p className="flex items-center gap-2"><img src="/icons/gst.png" alt="GST Number" width={30} height={30} /><span className="font-semibold">{company?.result.cGst_no || "-"}</span></p>
                <p className="flex items-center gap-2"><img src="/icons/cin.png" alt="CIN Number" width={30} height={30} /> <span className="font-semibold">{company?.result.icin_no || "-"}</span></p>
                <p className="md:col-span-2 lg:col-span-1 flex items-start gap-2"><LocationOnIcon className="text-gray-500 mt-1" /><span className="font-semibold">{fullAddress}</span></p>
                <p className="flex items-center gap-2"><EventIcon className="text-gray-500" /><span className="font-semibold">{created_at || "-"}</span></p>
                <p className="flex items-center gap-2"><EditDocumentIcon className="text-gray-500" /> <span className="font-semibold">{modified_at || "-"}</span></p>
                <p className="flex items-center gap-2"><EditDocumentIcon className="text-gray-500" /> <span className="font-semibold">{company?.totalLeads || "-"}</span></p>                
              </div>
            </div>
          </div>
          {/* Pie Chart */}
          <div className="lg:col-span-1 bg-white rounded-xl p-6 border border-gray-100 flex flex-col gap-6 mt-6"> {/* Added mt-6 for spacing */}
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
        {console.log("usersByCompany length 2 :", usersByCompany)}
          <GeneralSettingsTab />
        </CustomTabPanel>


        {/* --- Tab Panel: Users --- */}
<CustomTabPanel value={activeTab} index={2}>
            {    console.log("The users list are :", usersByCompany)}
          {console.log("usersByCompany length are:", paginatedUsers)}
            {/* Display error from the controller */}
            {error && <p className="text-red-500 mb-4">Error: {error}</p>}
            {paginatedUsers.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {/* Iterate over usersByCompany fetched from the API */}
                    { paginatedUsers.map((user) => (
                      <tr key={user.iUser_id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.cFull_name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.cEmail}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(user.dCreate_dt).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`
                              px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                              ${user.bactive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                            `}
                          >
                            {user.bactive ? "Active" : "Deactivated"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          
                          {user.bactive ?  <IconButton
                            aria-label="more"
                            aria-controls={`user-actions-menu-${user.iUser_id}`}
                            aria-haspopup="true"
                            onClick={(event) => handleMenuOpen(event, user)}
                          >
                            <MoreVertIcon />
                          </IconButton> : 
                          
                          <></>}
                          
                         
                          {userToModify?.iUser_id === user.iUser_id && (
                            <Menu
                              id={`user-actions-menu-${user.iUser_id}`}
                              anchorEl={anchorEl}
                              open={Boolean(anchorEl)}
                              onClose={handleMenuClose}
                              MenuListProps={{
                                "aria-labelledby": "more-button",
                              }}
                              PaperProps={{
                                style: {
                                  maxHeight: 48 * 4.5,
                                  width: "20ch",
                                },
                              }}
                            >
                              <MenuItem onClick={handleOpenStatusConfirmation}>{user.bactive ? "Deactivate" : "Activate"}</MenuItem>
                            </Menu>
                          )}
                        </td>
                      </tr>
                    ))
                   }
                  </tbody> 
                  
                  
                </table>
                   <div className="flex justify-center mt-4 space-x-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                  Prev
                </button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 rounded ${
                      currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>

              </div> 
            ) : (
              <div className="p-6 text-center">
              <p className="text-red-500">No user data available for this company.</p>
              </div>
            )}
        </CustomTabPanel>

      </div>

      <CustomTabPanel value={activeTab} index={3}> {/* New index for Masters */}
        {/* <MasterData /> */}
        {console.log("Company data in MasterDataPanel:", company?.result.cCompany_name)}
        <MasterDataPanel companyData = {company?.result.cCompany_name}/>

      </CustomTabPanel>
      <CustomTabPanel value={activeTab} index={4}>
        <AuditLoginTab company_id={company?.result.iCompany_id}/>
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
              value={editCompanyData?.cemail_address || ''}
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
                      <Autocomplete
            options={cities}
            getOptionLabel={(option) => option.cCity_name || ''}
            value={editCompanyData?.city || null}
            onChange={(event, newValue) => {
              setEditCompanyData(prev => ({
                ...prev,
                city: newValue || { cCity_name: '' } // handle clearing
              }));
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
              // Optional: Trigger API call here for dynamic search
            }}
            isOptionEqualToValue={(option, value) =>
              option.cCity_name === value?.cCity_name
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label={
                  <span>
                    City <span className="text-red-500">*</span>
                  </span>
                }
                fullWidth
                variant="outlined"
              />
            )}
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
            Are you sure you want to {userToModify?.bactive ? "deactivate" : "activate"} user: <span className="font-semibold">{userToModify?.cFull_name}</span>?
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
    </div>
  );
}

export default CompanyProfile;

