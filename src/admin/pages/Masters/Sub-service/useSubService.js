import { useEffect, useState } from 'react';
import * as subServiceModel from './subServiceModel';

export const useSubService = () => {
  const [subService, setSubService] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Optional: Error state

  // Fetch all lead statuses
  const fetchLeadSubService = async () => {
    setLoading(true)
    try {
      const data = await subServiceModel.getAllLeadSubService();
      setSubService(data);
      setLoading(false)
    } catch (err) {
      console.error('Failed to fetch lead sub service:', err);
      setError(err.message || 'Something went wrong');
      setLoading(false)
    }
  };

  // Create a new lead status
  const createLeadSubService = async (formData) => {
    try {
      await subServiceModel.addNewLeadSubService(formData);
      await fetchLeadSubService();
      return true;
    } catch (err) {
      console.error('Failed to create lead sub service:', err);
      setError(err.message || 'Could not create lead potential');
      return false;
    }
  };

  useEffect(() => {
    fetchLeadSubService();
  }, []);

  return {
    subService,
    createLeadSubService,
    fetchLeadSubService, // for component reload once create API hits
    error, // Optional: expose to show in UI
    loading
  };
};
