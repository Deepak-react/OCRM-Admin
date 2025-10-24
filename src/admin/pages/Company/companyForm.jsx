import React, { useState } from "react";
import { useCompanyController } from "../Company/companyController";
import { useSharedController } from "../../api/shared/controller";
import { toast } from "react-toastify";

const validate = (values) => {
  const newErrors = {};

  const isIndianCompany = values.countryType === "India";

  //  Required fields 
  if (!values.cCompany_name.trim()) newErrors.cCompany_name = "Company name is required";
  if (!values.iPhone_no.trim()) newErrors.iPhone_no = "Phone number is required";
  if (!values.caddress1.trim()) newErrors.caddress1 = "Address Line 1 is required";
  if (!values.iUser_no || isNaN(values.iUser_no)) newErrors.iUser_no = "User count is required";
  if (!values.icity_id) newErrors.icity_id = "City is required";
  if (!values.icurrency_id) newErrors.icurrency_id = "Currency is required";
  if (!values.ibusiness_type) newErrors.ibusiness_type = "Business Type is required";
  if (!values.isubscription_plan) newErrors.isubscription_plan = "Subscription Plan is required";

  // Required fields for indiam company
  if (isIndianCompany) {
    if (!values.cGst_no.trim()) newErrors.cGst_no = "GST Number is required for Indian companies";
    if (!values.icin_no.trim()) newErrors.icin_no = "CIN Number is required for Indian companies";
    if (!values.cPan_no.trim()) newErrors.cPan_no = "PAN Number is required for Indian companies";
  }

  //  Length & numeric validations
  if (values.cCompany_name && values.cCompany_name.length > 100) newErrors.cCompany_name = "Company name cannot exceed 100 characters";

  if (values.iPhone_no && !/^\d{6,15}$/.test(values.iPhone_no)) newErrors.iPhone_no = "Phone number must be 6–15 digits only";

  if (values.cemail_address) {
    if (values.cemail_address.length > 70) newErrors.cemail_address = "Email cannot exceed 70 characters";

    // Email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(values.cemail_address)) newErrors.cemail_address = "Email format is invalid";
  }

  if (values.cWebsite) {
    if (values.cWebsite.length > 70)
      newErrors.cWebsite = "Website cannot exceed 70 characters";

    // Website format
    const urlRegex = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/i;
    if (!urlRegex.test(values.cWebsite))
      newErrors.cWebsite = "Website format is invalid (e.g., https://example.com)";
  }

  // Length validations 
  if (values.cGst_no && values.cGst_no.length !== 15) newErrors.cGst_no = "GST number must be exactly 15 characters";

  if (values.icin_no && values.icin_no.length > 21) newErrors.icin_no = "CIN number cannot exceed 21 characters";

  if (values.cPan_no && values.cPan_no.length !== 10) newErrors.cPan_no = "PAN number must be exactly 10 characters";

  if (values.fax_no && values.fax_no.length > 15) newErrors.fax_no = "Fax number cannot exceed 15 characters";

  if (values.industry && values.industry.length > 70) newErrors.industry = "Industry cannot exceed 70 characters";

  if (values.iUser_no > 1000000) newErrors.iUser_no = "User count cannot exceed 10,00,000";

  if (values.caddress1 && values.caddress1.length > 100) newErrors.caddress1 = "Address Line 1 cannot exceed 100 characters";

  if (values.caddress2 && values.caddress2.length > 100) newErrors.caddress2 = "Address Line 2 cannot exceed 100 characters";

  if (values.caddress3 && values.caddress3.length > 100) newErrors.caddress3 = "Address Line 3 cannot exceed 100 characters";

  if (values.cpincode && !/^\d{6,15}$/.test(values.cpincode)) newErrors.cpincode = "Pincode must be 6–15 digits";

  return newErrors;
};


const CompanyForm = ({ onClose, onSuccess }) => {
  const { createCompany, checkCompanyFieldExists } = useCompanyController();
  const { cities, currencies, bussiness, plan } = useSharedController();
  const [countryType, setCountryType] = useState("India");

  const [formData, setFormData] = useState({
    countryType: "India", 
    cCompany_name: "",
    iPhone_no: "",
    cWebsite: "",
    caddress1: "",
    caddress2: "",
    caddress3: "",
    cpincode: "",
    cGst_no: "",
    fax_no: "",
    icin_no: "",
    cPan_no: "",
    industry: "",
    cemail_address: "",
    iUser_no: "",
    cLogo_link: "https://xcodefix.com/logo.png",
    bactive: true,
    icity_id: "",
    isubscription_plan: "", 
    ibusiness_type: "", 
    ireseller_id: 1,
    icurrency_id: "",
  });

  const [errors, setErrors] = useState({});
  const [pageNumber, setPageNumber] = useState(1);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let processedValue = type === "checkbox" ? checked : value;

    // Handle the new countryType field
    if (name === "countryType") {
      setCountryType(value);
      if (value === "International") {
        setFormData((prev) => ({
            ...prev,
            cGst_no: "",
            icin_no: "",
            cPan_no: "",
            [name]: processedValue,
        }));
        setErrors((prev) => {
            const updated = { ...prev };
            delete updated.cGst_no;
            delete updated.icin_no;
            delete updated.cPan_no;
            return updated;
        });
        return;
      }
    }

    // Uppercase GST, CIN, and PAN automatically
    if (name === "cGst_no" || name === "icin_no" || name === "cPan_no") {
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
        ? processedValue
          ? parseInt(processedValue, 10)
          : null
        : processedValue,
    }));
  };

  // Function to check uniqueness on blur
  const handleBlur = async (e) => {
    const { name, value } = e.target;
    if (!value.trim()) return;

    const fieldsToCheck = [
      "cemail_address",
      "iPhone_no",
      "cWebsite",
      "cGst_no",
      "icin_no",
      "cPan_no",
      "fax_no",
    ];

    if (!fieldsToCheck.includes(name)) return;

    try {
      const exists = await checkCompanyFieldExists(name, value);
      if (exists) {
        const fieldName = name.replace("c", "").replace("i", "").toUpperCase();
        toast.error(`${fieldName} already exists!`);
        setErrors((prev) => ({
          ...prev,
          [name]: `${fieldName} already exists`,
        }));
      } else {
        setErrors((prev) => {
          const updated = { ...prev };
          delete updated[name];
          return updated;
        });
      }
    } catch (err) {
      console.error("Uniqueness check failed:", err);
    }
  };

  const handleSubmit = async () => {
    const newErrors = validate(formData);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const { countryType, ...dataToSubmit } = formData; 
    
    const success = await createCompany(dataToSubmit);
    if (success) {
      toast.success("Company created successfully!");
      onSuccess?.();
      onClose?.();
    } else {
      toast.error("Failed to create company!");
    }
  };

  const renderError = (field) =>
    errors[field] && <p className="text-sm text-red-600">{errors[field]}</p>;

  const isMandatory = (fieldName) => {
    const requiredFields = [
      "cCompany_name",
      "iPhone_no",
      "caddress1",
      "iUser_no",
      "icity_id",
      "icurrency_id",
      "ibusiness_type",
      "isubscription_plan",
    ];
    const indiaOnlyFields = ["cGst_no", "icin_no", "cPan_no"];

    if (requiredFields.includes(fieldName)) return true;
    if (countryType === "India" && indiaOnlyFields.includes(fieldName)) return true;

    return false;
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md h-[80vh] overflow-y-auto">
      <div className="flex justify-end mb-4">
        <button
          onClick={onClose}
          className="font-bold hover:bg-gray-300 px-2 py-1 rounded"
        >
          ❌
        </button>
      </div>

      <h1 className="text-2xl font-semibold mb-6 text-center">
        🚀 Begin Your Company Setup
      </h1>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pageNumber === 1 && (
          <>
            {/* Country Type Dropdown - Default India */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium whitespace-nowrap">
                  Company Origin <span className="text-red-500">*</span>
                </label>
                <select
                  name="countryType"
                  value={countryType} 
                  onChange={handleChange}
                  className="flex-grow border px-3 py-2 rounded"
                >
                  <option value="India">India</option>
                  <option value="International">International</option>
                </select>
              </div>
            </div>

            {/* Text Inputs */}
            <div>
              <label className="block text-sm font-medium">Company Name {isMandatory("cCompany_name") && <span className="text-red-500">*</span>}</label>
              <input
                type="text"
                name="cCompany_name"
                value={formData.cCompany_name}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              {renderError("cCompany_name")}
            </div>

            <div>
              <label className="block text-sm font-medium">Phone Number {isMandatory("iPhone_no") && <span className="text-red-500">*</span>}</label>
              <input
                type="text"
                name="iPhone_no"
                value={formData.iPhone_no}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full border p-2 rounded"
              />
              {renderError("iPhone_no")}
            </div>

            <div>
              <label className="block text-sm font-medium">Email </label>
              <input
                type="email"
                name="cemail_address"
                value={formData.cemail_address}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full border p-2 rounded"
              />
              {renderError("cemail_address")}
            </div>

            <div>
              <label className="block text-sm font-medium">Website</label>
              <input
                type="text"
                name="cWebsite"
                value={formData.cWebsite}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full border p-2 rounded"
              />
              {renderError("cWebsite")}
            </div>

            {/* India-specific fields with conditional mandatory status */}
            <div>
              <label className="block text-sm font-medium">GST Number {isMandatory("cGst_no") && <span className="text-red-500">*</span>}</label>
              <input
                type="text"
                name="cGst_no"
                value={formData.cGst_no}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full border p-2 rounded"
              />
              {renderError("cGst_no")}
            </div>

            <div>
              <label className="block text-sm font-medium">CIN Number {isMandatory("icin_no") && <span className="text-red-500">*</span>}</label>
              <input
                type="text"
                name="icin_no"
                value={formData.icin_no}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full border p-2 rounded"
              />
              {renderError("icin_no")}
            </div>

            <div>
              <label className="block text-sm font-medium">PAN Number {isMandatory("cPan_no") && <span className="text-red-500">*</span>}</label>
              <input
                type="text"
                name="cPan_no"
                value={formData.cPan_no}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full border p-2 rounded"
              />
              {renderError("cPan_no")}
            </div>

            <div>
              <label className="block text-sm font-medium">Fax Number</label>
              <input
                type="text"
                name="fax_no"
                value={formData.fax_no}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full border p-2 rounded"
              />
              {renderError("fax_no")}
            </div>

            {/* Other Inputs */}
            <div>
              <label className="block text-sm font-medium">Industry</label>
              <input
                type="text"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">User Count {isMandatory("iUser_no") && <span className="text-red-500">*</span>}</label>
              <input
                type="number"
                name="iUser_no"
                value={formData.iUser_no}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              {renderError("iUser_no")}
            </div>

            <div>
              <label className="block text-sm font-medium">Address Line 1 {isMandatory("caddress1") && <span className="text-red-500">*</span>}</label>
              <input
                name="caddress1"
                value={formData.caddress1}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              {renderError("caddress1")}
            </div>

            <div>
              <label className="block text-sm font-medium">Address Line 2</label>
              <input
                name="caddress2"
                value={formData.caddress2}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Address Line 3</label>
              <input
                name="caddress3"
                value={formData.caddress3}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Pincode</label>
              <input
                type="text"
                name="cpincode"
                value={formData.cpincode}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              {renderError("cpincode")}
            </div>

            {/* Dropdowns */}
            <div>
              <label className="block text-sm font-medium">City {isMandatory("icity_id") && <span className="text-red-500">*</span>}</label>
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
              {renderError("icity_id")}
            </div>

            <div>
              <label className="block text-sm font-medium">Currency {isMandatory("icurrency_id") && <span className="text-red-500">*</span>}</label>
              <select
                name="icurrency_id"
                value={formData.icurrency_id}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded text-black"
              >
                <option value="">Choose currency</option>
                {Array.isArray(currencies) &&
                  currencies.map((currency) => (
                    <option
                      key={currency.icurrency_id}
                      value={currency.icurrency_id}
                    >
                      {currency.currency_code}
                    </option>
                  ))}
              </select>
              {renderError("icurrency_id")}
            </div>

            {/* BUSINESS TYPE */}
            <div>
              <label className="block text-sm font-medium">Business Type <span className="text-red-500">*</span></label>
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
              {renderError("ibusiness_type")}
            </div>

            {/* SUBSCRIPTION PLAN */}
            <div>
              <label className="block text-sm font-medium">
                Subscription Plan <span className="text-red-500">*</span>
              </label>
              <select
                name="isubscription_plan"
                value={formData.isubscription_plan}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">Choose plan</option>
                {Array.isArray(plan) &&
                  plan.map((p) => (
                    <option key={p.plan_id} value={p.plan_id}>
                      {p.plan_name}
                    </option>
                  ))}
              </select>
              {renderError("isubscription_plan")}
            </div>

            <div className="md:col-span-2 flex justify-end mt-6">
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
              >
                Submit
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default CompanyForm;