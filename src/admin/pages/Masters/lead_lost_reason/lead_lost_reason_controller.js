import { useState } from "react";
import * as leadLostReasonModel from "../lead_lost_reason/lead_lost_reason_model"
export function leadLostReason(){
  
    const [leadLostReasons,setLeadLostReasons]=useState([])
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null);
    const [message,setMessage]=useState(null)

//CONTROLLER FOR FETCHING LEAD LOST REASON BY COMPANY ID 
const getLeadLostReasonByCompanyId=async (companyId)=>{
    try {
        setLoading(true)
        const result=await leadLostReasonModel.getLeadLostReasonsByCompanyId(companyId);
        console.log("successfully hit the controller ")
        setLeadLostReasons(result.data)
    } catch (e) {
        console.log(e.message)
        setError(e.message)
    }finally{
        setLoading(false)
    }
}
//CREATE LEAD LOST REASON 
const createLeadLostReasonController=async (reqBody) => {
    const result=await leadLostReasonModel.createLeadLostReason(reqBody);
    setMessage(result.Message)
}
    
return {
    leadLostReasons,
    loading,
    error,
    message,
    getLeadLostReasonByCompanyId,
    createLeadLostReasonController
}
}
