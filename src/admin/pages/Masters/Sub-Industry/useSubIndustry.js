import { useEffect, useState } from 'react';
import * as subIndustryModel from './subIndustryModel';

export const useSubIndustry = () => {
  const [subIndustry, setSubIndustry] = useState([]);
  const [error, setError] = useState(null); // Optional: Error state

  // Fetch all lead statuses
  const fetchSubIndustry = async () => {
    try {
      const data = await subIndustryModel.getAllSubIndustry();
      setSubIndustry(data);
    } catch (err) {
      console.error('Failed to fetch lead status:', err);
      setError(err.message || 'Something went wrong');
    }
  };

  // Create a new lead status
  const createSubIndustry = async (formData) => {
    try {
      await subIndustryModel.addNewSubIndustry(formData);
      await fetchSubIndustry();
      return true;
    } catch (err) {
      console.error('Failed to create lead status:', err);
      setError(err.message || 'Could not create lead status');
      return false;
    }
  };

  useEffect(() => {
    fetchSubIndustry();
  }, []);

  return {
    subIndustry,
    createSubIndustry,
    fetchSubIndustry,
    error, // Optional: expose to show in UI
  };
};
