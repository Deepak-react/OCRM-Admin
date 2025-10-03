import { ENDPOINTS } from "../../api/ApiConstant"
import * as ApiHelper from "../../api/ApiHelper"
//MODULE ALLOCATION API REQUEST AND RESPONSE 
export async function getAllAllocatedModules() {
    const res=await ApiHelper.getAll(ENDPOINTS.GET_ALL_ALLOCATED_MODULES);
    const returnData=res.data
    if(returnData.success) return returnData.data;
    throw new Error (returnData.message)
    
}