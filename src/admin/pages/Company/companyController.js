import React, { useEffect, useState } from "react";
import * as companyModel from './companyModel';
import { create } from "../../api/ApiHelper";

export const useCompanyController = () => {
  const [companyData, setCompanyData] = useState([]);
  const [error, setError] = useState(null);
  const [usersByCompany, setUsersByCompany] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [currencies, setCurrencies] = useState([]);
  const [bussiness, setBussiness] = useState([]);
  const [plan, setPlan] = useState([]);

  // Function to fetch all company details
  const fetchAllCompanyData = async () => {
    try {
      const data = await companyModel.getAllCompantData();
      console.log("Fetched company data:", data);
      setCompanyData(data);
    } catch (err) {
      console.error('Failed to fetch company data:', err);
      setError(err.message || 'Something went wrong');
    }
  }

  const changeUserStatus = async (userId, newStatus) => {
    try { 
      const response = await companyModel.changeUserStatus(userId);
      if(response.status === 204) {
        console.log("User status changed successfully:", response);
        setUsersByCompany(prevUsers =>
          prevUsers.map(user =>
            user.iUser_id === userId
              ? { ...user, bactive: newStatus }
              : user
          )
        );
      }
    } catch (err) {
      console.error('Failed to change user status:', err);  
    }
  }

 const fetchCurrencies = async () => {
  try {
    const res = await companyModel.getCurrencies(); 
    setCurrencies(res.data || []);
    return res.data || [];
  } catch (err) {
    console.error("Failed to fetch currencies:", err);
    setError(err.message || "Something went wrong");
    return [];
  }
};
  const fetchBusinessTypes = async () => {
    try {
      const res = await companyModel.getBusinessTypes();
      setBussiness(res.data || []);
      return res.data || [];
    } catch (err) {
      console.error("Failed to fetch business types:", err);
      setError(err.message || "Something went wrong");
      return [];
    }
  };

  const fetchSubscriptionPlans = async () => {
    try {
      const res = await companyModel.getSubscriptionPlans();
      setPlan(res.data || []);
      return res.data || [];
    } catch (err) {
      console.error("Failed to fetch subscription plans:", err);
      setError(err.message || "Something went wrong");
      return [];
    }
  };

  const fetchAuditLogs = async (company_id) => {
    try {
      const data = await companyModel.getAuditLogs();
      return data;
    } catch (err) {
      console.error('Failed to fetch company data:', err);
      setError(err.message || 'Something went wrong');
    }
  }

  const changeSettingsStatus = async (name, status) => {
    
  }

  // Function to fetch company by ID
  const fetchCompanyDataById = async (id) => {
    try {
      console.log("This is the company data function!")
      const data = await companyModel.getCompanyById(id);
      console.log("Company details are:", data);
      return data;
    } catch (err) {
      console.error('Failed to fetch company data:', err);
      setError(err.message || 'Something went wrong');
    }
  }

  const createCompany = async (data) => {
    try {
      // Prepare payload for Prisma
      const payload = {
        cCompany_name: data.cCompany_name,
        iPhone_no: data.iPhone_no,
        cWebsite: data.cWebsite,
        caddress1: data.caddress1,
        caddress2: data.caddress2,
        caddress3: data.caddress3,
        cpincode: data.cpincode,
        cLogo_link: data.cLogo_link,
        cGst_no: data.cGst_no,
        icin_no: data.icin_no,
        cPan_no: data.cPan_no,
        industry: data.industry,
        iUser_no: data.iUser_no,
        bactive: data.bactive,
      };

      // Optional relations only if IDs exist
      if (data.ireseller_id) payload.reseller = { connect: { ireseller_id: data.ireseller_id } };
      if (data.icity_id) payload.city = { connect: { icity_id: data.icity_id } };
      if (data.ireseller_admin) payload.resellerAdmin = { connect: { iUser_id: data.ireseller_admin } };
      if (data.isubscription_plan) payload.pricing_plan = { connect: { plan_id: data.isubscription_plan } };
      if (data.ibusiness_type) payload.businessType = { connect: { id: data.ibusiness_type } };
      if (data.icurrency_id) payload.currency = { connect: { icurrency_id: data.icurrency_id } };

      // Call model function to insert company into DB
      const res = await companyModel.addNewCompany(payload);
      console.log("Company created with ID:", res.data.iCompany_id);
      return true;

    } catch (err) {
      console.error("Failed to create company:", err);
      return false;
    }
  };

  // Function to edit company details - UPDATED
  const editCompanyDetails = async (data, company_id) => {
    setLoading(true);
    try {
      // Prepare payload matching the PUT structure
      const payload = {
        cCompany_name: data.cCompany_name,
        iPhone_no: data.iPhone_no,
        cWebsite: data.cWebsite,
        caddress1: data.caddress1,
        caddress2: data.caddress2,
        caddress3: data.caddress3,
        cpincode: data.cpincode,
        cLogo_link: data.cLogo_link,
        cGst_no: data.cGst_no,
        fax_no: data.fax_no,
        icin_no: data.icin_no,
        cPan_no: data.cPan_no,
        industry: data.industry,
        cemail_address: data.cemail_address,
        iUser_no: data.iUser_no,
        bactive: data.bactive,
        icity_id: data.icity_id,
        isubscription_plan: data.isubscription_plan,
        ibusiness_type: data.ibusiness_type,
        ireseller_id: data.ireseller_id,
        icurrency_id: data.icurrency_id,
      };

      console.log("Sending edit payload:", payload);

      const res = await companyModel.editCompany(payload, company_id);
      console.log("Edit company response:", res);
      setMessage(res.message);
      setLoading(false);
      return true;
    } catch (err) {
      console.log("Error object:", err);
      console.error('Failed to update company details:', err.message);
      setError(err.message || 'Could not update company details');
      setLoading(false);
      return false;
    }
  };

  // Function to fetch additional data for edit form
  const fetchAdditionalData = async () => {
    try {
      await Promise.all([
        fetchCurrencies(),
        fetchBusinessTypes(),
        fetchSubscriptionPlans()
      ]);
    } catch (error) {
      console.error("Failed to fetch additional data:", error);
    }
  };

  //function to create normal user for a company 
  const createUser = async (data) => {
    try {
      console.log("Creating user with data:", data);
      const res = await companyModel.addAdminUser(data);
      console.log("The response is :", res);
      return true;
    } catch (err) {
      console.error('Failed to create user:', err);
      console.log("The response is:", err.response?.data?.error);
      setError(err.response?.data?.error || 'Could not create user');
      return false;
    }
  }

  // Function to fetch users by company ID
  const fetchUsersByCompanyId = async (companyId) => {
    try {
      const res = await companyModel.getUsersByCompanyId(companyId);
      setUsersByCompany(res.data); 
      setError(null);
      return res.data;
    } catch (err) {
      console.error("Failed to fetch users by company:", err);
      setError(err.message || "Something went wrong");
      return [];
    }
  };

  useEffect(() => {
    fetchAllCompanyData();
  }, []);

  return {
    companyData,
    fetchCompanyDataById,
    createCompany,
    fetchAllCompanyData,
    changeUserStatus,
    editCompanyDetails,
    createUser,
    error,
    message,
    loading,
    usersByCompany,
    setUsersByCompany,
    fetchUsersByCompanyId,
    fetchAuditLogs,
    fetchAdditionalData,
    currencies,
    bussiness,
    plan,
    fetchCurrencies,
    fetchBusinessTypes,
    fetchSubscriptionPlans
  };
}