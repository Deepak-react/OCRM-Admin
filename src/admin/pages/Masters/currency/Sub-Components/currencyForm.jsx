import React, { useState, useEffect } from 'react';

const CurrencyForm = ({
  onClose,
  onSuccess,
  initialData = null,
  loading
}) => {
  const [formData, setFormData] = useState({
    country_name: '',
    currency_code: '',
    currency_name: '',
    symbol: '',
    bactive: true
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Initialize form if editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        country_name: initialData.country_name || '',
        currency_code: initialData.currency_code || '',
        currency_name: initialData.currency_name || '',
        symbol: initialData.symbol || '',
        bactive: initialData.bactive !== false
      });
    } else {
      setFormData({
        country_name: '',
        currency_code: '',
        currency_name: '',
        symbol: '',
        bactive: true
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
      // Calling onSuccess prop from parent component
      await onSuccess(formData);
      setSuccessMessage(`Currency ${initialData ? 'updated' : 'created'} successfully!`);
      
      console.log('Form submission successful');
      setTimeout(() => {
        clearMessages();
        onClose?.();
      }, 3000);

    } catch (error) {
      console.error("Form submission failed:", error);
      setErrorMessage(error.response?.data?.message || 'Operation failed. Please try again.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">
        {initialData ? 'Edit Currency' : 'Add New Currency'}
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
        {/* Country Name Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Country Name
          </label>
          <input
            type="text"
            name="country_name"
            value={formData.country_name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
            disabled={loading}
            placeholder="Enter country name"
          />
        </div>

        {/* Currency Code Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Currency Code
          </label>
          <input
            type="text"
            name="currency_code"
            value={formData.currency_code}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
            disabled={loading}
            placeholder="e.g., USD, INR"
          />
        </div>

        {/* Currency Name Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Currency Name
          </label>
          <input
            type="text"
            name="currency_name"
            value={formData.currency_name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
            disabled={loading}
            placeholder="e.g., United States Dollar"
          />
        </div>

        {/* Symbol Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Symbol
          </label>
          <input
            type="text"
            name="symbol"
            value={formData.symbol}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            required
            disabled={loading}
            placeholder="e.g., $"
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
            disabled={loading}
            className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CurrencyForm;