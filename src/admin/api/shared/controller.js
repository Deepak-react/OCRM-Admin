// controllers/UserController.js
import { useEffect, useState } from 'react';
import * as model from './model';

export const useSharedController = () => {
  const [companies, setCompanies] = useState([]);
  const [bussinessType, setBussinessType] = useState([]);
  const [cities, setCities] = useState([]);
  const [roles, setRoles] = useState([]); 
  const [plan, setPlan] = useState([]);


  //Contains the business logic to fetch all the companies
  const fetchCompanies = async () => {
      const data = await model.getAllCompanies();
    setCompanies(data);
    };

    const fetchBussinessType = async () => {
      const data = await model.getBussinessType();
      // console.log("The bussiness.types are", data);
      setBussinessType(data.data)
    }
    const fetchPlan = async () => {
  try {
    const data = await model.getPlan();
    setPlan(Array.isArray(data) ? data : data.data || []);
  } catch (err) {
    console.error("Error fetching plans:", err);
    setPlan([]);
  }
};

  //Contains the business logic to fetch all the cities    
    const fetchAllCities = async () => {
      const data = await model.getAllCities();
      // console.log("The lead status response is :", data);
      setCities(data);
    };

    // function to fetch the roles for an company
    const fetchRoles = async () => {
      try {
        const data = await model.getAllRoles();
        // console.log("The user roles are:", data )
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
    fetchCompanies, 
    companies,
    fetchAllCities,
    cities,
    roles,
    plan,
    bussinessType,
    fetchRoles ,
    fetchPlan,
    fetchBussinessType

  };
};
