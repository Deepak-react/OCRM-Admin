import React, { useEffect, useState } from "react";
import * as companyModel from './companyModel'; // This is the only model import needed

export const useCompanyController = () => {

  const [companyData, setCompanyData] = useState([]);
  const [error, setError] = useState(null);
  const [usersByCompany, setUsersByCompany] = useState([]);

  // Function to fetch all company details
  const fetchAllCompanyData = async () => {
    try {
      const data = await companyModel.getAllCompantData();
      setCompanyData(data);
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
      const res = await companyModel.addNewCompany(data);
      //console.log("The response is :", res);
      await fetchAllCompanyData();
      return true;
    } catch (err) {
      console.error('Failed to create company:', err);
      setError(err.message || 'Could not create company');
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
    fetchAllCompanyData,
    error,
    usersByCompany,
    fetchUsersByCompanyId
  };
}



// import React, { useEffect, useState } from "react";
// import * as companyModel from './companyModel';


// export const useCompanyController = () =>{

//     const [companyData, setCompanyData] = useState([]);
//     const [error, setError] = useState(null);

//     //Function to fetch all the company details
//     const fetchAllCompanyData = async () => {
//         try{
//             const data = await companyModel.getAllCompantData();
//             setCompanyData(data);
//         } catch(err){
//             console.error('Failed to fetch company data:', err);
//             setError(err.message || 'Something went wrong');
//         }
//     }


//     //Function to fetch all the company details
//     const fetchCompanyDataById = async (id) => {
//         try{
//             const data = await companyModel.getCompanyById(id);
//             return data;
//         } catch(err){
//             console.error('Failed to fetch company data:', err);
//             setError(err.message || 'Something went wrong');
//         }
//     }

//     //Function to add an new company
//     const createCompany = async (data)=>{
//         try {
//             const res = await companyModel.addNewCompany(data);
//             console.log("The response is :", res);
//             await fetchAllCompanyData();
//             return true;
//         } catch(err) {
//             console.error('Failed to create company:', err);
//             setError(err.message || 'Could not create company');
//             return false;
//         }
//     }



//  useEffect(() => {
//     fetchAllCompanyData();
//   }, []);

//     return {
//     companyData,
//     fetchCompanyDataById,
//     createCompany,
//     fetchAllCompanyData, // for component reload once create API hits
//     error, // Optional: expose to show in UI
//   };

// }


