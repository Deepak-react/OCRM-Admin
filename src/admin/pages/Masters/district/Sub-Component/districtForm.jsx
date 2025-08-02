import React, { useState, useEffect } from 'react';
import useDistrictController from '../districtContoller';

const DistrictForm = ({
  onClose,
  onSuccess,
  initialData = null,
  states = [],
  loading
}) => {
  const { createDistrict, updateDistrict, deleteDistrict } = useDistrictController();

  const [formData, setFormData] = useState({
    cDistrict_name: '',
    iState_id: '',
    bactive: true
  });

  const [statesError, setStatesError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Debug countries data
  useEffect(() => {
    console.log('Received countries:', states);
  }, [states]);

  // Initialize form if editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        cDistrict_name: initialData.cDistrict_name || '',
        iState_id: initialData.iState_id?.toString() || '',
        bactive: initialData.bactive !== false
      });
    }
  }, [initialData]);

  const clearMessages = () => {
    setSuccessMessage('');
    setErrorMessage('');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearMessages();
    console.log('Form submission started');

    try {
      const payload = {
        ...formData,
        iState_id: parseInt(formData.iState_id)
      };

      if (initialData?.iDistric_id) {
        payload.iDistric_id = initialData.iDistric_id;
        console.log('Attempting to update District with:', payload);
        await updateDistrict(payload);
        setSuccessMessage('District updated successfully!');
      } else {
        console.log('Attempting to create state with:', payload);
        await createDistrict(payload);
        setSuccessMessage('District created successfully!');
      }

      console.log('Form submission successful');
      setTimeout(() => {
        clearMessages();
        onSuccess?.();
        onClose?.();
      }, 3000);

    } catch (error) {
      console.error("Form submission failed:", error);
      setErrorMessage(error.response?.data?.message || 'Operation failed. Please try again.');
    }
  };

  const handleDelete = async () => {
    if (!initialData?.iDistric_id) return;
    
    if (window.confirm('Are you sure you want to delete this state?')) {
      clearMessages();
      try {
        await deleteDistrict(initialData.iDistric_id);
        setSuccessMessage('District deleted successfully!');
        setTimeout(() => {
          clearMessages();
          onSuccess?.();
          onClose?.();
        }, 3000);
      } catch (error) {
        console.error("Delete failed:", error);
        setErrorMessage(error.response?.data?.message || 'Failed to delete district.');
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">
        {initialData ? 'Edit State' : 'Add New State'}
      </h2>

      {/* Success and Error Messages */}
      {successMessage && (
        <div className="mb-4 p-2 bg-green-100 text-green-800 rounded text-sm">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="mb-4 p-2 bg-red-100 text-red-800 rounded text-sm">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Country Selection Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            State
          </label>
          <select
            name="iState_id"
            value={formData.iState_id}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
            disabled={loading || states.length === 0}
          >
            <option value="">
              {states.length === 0 ? 'No states available' : 'Select Country'}
            </option>
            {states.map(states => (
              <option
                key={states.iState_id ||states.iState_id}
                value={states.iState_id || states.iState_id}
              >
                {states.cState_name || states.name || 'Unnamed states'}
              </option>
            ))}
          </select>
          {statesError && (
            <p className="mt-1 text-sm text-red-600">
              Failed to load countries: {statesError.message}
            </p>
          )}
        </div>

        {/* State Name Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            District Name
          </label>
          <input
            type="text"
            name="cDistrict_name"
            value={formData.cDistrict_name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
            disabled={loading}
            placeholder="Enter district name"
          />
        </div>

        {/* Active Status Checkbox (only in edit mode) */}
        {initialData && (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="bactive"
                name="bactive"
                checked={formData.bactive}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                disabled={loading}
              />
              <label htmlFor="bactive" className="ml-2 block text-sm text-gray-700">
                Active
              </label>
            </div>
            {/* <button
              type="button"
              onClick={handleDelete}
              className="text-sm text-red-600 hover:text-red-800"
              disabled={loading}
            >
              Delete State
            </button> */}
          </div>
        )}

        {/* Form Actions */}
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={() => {
              clearMessages();
              typeof onClose === 'function' && onClose();
            }}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || states.length === 0}
            className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${
              loading || states.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DistrictForm;