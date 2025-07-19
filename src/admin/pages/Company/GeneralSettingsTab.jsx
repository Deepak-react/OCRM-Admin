import React, { useState } from 'react';
import { Box, Typography, Switch, FormControlLabel, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import EditIcon from '@mui/icons-material/Edit'; // Import Edit icon for Material-UI

// Regex for email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Regex for app password: alphanumeric characters only (no spaces, no symbols)
const appPasswordRegex = /^[a-z]*$/;

const GeneralSettingsTab = ({
  company,
  openCompanyStatusDialog,
  handleOpenCompanyStatusDialog,
  handleCloseCompanyStatusDialog,
  handleToggleCompanyStatus,
}) => {
  // State for Default Email Account fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    appPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  // New state for field errors
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [appPasswordError, setAppPasswordError] = useState('');

  // New state to manage if the email account fields are in edit mode
  const [isEmailEditing, setIsEmailEditing] = useState(true); 
  // State to store the saved email data
  const [savedEmailData, setSavedEmailData] = useState({
    name: '',
    email: '',
    // In a real app, you would NEVER store appPassword directly like this after save.
    // It should be encrypted/tokenized and handled securely on the backend.
    // For this UI example, we'll store a placeholder or masked value.
    appPassword: '',
  });


  // Handler for form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));

    // Clear specific field errors on change
    if (name === 'name' && nameError) setNameError('');
    if (name === 'email' && emailError) setEmailError('');
    if (name === 'appPassword' && appPasswordError) setAppPasswordError('');
  };

  // Validation function
  const validateEmailForm = () => {
    let isValid = true;

    // Name validation
    if (!formData.name.trim()) {
      setNameError('Name is mandatory.');
      isValid = false;
    } else if (formData.name.length > 25) {
      setNameError('Name cannot exceed 25 characters.');
      isValid = false;
    } else {
      setNameError('');
    }

    // Email validation
    if (!formData.email.trim()) {
      setEmailError('Email Address is mandatory.');
      isValid = false;
    } else if (formData.email.length > 50) {
      setEmailError('Email Address cannot exceed 50 characters.');
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      setEmailError('Invalid Email Address format.');
      isValid = false;
    } else {
      setEmailError('');
    }

    // App Password validation
    if (!formData.appPassword.trim()) {
      setAppPasswordError('App Password is mandatory.');
      isValid = false;
    } else if (formData.appPassword.length > 19) {
      setAppPasswordError('App Password cannot exceed 19 characters.');
      isValid = false;
    } else if (!appPasswordRegex.test(formData.appPassword)) {
      setAppPasswordError('App Password can only contain lowercase letters (a–z)');
      isValid = false;
    } else {
      setAppPasswordError('');
    }

    return isValid;
  };


  // Handler for saving email account details
  const handleSaveEmailAccount = () => {
    if (validateEmailForm()) {
      // In a real application, you would send formData to your backend API here
      console.log("Saving email account details:", formData);
      setSavedEmailData(formData); // Store the current form data as saved data
      setIsEmailEditing(false); // Switch to view mode
      setShowPassword(false); // Hide password after saving
    }
  };

  // Handler for editing email account details
  const handleEditEmailAccount = () => {
    // When editing, load the saved data back into the form fields
    setFormData(savedEmailData);
    setIsEmailEditing(true); // Switch to edit mode
  };


  // State for dynamically managed modules (moved from CompanyProfile)
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

  // State and Handlers for Add Module Dialog (moved from CompanyProfile)
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


  return (
    <Box>
      <div className="space-y-8">
        {/* General Settings Section */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">General Settings</h2>
          <div className="space-y-6">
            {/* Setting Row: Company Status Toggle */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-gray-200">
              <div>
                <p className="font-semibold text-gray-800 text-lg">Company Status</p>
                <p className="text-sm text-gray-500 mt-1">
                  Toggle to {company?.bactive ? "deactivate" : "activate"} this company's account.
                </p>
              </div>
              <FormControlLabel
                control={
                  <Switch
                    checked={company?.bactive || false}
                    onChange={handleOpenCompanyStatusDialog}
                    name="companyStatus"
                    color="primary"
                  />
                }
                label={company?.bactive ? "Active" : "Inactive"}
                labelPlacement="start"
                className="mt-2 sm:mt-0"
              />
            </div>

            {/* Setting Row: Preferred Currency */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-gray-200">
              <div>
                <p className="font-semibold text-gray-800 text-lg">Preferred Currency</p>
                <p className="text-sm text-gray-500 mt-1">All transactions and reports will be displayed using this currency.</p>
              </div>
              <select className="border border-gray-300 px-4 py-2 rounded-lg text-base font-medium text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2 sm:mt-0 shadow-sm">
                <option>₹ INR</option>
                <option> $ USD</option>
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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
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

        {/* Default Email Account Section */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mt-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Default Email Account</h2>
            {isEmailEditing ? (
              <Button
                variant="contained"
                onClick={handleSaveEmailAccount}
                sx={{ bgcolor: '#2563EB', '&:hover': { bgcolor: '#1D4ED8' } }}
              >
                Save
              </Button>
            ) : (
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={handleEditEmailAccount}
                sx={{ color: '#2563EB', borderColor: '#2563EB', '&:hover': { borderColor: '#1D4ED8', color: '#1D4ED8' } }}
              >
                Edit
              </Button>
            )}
          </div>

          {/* Form Fields/Display */}
          {/* Changed this section to use flexbox for same-line alignment */}
          <div className="space-y-4"> {/* Use space-y-4 for vertical spacing between rows */}
            {/* Name Field */}
            <div className="flex items-center gap-4"> {/* Flex container for label and input */}
              <label htmlFor="email-name" className="block text-sm font-medium text-gray-600 w-32 flex-shrink-0">Name <span className="text-red-600">*</span></label>
              {isEmailEditing ? (
                <TextField
                  id="email-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  fullWidth
                  variant="outlined"
                  inputProps={{ maxLength: 25 }}
                  error={!!nameError}
                  helperText={nameError || `Characters: ${formData.name.length}/25`}
                  sx={{ '.MuiInputBase-input': { height: '24px', padding: '10px 14px' }, '.MuiInputLabel-root': { transform: 'translate(14px, 10px) scale(1)' }, '.MuiInputLabel-shrink': { transform: 'translate(14px, -9px) scale(0.75)' } }}
                />
              ) : (
                <Typography className="text-base font-medium text-gray-800 py-2">{savedEmailData.name || '-'}</Typography>
              )}
            </div>

            {/* Email Address Field */}
            <div className="flex items-center gap-4"> {/* Flex container for label and input */}
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-600 w-32 flex-shrink-0">Email Address <span className="text-red-600">*</span></label>
              {isEmailEditing ? (
                <TextField
                  id="email-address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  fullWidth
                  variant="outlined"
                  inputProps={{ maxLength: 50 }}
                  error={!!emailError}
                  helperText={emailError || `Characters: ${formData.email.length}/50`}
                  sx={{ '.MuiInputBase-input': { height: '24px', padding: '10px 14px' }, '.MuiInputLabel-root': { transform: 'translate(14px, 10px) scale(1)' }, '.MuiInputLabel-shrink': { transform: 'translate(14px, -9px) scale(0.75)' } }}
                />
              ) : (
                <Typography className="text-base font-medium text-gray-800 py-2">{savedEmailData.email || '-'}</Typography>
              )}
            </div>

            {/* App Password Field */}
            <div className="flex items-center gap-4 relative"> {/* Flex container for label and input */}
              <label htmlFor="app-password" className="block text-sm font-medium text-gray-600 w-32 flex-shrink-0">App Password <span className="text-red-600">*</span></label>
              {isEmailEditing ? (
                <>
                  <TextField
                    id="app-password"
                    type={showPassword ? "text" : "password"}
                    name="appPassword"
                    value={formData.appPassword}
                    onChange={handleChange}
                    placeholder="Enter app password"
                    fullWidth
                    variant="outlined"
                    inputProps={{ maxLength: 19 }}
                    error={!!appPasswordError}
                    helperText={appPasswordError || `Characters: ${formData.appPassword.length}/19 (lowercase letters (a–z) only, no symbols)`}
                    sx={{ '.MuiInputBase-input': { height: '24px', padding: '10px 14px' }, '.MuiInputLabel-root': { transform: 'translate(14px, 10px) scale(1)' }, '.MuiInputLabel-shrink': { transform: 'translate(14px, -9px) scale(0.75)' } }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-gray-500 hover:text-gray-700"
                    style={{top: '35%', transform: 'translateY(-50%)'}} // Vertically center the eye icon
                  >
                    {showPassword ? (
                      <EyeIcon className="h-5 w-5" />
                    ) : (
                      <EyeSlashIcon className="h-5 w-5" />
                    )}
                  </button>
                </>
              ) : (
                <Typography className="text-base font-medium text-gray-800 py-2">
                  {savedEmailData.appPassword ? '********' : '-'}
                </Typography>
              )}
            </div>
          </div>
        </div>

        {/* Enabled Modules Section */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Enabled Modules
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleOpenAddModuleDialog}
              sx={{ ml: 2, bgcolor: '#2563EB', '&:hover': { bgcolor: '#1D4ED8' } }}
            >
              Add Module
            </Button>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-5">
            {modules.map((module, index) => (
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

      {/* --- Company Status Confirmation Dialog (remains here) --- */}
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

      {/* --- Add New Module Dialog (remains here) --- */}
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
    </Box>
  );
};

export default GeneralSettingsTab;