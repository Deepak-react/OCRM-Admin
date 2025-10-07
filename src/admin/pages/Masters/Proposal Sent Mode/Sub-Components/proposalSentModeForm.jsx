import React, { useState, useEffect } from 'react';
import { useProposalSentMode } from '../useProposalSentMode';

const API_URL = import.meta.env.VITE_API_URL;

const ProposalSendMode = ({ initialData, onClose }) => {
  const [formData, setFormData] = useState({
    name: ''
  });

  const {addProposalSentMode} = useProposalSentMode();

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };


    const handleSubmit = async  (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    const isSucess = await addProposalSentMode(formData); // ✅ Add await here
    if(isSucess) {
      onSuccess?.(); // refresh parent component
      showToast("success", "Proposal send mode created successfully !");
      onClose(); // closes the form.
    }
    else {
      alert("Error creating potential !!");
    }
  };




  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded w-full max-w-2xl"
      >
        <h2 className="text-xl mb-4">{initialData ? "Edit" : "Add"} Company</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Proposal Send Mode Name"
            className="border p-2 rounded"
          />
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProposalSendMode;