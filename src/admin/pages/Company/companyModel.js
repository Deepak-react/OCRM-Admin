// models/UserModel.js
import * as ApiHelper from '../../api/ApiHelper';
import { ENDPOINTS } from '../../api/ApiConstant';


// to get all the company data.
export const getAllCompantData = async () => {
  console.log(ENDPOINTS.COMPANIES);
  const res = await ApiHelper.getAll(ENDPOINTS.COMPANIES);
  console.log("The errored response is :", res);
  return res.data; 
};

//to add an new company.
export const addNewCompany = async (data) => {
  console.log(ENDPOINTS.COMPANIES);
  console.log(data);
  return await ApiHelper.create(data, ENDPOINTS.COMPANIES);
};

//to get an company data based on the id.
export const getCompanyById = async (id) =>{
  console.log(ENDPOINTS.COMPANIES);
  const res = await ApiHelper.getById(id, ENDPOINTS.COMPANIES);
  console.log("The company data are :", res);  
  return res.data;
}


