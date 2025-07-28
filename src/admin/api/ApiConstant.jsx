// Load the base API URL from the .env file
export const BASE_URL = import.meta.env.VITE_API_URL;


// Define all API endpoints relative to BASE_URL
export const ENDPOINTS = {
  BASE_URL_IS: BASE_URL,
  LOGIN: `${BASE_URL}/login`,
  DASHBOARD: `${BASE_URL}/admin/dashboard`,
  LEAD_STATUS: `${BASE_URL}/lead-status/`,
  COMPANIES : `${BASE_URL}/company/`,
  LEAD_POTENTIAL : `${BASE_URL}/lead-potential/`,
  INDUSTRY : `${BASE_URL}/lead-industry/`,
  LEAD_SOURCE : `${BASE_URL}/lead-source/`,
  CITY : `${BASE_URL}/city/`, 
  USER : `${BASE_URL}/users/`, 
  ADMIN_DASHBOARD : `${BASE_URL}/admin-dashboard/`,
  RESELLER : `${BASE_URL}/reseller/`, 
  USER_TAB : (companyId) => `${BASE_URL}/users/company/${companyId}`,
  AUDIT_LOGS : (companyId) => `${BASE_URL}/admin-dashboard/userAudit/${companyId}`,

};

