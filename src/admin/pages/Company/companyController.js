import React, { useEffect, useState } from "react";
import * as companyModel from './companyModel'; // This is the only model import needed
import { create } from "../../api/ApiHelper";

export const useCompanyController = () => {

  const [companyData, setCompanyData] = useState([]);
  const [error, setError] = useState(null);
  const [usersByCompany, setUsersByCompany] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Function to fetch all company details
  const fetchAllCompanyData = async () => {
    try {
      const data = await companyModel.getAllCompantData();``
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
          ? { ...user, bactive: newStatus } // Update only the status
          : user
      )
    );
      }
    }
  catch (err) {
      console.error('Failed to change user status:', err);  
    }
  }


const fetchCurrencies = async (companyId) => {
  try {
    const res = await companyModel.getCurrencies(companyId); 
    return res;
  } catch (err) {
    console.error("Failed to fetch currencies:", err);
    setError(err.message || "Something went wrong");
    return [];
  }
};


  const fetchBusinessType = async (companyId) => {}
  const fetchAuditLogs = async (company_id) => {
    try {
      const data = await companyModel.getAuditLogs(
      );
      return data;
    } catch (err) {
      console.error('Failed to fetch company data:', err);
      setError(err.message || 'Something went wrong');
    }
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




 //function to create an admin user when the company is created
  const createAdminUser = async (data) => {
    try {
      console.log("Creating admin user with data:", data);
      const res = await companyModel.addAdminUser(data);
      console.log("The response is :", res);
      await fetchAllCompanyData();
      return true;
    } catch (err) {
      console.error('Failed to create admin user:', err);
      setError(err.message || 'Could not create admin user');
      return false;
    }
  }



  //function to create normal user for an company 
 const createUser = async (data) => {
    try {
      console.log("Creating  user with data:", data);
      const res = await companyModel.addAdminUser(data);
      console.log("The response is :", res);
      return true;
    } catch (err) {
      console.error('Failed to create admin user:', err);
      console.log("The response is:", err.response.data.error)
      setError(err.response.data.error || 'Could not create admin user');
      return false;
    }
  }

  //function to create an admin user when the company is created
  const editCompanyDetails = async (data, company_id) => {
    setLoading(true);
    try {
      const res = await companyModel.editCompany({
      bactive: data.bactive,
          cCompany_name: data.cCompany_name,
          cGst_no: data.cGst_no,
          cLogo_link: data.cLogo_link,
          cWebsite: data.cWebsite,
          caddress1: data.caddress1,
          caddress2: data.caddress2,
          caddress3: data.caddress3,
          email: data.email,
          iPhone_no: data.iPhone_no,
          iUser_no: data.iUser_no,
          icin_no: data.icin_no,
          icity_id: data.icity_id,
          // ireseller_admin: data.ireseller_admin,
          ireseller_id: 1,
          isubscription_plan: data.isubscription_plan,
    cpincode:data.cpincode,
    cPan_no:data.cPan_no,
    ibusiness_type:data.ibusiness_type,
   
    // cPassword: '',
    irole_id: 1,
    // cProfile_pic: '',
    // reports_to: 13,
    fax_no:'',
    industry:'',

      }, company_id);
      console.log("Edit company response:", res);
      setMessage(res.message);
      //console.log("The response is :", res);
      // await fetchCompanyDataById(company_id);
      setLoading(false);
      return true;
    } catch (err) {
      console.log("Error object:", err.message);
      console.error('Failed to update company details:', err.message);
      setError(err.message || 'Could not create admin user');
      return false;
    }
  }


  // Function to fetch users by company ID}
const fetchUsersByCompanyId = async (companyId) => {
  try {
    const res = await companyModel.getUsersByCompanyId(companyId);
    console.log("Setting usersByCompany with:", res.data); 
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
  };
}



