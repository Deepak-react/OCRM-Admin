import React, { useState, useEffect } from 'react';
import { getAllDistrict } from '../../Masters/district/districtModel';
import useCitiesController from './cityController';
import CityForm from '../city/Sub-Component/cityForm';
// import formatDate from '../../../utils/formatDate';

const ConfirmationModal = ({ isOpen, onConfirm, onCancel, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Confirm Action</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
          >
            Deactivate
          </button>
        </div>
      </div>
    </div>
  );
};

const CityMaster = () => {
  const { 
    cities: rawCities = [], 
    fetchCities, 
    createCities,
    updateCities,
    deleteCities,
    loading, 
    error 
  } = useCitiesController();

  const [districts, setDistricts] = useState([]);
  const [districtLoading, setDistrictLoading] = useState(false);
  const [districtError, setDistrictError] = useState(null);

  useEffect(() => {
    const fetchDistrict = async () => {
      setDistrictLoading(true);
      setDistrictError(null);
      try {
        const data = await getAllDistrict();
        setDistricts(data);
        console.log('Fetched districts:', data);
      } catch (err) {
        console.error('Failed to fetch districts:', err);
        setDistrictError(err);
        setDistricts([]);
      } finally {
        setDistrictLoading(false);
      }
    };

    fetchDistrict();
    fetchCities();
  }, [fetchCities]);
  
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [currentCity, setCurrentCity] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const cities = Array.isArray(rawCities) ? rawCities : [];

  const handleEdit = (city) => {
    setCurrentCity(city);
    setShowForm(true);
  };

  const handleAdd = () => {
    setCurrentCity(null);
    setShowForm(true);
  };

 const handleFormSubmit = async (formData) => {
    try {
      let success;
      if (formData.icity_id) {
        success = await updateCities({
          ...formData,
          icity_id: formData.icity_id
        });
      } else {
        success = await createCities(formData);
      }

      if (success) {
        setSuccessMessage(
          formData.icity_id 
            ? 'cities updated successfully!' 
            : 'cities added successfully!'
        );
        setTimeout(() => setSuccessMessage(''), 3000);
        setShowForm(false);
        fetchCities();
      }
    } catch (err) {
      console.error('Form submission error:', err);
    }
  };

  const handleDelete = async (citiesId) => {
    if (window.confirm('Are you sure you want to deactivate this city?')) {
      await deleteCities(citiesId);
      fetchCities();
    }
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cities.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(cities.length / itemsPerPage);

  if (loading && cities.length === 0) {
    return <div className="text-center py-8">Loading cities...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        Error: {error.message}
        <button onClick={fetchCities} className="ml-2 underline">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Cities Master</h1>
        
        {successMessage && (
          <div className="mb-4 p-2 bg-green-100 text-green-800 rounded">
            {successMessage}
          </div>
        )}

        <div className="flex justify-end mb-6">
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            disabled={loading}
          >
            + Add City
          </button>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <CityForm
              initialData={currentCity || {}}
              onSuccess={handleFormSubmit}
              onClose={() => setShowForm(false)}
              loading={loading || districtLoading}
              district={districts}
            />
          </div>
        )}

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">S.No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">City Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">District Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created At</th> */}
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading && cities.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    <div className="animate-pulse">Loading cities...</div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-red-500">
                    Error: {error.message}
                    <button onClick={fetchCities} className="ml-2 underline">
                      Retry
                    </button>
                  </td>
                </tr>
              ) : cities.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-8">
                    <div className="flex flex-col items-center px-4">
                      <svg 
                        className="w-16 h-16 text-gray-300 mb-3" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={1.5} 
                          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                        />
                      </svg>
                      <h3 className="text-lg font-medium text-gray-500 mb-1">
                        No Cities Available
                      </h3>
                      <p className="text-gray-400 text-sm max-w-md text-center mb-4">
                        There are currently no cities in the system. You can add a new city by clicking the "Add City" button.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        {error?.isEmpty && (
                          <button 
                            onClick={fetchCities}
                            className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            <svg 
                              className="w-4 h-4 mr-2 -ml-1" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
                              />
                            </svg>
                            Refresh Cities
                          </button>
                        )}
                        <button
                          onClick={handleAdd}
                          className="flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <svg 
                            className="w-4 h-4 mr-2 -ml-1" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
                            />
                          </svg>
                          Add New City
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                currentItems.map((city, index) => {
                  const district = districts.find(d => d.iDistric_id === city.iDistric_id);
                  return (
                    <tr key={city.icity_id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {city.cCity_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {city.district?.cDistrict_name || city. cDistrict_name }
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          city.bactive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {city.bactive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      {/* <td className="px-6 py-4 whitespace-nowrap">
                        {formatDate(city.dCreated_dt)}
                      </td> */}
                      <td className="px-2 py-4 whitespace-nowrap space-x-4">
                        <button
                          onClick={() => handleEdit(city)}
                          className="text-indigo-600 px-5  hover:text-indigo-900"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(city.icity_id)}
                          className="text-red-600   hover:text-red-900"
                        >
                          Deactivate
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {cities.length > itemsPerPage && (
          <div className="flex justify-center mt-4 space-x-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded ${
                  currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CityMaster;