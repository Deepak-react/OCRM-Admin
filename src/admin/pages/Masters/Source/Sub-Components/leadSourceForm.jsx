import React, { useState } from 'react';
import { useSharedController } from '../../../../api/shared/controller';
import { useLeadSourceController } from '../leadSourceController';

const LeadSourceForm = ({onClose, onSuccess}) => {
    
  const [formData, setFormData] = useState({
    source_name: '',
    description: '',
    icompany_id: 0
  });

const {createLeadSource} = useLeadSourceController();

  // Handle change for all input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
 setFormData(prev => ({
        ...prev,
        [name]: name === 'icompany_id' || name === 'ccolor' ? parseInt(value) : value
      }));  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    createLeadSource(formData);
    onClose();
    onSuccess();

  };

   // Function to fetch company pick list
  const {companies, fetchCompanies} = useSharedController();

  return (
      <div>
        <h1 className="text-base sm:text-xl md:text-2xl lg:text-2xl">
        Create Lead-source
        </h1>
    <form onSubmit={handleSubmit} className="space-y-6 p-6  rounded-xl max-w-md">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          name="source_name"
          value={formData.source_name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

       <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          type="text"
          name="description"
          value={formData.description} 
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>


      <div>
        <label className="block mb-1 text-sm font-medium">Company</label>
        <select
          name="icompany_id"
          value={formData.icompany_id}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md"
        >
       <option value={''}> Choose company</option>
          {companies.map((company, index) => (
              <option key={index} value={company.iCompany_id}>
                {company.cCompany_name}
              </option>
            ))}
        </select>
      </div>

                <div className='flex flex-wrap justify-center gap-4 mt-6'>
        <button
            type="button"
            onClick={onClose}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
            Cancel
        </button>

        <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
            Submit
        </button>
        </div>       
    </form>
            </div>       

  );
};

export default LeadSourceForm;
