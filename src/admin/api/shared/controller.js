// controllers/UserController.js
import { useEffect, useState } from 'react';
import * as model from './model';

export const useSharedController = () => {
    //contains comapies data 
  const [companies, setCompanies] = useState([]);

    //contains cities data
  const [cities, setCities] = useState([]);

  // contains roles data
  const [roles, setRoles] = useState([]);


  //Contains the business logic to fetch all the companies
  const fetchCompanies = async () => {
      const data = await model.getAllCompanies();
    console.log("The lead status response is :", data);
    setCompanies(data);
    };

  //Contains the business logic to fetch all the cities    
    const fetchAllCities = async () => {
      const data = await model.getAllCities();
      console.log("The lead status response is :", data);
      setCities(data);
    };


    // function to fetch the roles for an company
    const fetchRoles = async () => {
      try {
        const data = await model.getAllRoles();
        console.log("The user roles are:", data )
        setRoles(data);
        return data;
      } catch (err) {
        console.error("Failed to fetch company data:", err);
        setError(err.message || "Something went wrong");
      }
    };


  //Use effect initially runs.
  useEffect(() => {
    fetchCompanies();
    fetchAllCities();             
  }, []);

  return {
    fetchCompanies, //For manual refresh 
    companies,
    fetchAllCities,
    fetchRoles,
    roles,
    cities

    
  };
};
