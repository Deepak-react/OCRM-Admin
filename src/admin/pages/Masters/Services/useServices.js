import { useEffect, useState } from 'react';
import * as leadServiceModel from './leadServiceModel';

export const useServices = () => {
  const [leadServices, setLeadServices] = useState([]);
  const [loading , setLoading] = useState(false);
  const [error, setError] = useState(null); // Optional: Error state

  // Fetch all lead service
  const fetchLeadServices = async () => {
    setLoading(true);
    try {
      const data = await leadServiceModel.getAllLeadServices();
      console.log("The lead services are:", data)
      setLeadServices(data.data);
      setLoading(false)
    } catch (err) {
      console.error('Failed to fetch lead services:', err);
      setError(err.message || 'Something went wrong');
    }
    setLoading(false)
  };

  // Create a new lead service
  const createLeadServices = async (formData) => {
    try {
      await leadServiceModel.addNewLeadService(formData);
      await fetchLeadServices();
      return true;
    } catch (err) {
      console.error('Failed to create lead services:', err);
      setError(err.message || 'Could not create lead service');
      return false;
    }
  };

  useEffect(() => {
    fetchLeadServices();
  }, []);

  return {
    leadServices,
    loading,
    createLeadServices,
    fetchLeadServices, // for component reload once create API hits
    error, // Optional: expose to show in UI
  };
};
