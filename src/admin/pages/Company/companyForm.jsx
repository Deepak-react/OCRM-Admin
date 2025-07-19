import React, { useState } from 'react';
import { useCompanyController } from '../Company/companyController';
import { useSharedController } from '../../api/shared/controller';
import { toast } from 'react-toastify'; 

const CompanyForm = ({ onClose, onSuccess }) => {
  const { createCompany } = useCompanyController();
  const { cities } = useSharedController();

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
    ireseller_admin: 11,
    email: '',
  });

  const [errors, setErrors] = useState({});

  const validate = (values) => {
    const newErrors = {};

    // Company Name Validation
    if (!values.cCompany_name.trim()) {
        newErrors.cCompany_name = 'Company name is required';
    } else if (!/^[a-zA-Z0-9@ ]{1,25}$/.test(values.cCompany_name)) {
      newErrors.cCompany_name = 'Only letters, numbers, spaces, and @ allowed (max 25 chars)';
    }

    // Phone Number Validation
    if (!values.iPhone_no.trim()) {
      newErrors.iPhone_no = 'Phone number is required';
    } else {
      const phoneNumber = values.iPhone_no.trim(); 
      const startsWithNine = /^9/.test(phoneNumber);
      const isTenDigits = /^\d{10}$/.test(phoneNumber);

      if (!startsWithNine) {
        newErrors.iPhone_no = 'Phone number must start with 9';
      } else if (!isTenDigits) {
        newErrors.iPhone_no = 'Phone number must be exactly 10 digits';
      }
    }

    // Email Validation
    if (!values.email.trim()) { 
        //newErrors.email = 'Email is required';
    } else if (!/^[^@]+@[^@]+\.[^@]+$/.test(values.email) || values.email.length > 40) {
      newErrors.email = 'Enter valid email (max 40 characters)';
    }

    // Website Validation
    if (values.cWebsite) {
      const websitePattern = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?(\/[^\s]*)?$/;

      if (!websitePattern.test(values.cWebsite)) {
        newErrors.cWebsite = 'Enter a valid website URL';
      } else if (values.cWebsite.length > 100) {
        newErrors.cWebsite = 'Website URL should be max 100 characters';
      }
    }

    // GST Number: Required + Format
    if (!values.cGst_no.trim()) {
      newErrors.cGst_no = "GST Number is required";
    } else {
      const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
      if (!gstRegex.test(values.cGst_no)) {
        newErrors.cGst_no = "Invalid GST format";
      }
    }

    // CIN Number: Required + Format
    if (!values.icin_no.trim()) {
      newErrors.icin_no = "CIN Number is required";
    } else {
      const cinRegex = /^[A-Z]{1}[0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6}$/;
      if (!cinRegex.test(values.icin_no)) {
        newErrors.icin_no = "Invalid CIN format";
      }
    }

    // User Count Validation
    if (values.iUser_no === '' || isNaN(values.iUser_no) || parseInt(values.iUser_no, 10) < 0 || parseInt(values.iUser_no, 10) > 100000) {
        newErrors.iUser_no = 'User count must be a number between 0 and 100000';
    }

    // Address Validations
    if (!values.caddress1.trim()) {
        newErrors.caddress1 = 'Address Line 1 is required';
    } else if (values.caddress1.length > 25) {
        newErrors.caddress1 = 'Max 20 characters allowed';
    }

    // Address2 and Address3 are optional, so only validate max length if entered
    if (values.caddress2 && values.caddress2.length > 20) {
        newErrors.caddress2 = 'Max 20 characters allowed';
    }
    if (values.caddress3 && values.caddress3.length > 20) {
        newErrors.caddress3 = 'Max 20 characters allowed';
    }

    // City ID Validation
    if (!values.icity_id) { 
        newErrors.icity_id = 'City is required';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    // Convert GST and CIN to uppercase as user types
    if (name === 'cGst_no' || name === 'icin_no') {
      processedValue = value.toUpperCase();
    }

    const intFields = ['iUser_no', 'icity_id', 'ireseller_id', 'ireseller_admin', 'isubscription_plan'];

    setFormData((prev) => ({
      ...prev,
      // Parse integer fields with radix 10, default to '0' if value is empty
      [name]: intFields.includes(name) ? parseInt(processedValue || '0', 10) : processedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validate(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const success = await createCompany(formData);

      if (success) {
        toast.success("Company created successfully!");
        setTimeout(() => {
          onSuccess?.();
          onClose?.();
        }, 3000); // 3 sec delay
      } else {
        toast.error("Failed to create company!");
      }

    }
  };

  const renderError = (field) =>
    errors[field] && <p className="text-sm text-red-600">{errors[field]}</p>;

  return (
    <div className="h-screen overflow-y-auto bg-gray-50 px-4 py-6">
      <h1 className="text-2xl font-semibold mb-6 text-center">🚀 LaunchHub – Begin Your Company Setup</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-white shadow rounded-xl max-w-5xl mx-auto">
        <div>
          <label className="block text-sm font-medium">Company Name <span className="text-red-600">*</span></label>
          <input type="text" name="cCompany_name" value={formData.cCompany_name} onChange={handleChange} maxLength={25} className="w-full border p-2 rounded" />
          {renderError('cCompany_name')}
        </div>

        <div>
          <label className="block text-sm font-medium">Phone Number <span className="text-red-600">*</span></label>
          <input type="text" name="iPhone_no" value={formData.iPhone_no} onChange={handleChange} maxLength={10} className="w-full border p-2 rounded" />
          {renderError('iPhone_no')}
        </div>

        <div>
          <label className="block text-sm font-medium">Email ID </label>
          <input type="text" name="email" value={formData.email} onChange={handleChange} maxLength={40} className="w-full border p-2 rounded" />
          {renderError('email')}
        </div>

        <div>
          <label className="block text-sm font-medium">Website</label>
          <input type="text" name="cWebsite" value={formData.cWebsite} onChange={handleChange} maxLength={100} className="w-full border p-2 rounded" />
          {renderError('cWebsite')}
        </div>

        <div>
          <label className="block text-sm font-medium">GST Number <span className="text-red-600">*</span></label>
          <input type="text" name="cGst_no" value={formData.cGst_no} onChange={handleChange} maxLength={15} className="w-full border p-2 rounded" />
          {renderError('cGst_no')}
        </div>

        <div>
          <label className="block text-sm font-medium">CIN Number <span className="text-red-600">*</span></label>
          <input type="text" name="icin_no" value={formData.icin_no} onChange={handleChange} maxLength={21} className="w-full border p-2 rounded" />
          {renderError('icin_no')}
        </div>

        <div>
          <label className="block text-sm font-medium">User Count <span className="text-red-600">*</span></label>
          <input type="number" name="iUser_no" value={formData.iUser_no} onChange={handleChange} className="w-full border p-2 rounded" />
          {renderError('iUser_no')}
        </div>

        <div >
          <label className="block text-sm font-medium">Address Line 1 <span className="text-red-600">*</span></label>
          <input name="caddress1" value={formData.caddress1} onChange={handleChange} maxLength={25} className="w-full border p-2 rounded" />
          {renderError('caddress1')}
        </div>

        <div>
          <label className="block text-sm font-medium">Address Line 2</label>
          <input type="text" name="caddress2" value={formData.caddress2} onChange={handleChange} maxLength={20} className="w-full border p-2 rounded" />
          {renderError('caddress2')}
        </div>

        <div>
          <label className="block text-sm font-medium">Address Line 3</label>
          <input type="text" name="caddress3" value={formData.caddress3} onChange={handleChange} maxLength={20} className="w-full border p-2 rounded" />
          {renderError('caddress3')}
        </div>

        <div>
          <label className="block text-sm font-medium">City <span className="text-red-600">*</span></label>
          <select
            name="icity_id"
            value={formData.icity_id}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Choose city</option>
            {cities.map((city) => (
              <option key={city.icity_id} value={city.icity_id}>
                {city.cCity_name}
              </option>
            ))}
          </select>
          {renderError('icity_id')}
        </div>

        <div className="md:col-span-2 flex justify-center gap-4 mt-6">
          <button type="button" onClick={onClose} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">Cancel</button>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default CompanyForm;





// import React, { useState } from 'react';
// import { useCompanyController } from '../Company/companyController';
// import { useSharedController } from '../../api/shared/controller';


// const CompanyForm = ({onClose, onSuccess}) => {

//   //custom hooks function to create an lead industry 
//   const { createCompany } = useCompanyController();


//   //to fetch all the cities
//   const {cities} = useSharedController();

//   //local state varaibles
// const [formData, setFormData] = useState({
//   cCompany_name: '',
//   cLogo_link: 'https://xcodefix.com/logo.png',
//   iPhone_no: '',
//   cWebsite: '',
//   caddress1: '',
//   caddress2: '',
//   caddress3: '',
//   cGst_no: '',       
//   icin_no: '',     
//   bactive: true,
//   ireseller_id: 4,
//   iUser_no: '',
//   icity_id: '',
//   isubscription_plan: 1,
//   ireseller_admin: 11
// });

// // Handle change for all input fields
// const handleChange = (e) => {
//   const { name, value } = e.target;

//   // Only fields that should truly be integers (foreign key IDs)
//   const intFields = ['iUser_no', 'icity_id', 'ireseller_id', 'ireseller_admin', 'isubscription_plan'];

//   setFormData((prev) => ({
//     ...prev,
//     [name]: intFields.includes(name) ? parseInt(value || 0) : value, // Keep all others as strings
//   }));
// }


//   // Handle form submission
//   const handleSubmit = async  (e) => {
//     e.preventDefault();
//     console.log('Form submitted:', formData);
//     const isSucess = await createCompany(formData); // ✅ Add await here
//     if(isSucess) {
//       onSuccess?.(); // refresh parent component
//       // onClose(); // closes the form.
//     }
//     else {
//       alert("Error creating potential !!");
//     }
//   };

 
//   return (

//   <div>
//   <h1 className="text-xl font-semibold mb-4">Create Company</h1>

//   <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 rounded-xl bg-white shadow max-w-4xl mx-auto">
    
//     <div>
//       <label className="block text-sm font-medium">Company Name</label>
//       <input type="text" name="cCompany_name" value={formData.cCompany_name} onChange={handleChange} className="w-full border p-2 rounded" />
//     </div>

//     <div>
//       <label className="block text-sm font-medium">Phone Number</label>
//       <input type="text" name="iPhone_no" value={formData.iPhone_no} onChange={handleChange} className="w-full border p-2 rounded" />
//     </div>

//     <div>
//       <label className="block text-sm font-medium">Website</label>
//       <input type="text" name="cWebsite" value={formData.cWebsite} onChange={handleChange} className="w-full border p-2 rounded" />
//     </div>

//     <div>
//       <label className="block text-sm font-medium">GST Number</label>
//       <input type="text" name="cGst_no" value={formData.cGst_no} onChange={handleChange} className="w-full border p-2 rounded" />
//     </div>

//     <div className="md:col-span-2">
//       <label className="block text-sm font-medium">Address Line 1</label>
//       <textarea name="caddress1" value={formData.caddress1} onChange={handleChange} className="w-full border p-2 rounded" />
//     </div>

//     <div>
//       <label className="block text-sm font-medium">Address Line 2</label>
//       <input type="text" name="caddress2" value={formData.caddress2} onChange={handleChange} className="w-full border p-2 rounded" />
//     </div>

//     <div>
//       <label className="block text-sm font-medium">Address Line 3</label>
//       <input type="text" name="caddress3" value={formData.caddress3} onChange={handleChange} className="w-full border p-2 rounded" />
//     </div>

//     <div>
//       <label className="block text-sm font-medium">CIN Number</label>
//       <input type="text" name="icin_no" value={formData.icin_no} onChange={handleChange} className="w-full border p-2 rounded" />
//     </div>

//     <div>
//       <label className="block text-sm font-medium">User count</label>
//       <input
//         type="number"
//         name="iUser_no"
//         value={formData.iUser_no}
//         onChange={handleChange}
//         className="w-full border p-2 rounded"
//       />
//    </div>

//     <div>
//       <label className="block text-sm font-medium">City</label>
//      <select
//           name="icity_id"
//           value={formData.icity_id}
//           onChange={handleChange}
//           className="w-full border px-3 py-2 rounded-md"
//         >
//           <option value={''}> Choose company</option>
//           {cities.map((city, index) => (
//               <option key={index} value={city.icity_id}>
//                 {city.cCity_name}
//               </option>
//             ))}
//         </select> 
//            </div>

//     {/* Submit / Cancel buttons full-width */}
//     <div className="md:col-span-2 flex justify-center gap-4 mt-4">
//       <button type="button" onClick={onClose} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
//         Cancel
//       </button>
//       <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
//         Submit
//       </button>
//     </div>
//   </form>
// </div>

//   );
// };

// export default CompanyForm;
