export const BASE_URL = import.meta.env.VITE_API_URL;

export const ENDPOINTS = {
  BASE_URL_IS: BASE_URL,
  LOGIN: `${BASE_URL}/login`,
  FORGOT_PASSWORD: `${BASE_URL}/forgot-password`,
  UPDATE_PASSWORD: `${BASE_URL}/update-password`,
  // PLAN_TYPE: `${BASE_URL}/pricing-plans`,
  // RESELLER: `${BASE_URL}/reseller`,
  // LEAD_STATUS: `${BASE_URL}/lead-status/company-lead`, // UPDATED 20/6
  // LEAD_STATUS_ACTION: `${BASE_URL}/lead-status/action-logs`,
  // LEAD: `${BASE_URL}/lead/user/`,
  // USERS: `${BASE_URL}/users`,
  ROLE: `${BASE_URL}/role`,
  // FOLLOW_UP: `${BASE_URL}/calender-event`,
  // DASHBOARD_USER: `${BASE_URL}/lead/dashboard`,
  // CREATE_EVENT: `${BASE_URL}/calender-event`,
  // DASHBOARD_MANAGER: `${BASE_URL}/lead/manager`,
  // REMINDERS: `${BASE_URL}/reminder/get-reminder`,
  // LEAD_STATUS_UPDATE: `${BASE_URL}/lead`,
  // CONVERT_TO_DEAL: `${BASE_URL}/lead/convert-to-deal`,
  // USER_REMINDER: `${BASE_URL}/reminder/user-reminder`,
  // USER_CREATION: `${BASE_URL}/users`,
  // GET_USERS: `${BASE_URL}/users`,
  // CONVERT_TO_LOST: `${BASE_URL}/lead`,
  // EXPORT_LEADS: `${BASE_URL}/lead/download`,
  // LOST_LEADS: `${BASE_URL}/reports/lost-leads`,
  // STAGE_LEADS: `${BASE_URL}/reports/sales-stage-leads`,
  // COMPANY_GET: `${BASE_URL}/lead/company-dashboard/`,
  USER_GET: `${BASE_URL}/users`,
  // NOTIFICATIONS: `${BASE_URL}/notifications`,
  // TERRITORY_LEADS: `${BASE_URL}/reports/territory-leads`,
  // FEEDBACK: `${BASE_URL}/reports/feedback`,
  
  
};

// export const BASE_URL = import.meta.env.VITE_API_URL;

// console.log("Base URL:", BASE_URL);

// // Define all API endpoints relative to BASE_URL
// export const ENDPOINTS = {
//   BASE_URL_IS: BASE_URL,
//   LOGIN: `${BASE_URL}/login`,
//   SIGNUP: `${BASE_URL}/admin/dashboard`,


//   // Add more endpoints here as needed
// };

