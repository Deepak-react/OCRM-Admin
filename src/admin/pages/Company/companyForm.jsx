
import React, { useState } from 'react';
import { useCompanyController } from '../Company/companyController';
import { useSharedController } from '../../api/shared/controller';


const CompanyForm = ({onClose, onSuccess}) => {

  //custom hooks function to create an lead industry 
  const { createCompany } = useCompanyController();


  //to fetch all the cities
  const {cities} = useSharedController();

  //local state varaibles
const [formData, setFormData] = useState({
  cCompany_name: '',
  cLogo_link: 'https://xcodefix.com/logo.png',
  iPhone_no: '',
  cWebsite: '',
  caddress1: '',
  caddress2: '',
  caddress3: '',
  cGst_no: '',       
  icin_no: '',     
  bactive: true,
  ireseller_id: 4,
  iUser_no: '',
  icity_id: '',
  isubscription_plan: 1,
  ireseller_admin: 11
});

// Handle change for all input fields
const handleChange = (e) => {
  const { name, value } = e.target;

  // Only fields that should truly be integers (foreign key IDs)
  const intFields = ['iUser_no', 'icity_id', 'ireseller_id', 'ireseller_admin', 'isubscription_plan'];

  setFormData((prev) => ({
    ...prev,
    [name]: intFields.includes(name) ? parseInt(value || 0) : value, // Keep all others as strings
  }));
}


  // Handle form submission
  const handleSubmit = async  (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    const isSucess = await createCompany(formData); // ✅ Add await here
    if(isSucess) {
      onSuccess?.(); // refresh parent component
      // onClose(); // closes the form.
    }
    else {
      alert("Error creating potential !!");
    }
  };

 
  return (

  <div>
  <h1 className="text-xl font-semibold mb-4">Create Company</h1>

  <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 rounded-xl bg-white shadow max-w-4xl mx-auto">
    
    <div>
      <label className="block text-sm font-medium">Company Name</label>
      <input type="text" name="cCompany_name" value={formData.cCompany_name} onChange={handleChange} className="w-full border p-2 rounded" />
    </div>

    <div>
      <label className="block text-sm font-medium">Phone Number</label>
      <input type="text" name="iPhone_no" value={formData.iPhone_no} onChange={handleChange} className="w-full border p-2 rounded" />
    </div>

    <div>
      <label className="block text-sm font-medium">Website</label>
      <input type="text" name="cWebsite" value={formData.cWebsite} onChange={handleChange} className="w-full border p-2 rounded" />
    </div>

    <div>
      <label className="block text-sm font-medium">GST Number</label>
      <input type="text" name="cGst_no" value={formData.cGst_no} onChange={handleChange} className="w-full border p-2 rounded" />
    </div>

    <div className="md:col-span-2">
      <label className="block text-sm font-medium">Address Line 1</label>
      <textarea name="caddress1" value={formData.caddress1} onChange={handleChange} className="w-full border p-2 rounded" />
    </div>

    <div>
      <label className="block text-sm font-medium">Address Line 2</label>
      <input type="text" name="caddress2" value={formData.caddress2} onChange={handleChange} className="w-full border p-2 rounded" />
    </div>

    <div>
      <label className="block text-sm font-medium">Address Line 3</label>
      <input type="text" name="caddress3" value={formData.caddress3} onChange={handleChange} className="w-full border p-2 rounded" />
    </div>

    <div>
      <label className="block text-sm font-medium">CIN Number</label>
      <input type="text" name="icin_no" value={formData.icin_no} onChange={handleChange} className="w-full border p-2 rounded" />
    </div>

    <div>
      <label className="block text-sm font-medium">User count</label>
      <input
        type="number"
        name="iUser_no"
        value={formData.iUser_no}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
   </div>

    <div>
      <label className="block text-sm font-medium">City</label>
     <select
          name="icity_id"
          value={formData.icity_id}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded-md"
        >
          <option value={''}> Choose company</option>
          {cities.map((city, index) => (
              <option key={index} value={city.icity_id}>
                {city.cCity_name}
              </option>
            ))}
        </select> 
           </div>

    {/* Submit / Cancel buttons full-width */}
    <div className="md:col-span-2 flex justify-center gap-4 mt-4">
      <button type="button" onClick={onClose} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
        Cancel
      </button>
      <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
        Submit
      </button>
    </div>
  </form>
</div>

  );
};

export default CompanyForm;
