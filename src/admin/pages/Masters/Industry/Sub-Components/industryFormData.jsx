import React, { useState } from 'react';
import { useIndustryController } from '../industryController';


const LeadPotentialForm = ({onClose, onSuccess}) => {

  //custom hooks function to create an lead industry 
  const { createIndustry } = useIndustryController();

  //local state varaibles
  const [formData, setFormData] = useState({
    cindustry_name: '',
  });

 const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData(prev => ({
    ...prev,
    [name]: value   // ⬅️ sets the correct field to the entered value
  }));
};


  // Handle form submission
  const handleSubmit = async  (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    const isSucess = await createIndustry(formData); // ✅ Add await here
    if(isSucess) {
      onSuccess?.(); // refresh parent component
      onClose(); // closes the form.
    }
    else {
      alert("Error creating potential !!");
    }
  };

 
  return (

    <div>
        <h1 className="text-base sm:text-xl md:text-2xl lg:text-2xl">
        Create Lead-industry
        </h1>  
    <form onSubmit={handleSubmit} className="space-y-6 p-6  rounded-xl max-w-md">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          name="cindustry_name"
          value={formData.cindustry_name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
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

export default LeadPotentialForm;
