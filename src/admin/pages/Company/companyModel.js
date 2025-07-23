// models/UserModel.js
import * as ApiHelper from '../../api/ApiHelper';
import { getAll, getById, create, update, deActive } from '../../api/ApiHelper';
import { ENDPOINTS } from '../../api/ApiConstant';


// to get all the company data.
export const getAllCompantData = async () => {
  //console.log(ENDPOINTS.COMPANIES);
  const res = await ApiHelper.getAll(ENDPOINTS.COMPANIES);
  //console.log("The errored response is :", res);
  return res.data; 
};

//to add an new company.
export const addNewCompany = async (data) => {
  // console.log(ENDPOINTS.COMPANIES);
  // console.log(data);
  return await ApiHelper.create(data, ENDPOINTS.COMPANIES);
};


//to add an admin user when the company is created
export const addAdminUser= async (data) => {
  return await ApiHelper.create(data, ENDPOINTS.USER);
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
  //console.log(`Fetching users for company ID: ${companyId} using new API structure`);
  try {
    const response = await getAll(ENDPOINTS.USER_TAB(companyId));
    //console.log("Users fetched successfully:", response);
    return response.data; 
  } catch (error) {
    //console.error("Error fetching users:", error);
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



