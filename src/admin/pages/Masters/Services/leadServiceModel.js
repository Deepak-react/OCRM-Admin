// models/UserModel.js
import * as ApiHelper from '../../../api/ApiHelper';
import { ENDPOINTS } from '../../../api/ApiConstant';


// to get all the lead status.
export const getAllLeadServices = async () => {
  console.log(ENDPOINTS.LEAD_SERVICE);
  const res = await ApiHelper.getAll(ENDPOINTS.LEAD_SERVICE);
  console.log("The response data is :", res);
  return res.data; 
};

//to add an new lead status.
export const addNewLeadService = async (data) => {
  console.log(ENDPOINTS.LEAD_SERVICE);
  return await ApiHelper.create(data, ENDPOINTS.LEAD_SERVICE,);
};


