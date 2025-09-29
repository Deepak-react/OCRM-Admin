// models/UserModel.js
import * as ApiHelper from '../../api/ApiHelper';
// import { getAll, getById, create, update, deActive } from '../../api/ApiHelper';
import { ENDPOINTS } from '../../api/ApiConstant';
import { getAll } from "../../api/ApiHelper";       


// to get all the company data.
export const getAllCompantData = async () => {
  //console.log(ENDPOINTS.COMPANIES);
  const res = await ApiHelper.getAll(ENDPOINTS.COMPANIES);
  //console.log("The errored response is :", res);
  return res.data; 
};


// to get all the currencies
export const getAllCurrencies = async () => {
  //console.log(ENDPOINTS.COMPANIES);
  const res = await ApiHelper.getAll(ENDPOINTS.COMPANIES);
  //console.log("The errored response is :", res);
  return res.data; 
};



// to get all the business types
export const getAllBusinessTypes = async () => {
  //console.log(ENDPOINTS.COMPANIES);
  const res = await ApiHelper.getAll(ENDPOINTS.COMPANIES);
  //console.log("The errored response is :", res);
  return res.data; 
};


export const getAuditLogs = async (company_id) => {
  //console.log(ENDPOINTS.COMPANIES);
  const res = await ApiHelper.getAll(ENDPOINTS.AUDIT_LOGS(company_id));
  console.log("The errored response is :", res);
  return res.data; 
};


export const changeUserStatus = async (user_id) => {
  //console.log(ENDPOINTS.COMPANIES);
  const res = await ApiHelper.deActive(user_id, ENDPOINTS.USER);
  console.log("The errored response is :", res);
  return res.data; 
};

//to add an new company.
export const addNewCompany = async (data) => {
  // console.log(ENDPOINTS.COMPANIES);
  // console.log(data);
  return await ApiHelper.create(data, ENDPOINTS.COMPANIES);
};




export const editCompany = async (data, company_id) => {
  console.log("The company data and the company id are :", data, company_id);
  const res = await ApiHelper.update(company_id,data,ENDPOINTS.COMPANIES);
  console.log("The errored response is :", res);
  return res.data; 
};


//to add an admin user when the company is created
export const addAdminUser= async (data) => {
  const res = await ApiHelper.create(data, ENDPOINTS.USER);
  return res.data;
};

//to get an company data based on the id.
export const getCompanyById = async (id) =>{
  //console.log(ENDPOINTS.COMPANIES);
  const res = await ApiHelper.getById(id, ENDPOINTS.COMPANIES);
  //console.log("The company data are :", res);  
  return res.data;
}

// to get all the user data based on the company id.
export const getUsersByCompanyId = async (companyId) => {
  try {
    const response = await getAll(ENDPOINTS.USER_TAB(companyId));
    return response.data;
  } catch (error) {
    throw error;
  }
};



// const getUsers = async () => {
//   try {
//     const response = await ApiHelper.get(ApiConstant.USER_TAB);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     throw error;
//   }
// };



