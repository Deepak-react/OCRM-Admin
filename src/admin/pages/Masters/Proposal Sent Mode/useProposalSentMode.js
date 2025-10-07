// controllers/UserController.js
import { useEffect, useState } from 'react';
import * as proposalSentModeModel from './proposalSentModeModel';

export const useProposalSentMode = () => {
  const [prosposalSentMode, setProposalSentMode] = useState([]);
  const [bussinessType, setBussinessType] = useState([]);

  //Contains the business logic to fetch all the companies
    const fetchProposalSentMode = async (proposalData) => {
      const data = await model.getAllProposalSentMode(proposalData);  
      console.log('The proposal sent mode data is:', data);
        setProposalSentMode(data);
    };


     //Contains the business logic to fetch all the companies
    const update = async (proposalData, id) => {
      const data = await model.editProposalSentMode(proposalData, id);  
      console.log('The proposal sent mode data is:', data);
        setProposalSentMode(data);
    };


    const addProposalSentMode = async () => {
      try {
        const data = await model.createProposalSentMode();
        setPlan(Array.isArray(data) ? data : data.data || []);
      } catch (err) {
        console.error("Error fetching plans:", err);
        setPlan([]);
      }
    };


  return {
    fetchProposalSentMode, 
    addProposalSentMode,
    addProposalSentMode,

  };
};
