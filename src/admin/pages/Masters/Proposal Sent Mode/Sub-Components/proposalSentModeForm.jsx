import React, { useState, useEffect } from 'react';
import { useProposalSentMode } from '../useProposalSentMode';
import { useToast } from '../../../../../context/ToastContext';

const API_URL = import.meta.env.VITE_API_URL;

const ProposalSendMode = ({ initialData, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: ''
  });

  const {addProposalSentMode, updateProposalSentMode } = useProposalSentMode();
  const { showToast } = useToast();

useEffect(() => {
  if (initialData) {
    // Create a shallow copy with default fallback
    setFormData({
      name: initialData.name || "",
    });
  } else {
    // Reset form for add mode
    setFormData({ name: "" });
  }
}, [initialData]);


  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };


    const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('Form submitted:', formData);

  let isSuccess = false;

  if (initialData) {
    console.log("In edit mode with ID:", initialData);

    // EDIT mode
    isSuccess = await updateProposalSentMode(
      formData,
      initialData.proposal_send_mode_id
    );
    if (isSuccess) {
      showToast("success", "Proposal Send Mode updated successfully!");
    } else {
      showToast("error", "Error updating Proposal Send Mode!");
    }
  } else {
    console.log("In add mode with ID:", formData );

    // CREATE mode
    isSuccess = await addProposalSentMode(formData);
    if (isSuccess) {
      showToast("success", "Proposal Send Mode created successfully!");
    } else {
      showToast("error", "Error creating Proposal Send Mode!");
    }
  }

  if (isSuccess) {
    onSuccess?.(); // Refresh parent table
    onClose();     // Close form
  }
};




  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center  items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded w-full max-w-2xl"
      >
        <h2 className="text-xl mb-4">
          {initialData ? "Edit" : "Add"} Proposal send mode
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            placeholder="Enter Proposal Send Mode Name"
            className="border p-2 rounded"
          />
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => {
              setFormData({ name: "" }); // clear form data
              onClose(); // close the form
            }}
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