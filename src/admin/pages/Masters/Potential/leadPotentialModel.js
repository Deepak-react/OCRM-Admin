// models/UserModel.js
import * as ApiHelper from '../../../api/ApiHelper';
import { ENDPOINTS } from '../../../api/ApiConstant';


// to get all the lead status.
export const getAllLeadPotential = async () => {
  console.log(ENDPOINTS.LEAD_POTENTIAL);
  const res = await ApiHelper.getAll(ENDPOINTS.LEAD_POTENTIAL);
  console.log("The errored response is :", res);
  return res.data; 
};

//to add an new lead status.
export const addNewLeadPotential = async (data) => {
  console.log(ENDPOINTS.LEAD_POTENTIAL);
  return await ApiHelper.create(data, ENDPOINTS.LEAD_POTENTIAL,);
};


