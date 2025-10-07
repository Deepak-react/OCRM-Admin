import React, { useState, useEffect } from 'react';
import { useSharedController } from '../../../../api/shared/controller';
import { useLeadStatusController } from '../leadStatusController';


const LeadStatusForm = ({onClose, onSuccess}) => {

  //custom hooks function to create an lead status 
  const { createLeadStatus } = useLeadStatusController();







  //local state varaibles
  const [formData, setFormData] = useState({
    clead_name: '',
    icompany_id: '',
    orderId : 0,
    ccolor : 1
  });

    useEffect(() => {
  console.log("Updated formData:", formData);
  console.log("Type of orderId:", typeof formData.orderId);
}, [formData]);

  // Handle change for all input fields
    const handleChange = (e) => {
      const { name, value } = e.target;
      console.log('The form data are:', name, typeof(value), value);
      

      setFormData(prev => ({
        ...prev,
        [name]: name === 'icompany_id' || name === 'ccolor' || name ==='orderId' ? parseInt(value) : value
      }));
    };


  // Handle form submission
  const handleSubmit = async  (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    const isSucess = await createLeadStatus(formData); // ✅ Add await here
    if(isSucess) {
      onSuccess?.(); // refresh parent component
      onClose(); // closes the form.
    }
    else {
      alert("Error creating status !!");
    }
  };

  // Function to fetch company pick list
  const {companies, fetchCompanies} = useSharedController();
 
  return (

    <div>
        <h1 className="text-base sm:text-xl md:text-2xl lg:text-2xl">
        Create Lead-status
        </h1>  
    <form onSubmit={handleSubmit} className="space-y-6 p-6  rounded-xl max-w-md">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          name="clead_name"
          value={formData.clead_name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>  
        <div>
        <label className="block text-sm font-medium">Sort order</label>
        <input
          type="number"              // ✅ this makes the browser return numeric input
          name="orderId"
          value={formData.orderId}
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

export default LeadStatusForm;
