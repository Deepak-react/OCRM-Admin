// models/UserModel.js
import * as ApiHelper from '../../../api/ApiHelper';
import { ENDPOINTS } from '../../../api/ApiConstant';


// to get all the lead status.
export const getAllLeadSource = async () => {
  console.log(ENDPOINTS.LEAD_SOURCE);
  const res = await ApiHelper.getAll(ENDPOINTS.LEAD_SOURCE);
  console.log("The errored response is :", res);
  return res.data; 
};

//to add an new lead status.
export const addNewLeadSource = async (data) => {
  console.log(ENDPOINTS.LEAD_SOURCE);
  return await ApiHelper.create(data, ENDPOINTS.LEAD_SOURCE,);
};


