// models/UserModel.js
import * as ApiHelper from '../../../api/ApiHelper';
import { ENDPOINTS } from '../../../api/ApiConstant';

// to get all the companies.
export const getAllProposalSentMode = async () => {
  const res = await ApiHelper.getAll(ENDPOINTS.PROPOSAL_SENT_MODE);
  return res.data; 
};

export const createProposalSentMode = async (data, ) => {
  try {
    const res = await ApiHelper.create(data, ENDPOINTS.PROPOSAL_SENT_MODE);
    console.log("bussinesstype", res.data);
    return res.data.data;
  } catch (error) {
    console.error("Error fetching business types:", error);
    return [];
  }
};


export const  editProposalSentMode  = async (proposalSentModeId, data)=>{
  const res = await ApiHelper.update(proposalSentModeId, ENDPOINTS.PROPOSAL_SENT_MODE, data);
  return res.data;
}


export const  deleteProposalSentMode  = async (proposalSentModeId)=>{
  const res = await ApiHelper.deActive(proposalSentModeId, ENDPOINTS.PROPOSAL_SENT_MODE);
  return res.data;
}




