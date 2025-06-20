import React, { useEffect, useState } from "react";
import * as companyModel from './companyModel';


export const useCompanyController = () =>{

    const [companyData, setCompanyData] = useState([]);
    const [error, setError] = useState(null);

    //Function to fetch all the company details
    const fetchAllCompanyData = async () => {
        try{
            const data = await companyModel.getAllCompantData();
            setCompanyData(data);
        } catch(err){
            console.error('Failed to fetch company data:', err);
            setError(err.message || 'Something went wrong');
        }
    }


    //Function to fetch all the company details
    const fetchCompanyDataById = async (id) => {
        try{
            const data = await companyModel.getCompanyById(id);
            return data;
        } catch(err){
            console.error('Failed to fetch company data:', err);
            setError(err.message || 'Something went wrong');
        }
    }

    //Function to add an new company
    const createCompany = async (data)=>{
        try {
            const res = await companyModel.addNewCompany(data);
            console.log("The response is :", res);
            await fetchAllCompanyData();
            return true;
        } catch(err) {
            console.error('Failed to create company:', err);
            setError(err.message || 'Could not create company');
            return false;
        }
    }



 useEffect(() => {
    fetchAllCompanyData();
  }, []);

    return {
    companyData,
    fetchCompanyDataById,
    createCompany,
    fetchAllCompanyData, // for component reload once create API hits
    error, // Optional: expose to show in UI
  };

}


