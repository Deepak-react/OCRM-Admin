import React, { useState } from "react";
import { useCompanyController } from "../Company/companyController";
import { useSharedController } from "../../api/shared/controller";
import { toast } from "react-toastify";

const CompanyForm = ({ onClose, onSuccess }) => {
  const { createCompany } = useCompanyController();
  const { cities, currencies, bussiness , plan } = useSharedController();

  const [formData, setFormData] = useState({
     cCompany_name: "",
    iPhone_no: "",
    cWebsite: "",
    caddress1: "",
    caddress2: "",
    caddress3: "",
    cpincode: "",
    cLogo_link: "",
    cGst_no: "",
    fax_no: "",
    icin_no: "",
    cPan_no: "",
    industry: "",
    cemail_address: "",
    iUser_no: "",
    cLogo_link: 'https://xcodefix.com/logo.png',
    cCompany_name: '',
    iPhone_no: '',
    cWebsite: '',
    caddress1: '',
    caddress2: '',
    caddress3: '',
    cGst_no: '',  
    icin_no: '',
    bactive: true,
    icity_id: "",
    isubscription_plan: "",
    ibusiness_type: "",
    ireseller_id: 1,
    icurrency_id: "",
    isubscription_plan:"",
  });

  const [errors, setErrors] = useState({});
  const [pageNumber, setPageNumber] = useState(1);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let processedValue = type === "checkbox" ? checked : value;

    // Uppercase GST and CIN automatically
    if (name === "cGst_no" || name === "icin_no") {
      processedValue = processedValue.toUpperCase();
    }

    const intFields = [
      "iUser_no",
      "icity_id",
      "ibusiness_type",
      "icurrency_id",
      "ireseller_id",
      "isubscription_plan",
      "cpincode",
    ];

    setFormData((prev) => ({
      ...prev,
      [name]: intFields.includes(name) 
    ? (processedValue ? parseInt(processedValue, 10) : null) 
    : processedValue,
    }));
  };

  const validate = (values) => {
    const newErrors = {};

    if (!values.cCompany_name.trim()) newErrors.cCompany_name = "Company name is required";
    if (!values.iPhone_no.trim()) newErrors.iPhone_no = "Phone number is required";
    if (!values.cGst_no.trim()) newErrors.cGst_no = "GST Number is required";
    if (!values.icin_no.trim()) newErrors.icin_no = "CIN Number is required";
    if (!values.caddress1.trim()) newErrors.caddress1 = "Address Line 1 is required";
    if (!values.iUser_no || isNaN(values.iUser_no)) newErrors.iUser_no = "User count is required";
    if (!values.icity_id) newErrors.icity_id = "City is required";

    return newErrors;
  };

  const handleNext = () => {
    const newErrors = validate(formData);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setPageNumber(pageNumber + 1);
    }
  };

  const handleSubmit = async () => {
    const newErrors = validate(formData);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const success = await createCompany(formData);
    if (success) {
      toast.success("Company created successfully!");
      onSuccess?.();
      onClose?.();
    } else {
      toast.error("Failed to create company!");
    }
  };

  const renderError = (field) => errors[field] && <p className="text-sm text-red-600">{errors[field]}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md h-[80vh] overflow-y-auto">

    {/* <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md"> */}
      <div className="flex justify-end mb-4">
        <button onClick={onClose} className="font-bold hover:bg-gray-300 px-2 py-1 rounded">❌</button>
      </div>

      <h1 className="text-2xl font-semibold mb-6 text-center">🚀 Begin Your Company Setup</h1>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pageNumber === 1 && (
          <>
            <div>
              <label className="block text-sm font-medium">Company Name *</label>
              <input type="text" name="cCompany_name" value={formData.cCompany_name} onChange={handleChange} className="w-full border p-2 rounded" />
              {renderError("cCompany_name")}
            </div>

            <div>
              <label className="block text-sm font-medium">Phone Number *</label>
              <input type="text" name="iPhone_no" value={formData.iPhone_no} onChange={handleChange} className="w-full border p-2 rounded" />
              {renderError("iPhone_no")}
            </div>

            <div>
              <label className="block text-sm font-medium">Email *</label>
              <input type="email" name="cemail_address" value={formData.cemail_address} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>

            <div>
              <label className="block text-sm font-medium">Website</label>
              <input type="text" name="cWebsite" value={formData.cWebsite} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>

            <div>
              <label className="block text-sm font-medium">GST Number *</label>
              <input type="text" name="cGst_no" value={formData.cGst_no} onChange={handleChange} className="w-full border p-2 rounded" />
              {renderError("cGst_no")}
            </div>

            <div>
              <label className="block text-sm font-medium">CIN Number *</label>
              <input type="text" name="icin_no" value={formData.icin_no} onChange={handleChange} className="w-full border p-2 rounded" />
              {renderError("icin_no")}
            </div>

            <div>
              <label className="block text-sm font-medium">PAN Number</label>
              <input type="text" name="cPan_no" value={formData.cPan_no} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>

            <div>
              <label className="block text-sm font-medium">Industry</label>
              <input type="text" name="industry" value={formData.industry} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>

            <div>
              <label className="block text-sm font-medium">Fax Number</label>
              <input type="text" name="fax_no" value={formData.fax_no} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>

            <div>
              <label className="block text-sm font-medium">User Count *</label>
              <input type="number" name="iUser_no" value={formData.iUser_no} onChange={handleChange} className="w-full border p-2 rounded" />
              {renderError("iUser_no")}
            </div>

            <div>
              <label className="block text-sm font-medium">Address Line 1 *</label>
              <input name="caddress1" value={formData.caddress1} onChange={handleChange} className="w-full border p-2 rounded" />
              {renderError("caddress1")}
            </div>

            <div>
              <label className="block text-sm font-medium">Address Line 2</label>
              <input name="caddress2" value={formData.caddress2} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>

            <div>
              <label className="block text-sm font-medium">Address Line 3</label>
              <input name="caddress3" value={formData.caddress3} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>

            <div>
              <label className="block text-sm font-medium">Pincode</label>
              <input type="pincode" name="cpincode" value={formData.cpincode} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>

            <div>
              <label className="block text-sm font-medium">Logo URL</label>
              <input type="text" name="cLogo_link" value={formData.cLogo_link} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>

            {/* Dropdowns */}
            <div>
              <label className="block text-sm font-medium">City *</label>
              <select name="icity_id" value={formData.icity_id} onChange={handleChange} className="w-full border px-3 py-2 rounded">
                <option value="">Choose city</option>
                {cities.map((city) => (
                  <option key={city.icity_id} value={city.icity_id}>{city.cCity_name}</option>
                ))}
              </select>
              {renderError("icity_id")}
            </div>

            <div>
              <label className="block text-sm font-medium">Currency</label>
                <select
                  name="icurrency_id"
                  value={formData.icurrency_id}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded text-black"
                >
                  <option value="">Choose currency</option>
                  {Array.isArray(currencies) &&
                    currencies.map((currency) => (
                      <option key={currency.icurrency_id} value={currency.icurrency_id}>
                        {currency.currency_code}
                      </option>
                    ))}
                </select>

            </div>

            <div>
              <label className="block text-sm font-medium">Business Type</label>
                <select
                  name="ibusiness_type"
                  value={formData.ibusiness_type}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                >
                  <option value="">Choose type</option>
                  {Array.isArray(bussiness) &&
                    bussiness.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                </select>

            </div>
            
            <div>
              <label className="block text-sm font-medium">Subscription Plan </label>
                <select
                  name="isubscription_plan"
                  value={formData.isubscription_plan}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                >
                  <option value="">Choose type</option>
                  {Array.isArray(plan) &&
                    plan.map((p) => (
                      <option key={p.plan_id} value={p.plan_id}>
                        {p.plan_name}
                      </option>
                    ))}
                </select>

            </div>

            <div className="md:col-span-2 flex justify-end mt-6">
              <button type="button" onClick={handleNext} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                Next
              </button>
            </div>
          </>
        )}

        {pageNumber === 2 && (
          <div className="md:col-span-2 flex justify-end mt-6">
            <button type="button" onClick={() => setPageNumber(1)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2">
              Back
            </button>
            <button type="button" onClick={handleSubmit} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
              Submit
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default CompanyForm;
