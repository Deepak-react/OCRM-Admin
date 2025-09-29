// models/UserModel.js
import * as ApiHelper from '../../../api/ApiHelper';
import { ENDPOINTS } from '../../../api/ApiConstant';


// to get all the lead status.
export const getAllLeadSubService = async () => {
  console.log(ENDPOINTS.LEAD_POTENTIAL);
  const res = await ApiHelper.getAll(ENDPOINTS.SUB_SERVICE);
  console.log("The errored response is :", res);
  return res.data; 
};

//to add an new lead status.
export const addNewLeadSubService = async (data) => {
  console.log(ENDPOINTS.LEAD_POTENTIAL);
  return await ApiHelper.create(data, ENDPOINTS.LEAD_POTENTIAL,);
};


