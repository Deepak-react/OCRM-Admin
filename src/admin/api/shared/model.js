// models/UserModel.js
import * as ApiHelper from '../ApiHelper';
import { ENDPOINTS } from '../ApiConstant';


// to get all the companies.
export const getAllCompanies = async () => {
  const res = await ApiHelper.getAll(ENDPOINTS.COMPANIES);
  return res.data; 
};

export const  getAllCities  = async ()=>{
  const res = await ApiHelper.getAll(ENDPOINTS.CITY);
  return res.data.cities;
}

export const  getAllRoles  = async ()=>{
  const res = await ApiHelper.getAll(ENDPOINTS.ROLE);
  return res.data;
}



