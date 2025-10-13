import { ENDPOINTS } from '../../../api/ApiConstant';
import * as ApiHelper from '../../../api/ApiHelper';
//MODEL FOR HANDLING  LEAD LOST REASON APIS REQUEST AND RESPONSE 
export async function  getLeadLostReasonsByCompanyId(companyId){
    const response=await  ApiHelper.getById(companyId,ENDPOINTS.COMPANY_LEAD_LOST_REASON);
    return response.data
}

//CREATE LEAD LOST REASON 
export async function createLeadLostReason(reqData) {
    const response=await ApiHelper.create(reqData, ENDPOINTS.CREATE_LEAD_LOST_REASON);
    return response.data;
}