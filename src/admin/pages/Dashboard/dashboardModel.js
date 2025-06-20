

// models/UserModel.js
import * as ApiHelper from '../../api/ApiHelper';
import { ENDPOINTS } from '../../api/ApiConstant';


// to get all the dashobard data.
export const getDasgboardData = async (id) => {
  console.log(ENDPOINTS.ADMIN_DASHBOARD);
  const res = await ApiHelper.getById(id,ENDPOINTS.ADMIN_DASHBOARD);
  console.log("The errored response is :", res);
  return res.data; 
};


