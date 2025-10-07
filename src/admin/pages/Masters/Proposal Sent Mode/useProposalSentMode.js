// controllers/UserController.js
import { useEffect, useState } from "react";
import * as proposalSentModeModel from "./proposalSentModeModel";

export const useProposalSentMode = () => {
  const [proposalSentMode, setProposalSentMode] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //Contains the business logic to fetch all the companies
  const fetchProposalSentMode = async (proposalData) => {
    setLoading(true);
    try {
      const data = await proposalSentModeModel.getAllProposalSentMode(proposalData);
      console.log("✅ The proposal sent mode data is:", data.data.data);
      setLoading(false);
      setProposalSentMode(data.data.data);
    } catch (error) {
      console.error("❌ Error fetching proposal sent mode:", error);
    }
  };

  //Contains the business logic to fetch all the companies
  const updateProposalSentMode = async (proposalData, id) => {
    setLoading(true);
    try {
      const data = await proposalSentModeModel.editProposalSentMode(proposalData, id);
      console.log("The proposal sent mode data is:", data);
      setLoading(false);
      return true;
    } catch (err) {
      console.error("Error fetching plans:", err);
      return false;
    }
  };

  const addProposalSentMode = async (proposalData) => {
    setLoading(true);
    try {
      const data = await proposalSentModeModel.createProposalSentMode(proposalData);
      setLoading(false);
      return data;
    } catch (err) {
      console.error("Error fetching plans:", err);
      return false;
    }
  };

  return {
    fetchProposalSentMode,
    addProposalSentMode,
    updateProposalSentMode,
    proposalSentMode,
    loading,
    error
  };
};
