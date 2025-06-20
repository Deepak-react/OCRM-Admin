// models/UserModel.js
import * as ApiHelper from '../../../api/ApiHelper';
import { ENDPOINTS } from '../../../api/ApiConstant';


// to get all the lead status.
export const getAllLeadStatus = async () => {
  console.log(ENDPOINTS.LEAD_STATUS);
  const res = await ApiHelper.getAll(ENDPOINTS.LEAD_STATUS);
  console.log("The errored response is :", res);
  return res.data; 
};

//to add an new lead status.
export const addNewLeadStatus = async (data) => {
  console.log(ENDPOINTS.LEAD_STATUS);
  return await ApiHelper.create(data, ENDPOINTS.LEAD_STATUS,);
};


