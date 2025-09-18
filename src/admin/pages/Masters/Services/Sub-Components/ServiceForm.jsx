import React, { useState } from 'react';
import { useSharedController } from '../../../../api/shared/controller';
import { useServices } from '../useServices';
import { useToast } from '../../../../../context/ToastContext';


const ServiceForm = ({onClose, onSuccess}) => {

  //custom hooks function to create an lead status 
  const { createLeadServices } = useServices();
  const {showToast } = useToast();

  //local state varaibles
  const [formData, setFormData] = useState({
    serviceName: '',
    icompany_id: '',
    icreated_by : '',
    dcreated_at : '',
    cservice_name : ''
  });

  // Handle change for all input fields
    const handleChange = (e) => {
      const { name, value } = e.target;

      setFormData(prev => ({
        ...prev,
        [name]: name === 'icompany_id' ? parseInt(value) : value
      }));
    };


  // Handle form submission
  const handleSubmit = async  (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    const isSucess = await createLeadServices(formData); // ✅ Add await here
    if(isSucess) {
      onSuccess?.(); // refresh parent component
      showToast("success", "Lead service created successfully !");
      onClose(); // closes the form.
    }
    else {
      alert("Error creating potential !!");
    }
  };

  // Function to fetch company pick list
  const {companies, fetchCompanies} = useSharedController();
 
  return (

    <div>
        <h1 className="text-base sm:text-xl md:text-2xl lg:text-2xl">
        Create Lead-service
        </h1>  
    <form onSubmit={handleSubmit} className="space-y-6 p-6  rounded-xl max-w-md">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          name="serviceName"
          value={formData.serviceName}
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

export default ServiceForm;
