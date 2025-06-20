// models/UserModel.js
import * as ApiHelper from '../../api/ApiHelper';
import { ENDPOINTS } from '../../api/ApiConstant';


// to get all the company data.
export const getAllResellerData = async () => {
  console.log(ENDPOINTS.RESELLER);
  const res = await ApiHelper.getAll(ENDPOINTS.RESELLER);
  console.log("The errored response is :", res);
  return res.data; 
};

//to add an new company.
export const addNewReseller = async (data) => {
  console.log(ENDPOINTS.RESELLER);
  console.log(data);
  return await ApiHelper.create(data, ENDPOINTS.RESELLER);
};


//to get an company data based on the id.
export const getResellerById = async (id) =>{
  console.log(ENDPOINTS.RESELLER);
  const res = await ApiHelper.getById(id, ENDPOINTS.RESELLER);
  console.log("The reseller data are :", res);  
  return res.data;
}


