import React, { useEffect, useState } from "react";
import * as companyModel from './companyModel'; // This is the only model import needed
import { create } from "../../api/ApiHelper";

export const useCompanyController = () => {

  const [companyData, setCompanyData] = useState([]);
  const [error, setError] = useState(null);
  const [usersByCompany, setUsersByCompany] = useState([]);

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
      const data = await companyModel.getCompanyById(id);
      return data;
    } catch (err) {
      console.error('Failed to fetch company data:', err);
      setError(err.message || 'Something went wrong');
    }
  }

  // Function to create a new company
  const createCompany = async (data) => {
    try {
      const res = await companyModel.addNewCompany({
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
          ireseller_admin: data.ireseller_admin,
          ireseller_id: data.ireseller_id,
          isubscription_plan: data.isubscription_plan
      });
      console.log("The response is :", res.data.iCompany_id);
      console.log("The data to create company data are :", data);
      // await fetchAllCompanyData();
      await createAdminUser({
        iCompany_id: res.data.iCompany_id, // Assuming the response contains the new company ID
        cFull_name : data.cFull_name,
        cProfile_pic : "Place holder for profile pic",
        cUser_name: data.cUser_name,
        cPassword: data.cPassword,
        cEmail: data.cEmail,
        irole_id: 1, //Admin ID
        reports_to: 13
      });
      return true;
    } catch (err) {
      console.error('Failed to create company:', err);
      setError(err.message || 'Could not create company');
      return false;
    }
  }

 //function to create an admin user when the company is created
  const createAdminUser = async (data) => {
    try {
      console.log("Creating admin user with data:", data);
      const res = await companyModel.addAdminUser(data);
      //console.log("The response is :", res);
      await fetchAllCompanyData();
      return true;
    } catch (err) {
      console.error('Failed to create admin user:', err);
      setError(err.message || 'Could not create admin user');
      return false;
    }
  }


  //function to create an admin user when the company is created
  const editCompanyDetails = async (data, company_id) => {
    console.log("Editing company with data:", data, "and company_id:", company_id);
    try {
      const res = await companyModel.editCompany({
        cCompany_name: data.cCompany_name,
        iPhone_no: data.iPhone_no,
        cemail_address: data.cemail_address,
        cWebsite: data.cWebsite,
        iReseller_id: data.iReseller_id,
        iUser_no: data.iUser_no,
        cGst_no: data.cGst_no,
        icin_no: data.icin_no,
        caddress3: data.caddress3,
        caddress2: data.caddress2,
        caddress1: data.caddress1,
        icity_id : data.city.icity_id

      }, company_id);
      //console.log("The response is :", res);
      await fetchCompanyDataById(company_id);
      return true;
    } catch (err) {
      console.error('Failed to create admin user:', err);
      setError(err.message || 'Could not create admin user');
      return false;
    }
  }


  // Function to fetch users by company ID}
const fetchUsersByCompanyId = async (companyId) => {
  try {
    const res = await companyModel.getUsersByCompanyId(companyId);
    //console.log("Setting usersByCompany with:", res.data); 
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
    createAdminUser,
    fetchAllCompanyData,
    changeUserStatus,
    editCompanyDetails,
    error,
    usersByCompany,
    fetchUsersByCompanyId,
    fetchAuditLogs,
  };
}



