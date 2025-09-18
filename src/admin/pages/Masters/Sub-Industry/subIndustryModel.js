// models/UserModel.js
import * as ApiHelper from '../../../api/ApiHelper';
import { ENDPOINTS } from '../../../api/ApiConstant';


// to get all the lead status.
export const getAllSubIndustry = async () => {
  console.log(ENDPOINTS.SUB_INDUSTRY);
  const res = await ApiHelper.getAll(ENDPOINTS.SUB_INDUSTRY);
  console.log("The errored response is :", res);
  return res.data; 
};

//to add an new lead status.
export const addNewSubIndustry = async (data) => {
  console.log(ENDPOINTS.LEAD_STATUS);
  return await ApiHelper.create(data, ENDPOINTS.LEAD_STATUS,);
};


