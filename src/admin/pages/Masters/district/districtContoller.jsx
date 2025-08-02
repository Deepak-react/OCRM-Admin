import { useState, useCallback } from 'react';
import {
  getAllDistrict,
  addNewDistrict,
  updateDistrict as modelUpdateDistrict,
  deleteDistrict as modelDeleteDistrict
} from './districtModel';

const useDistrictController = () => {
  const [district, setDistrict] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDistrict = useCallback(async () => {
  setLoading(true);
  setError(null);
  try {
    const data = await getAllDistrict();
    
    console.log('Processed State Data:', data);
    
    if (data.length === 0) {
      console.warn('No states found in response');
      // Optional: Set a special empty state message
      setError({ 
        message: 'No states available', 
        isEmpty: true 
      });
    }
    
    setDistrict(data);
  } catch (err) {
    console.error('Fetch states error:', err);
    setError(err);
    setDistrict([]);
  } finally {
    setLoading(false);
  }
}, []);

  const createDistrict = async (districtData) => {
    setLoading(true);
    setError(null);
    try {
      const newDistrict = await addNewDistrict(districtData);
      setDistrict(prev => [...prev, newDistrict]);
      return true;
    } catch (err) {
      console.error('Create state error:', err);
      setError(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // In districtController.js
const updateDistrict = async (districtData) => {  // Accept single object
  setLoading(true);
  setError(null);
  try {
    const updatedDistrict = await modelUpdateDistrict(districtData.iDistric_id, districtData);
    setDistrict(prev => prev.map(s => 
      s.iDistric_id === districtData.iDistric_id ? { ...s, ...updatedDistrict } : s
    ));
    return true;
  } catch (err) {
    console.error('Update district error:', err);
    setError(err);
    return false;
  } finally {
    setLoading(false);
  }
};
  const deleteDistrict = async (districtId) => {
    setLoading(true);
    setError(null);
    try {
      await modelDeleteDistrict(districtId);
      setDistrict(prev => prev.filter(s => s.iDistric_id !== districtId));
      return true;
    } catch (err) {
      console.error('Delete district error:', err);
      setError(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    district,
    loading,
    error,
    fetchDistrict,
    createDistrict,
    updateDistrict,
    deleteDistrict
  };
};

export default useDistrictController;