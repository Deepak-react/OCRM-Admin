// controllers/UserController.js
import { useEffect, useState } from 'react';
import * as model from './model';

export const useSharedController = () => {
  const [companies, setCompanies] = useState([]);
  const [bussinessType, setBussinessType] = useState([]);
  const [cities, setCities] = useState([]);
  const [roles, setRoles] = useState([]); 
  const [plan, setPlan] = useState([]);
  //  const [roles, setRoles] = useState([]);
  const [bussiness, setBussiness] = useState([]);
  const [currencies, setCurrencies] = useState([]);

  //Contains the business logic to fetch all the companies
  const fetchCompanies = async () => {
      const data = await model.getAllCompanies();
    setCompanies(data);
    };
 

    // //constain for bussiness type

    // const fetchBussinessType = async () => {
    //   const data = await model.getBussinessType();
    //   console.log("The bussiness.types are", data);
    // setBussinessType(Array.isArray(data) ? data : data.data || []);
    // }

      //constain for bussiness type

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
    //containes the bussiness to fetch all currencies

    const fetchCurrencies = async () => {
  try {
    const data = await model.getAllCurrencies();
    console.log("Plan's are", data);
    setCurrencies(Array.isArray(data) ? data : data.data || []);
  } catch (err) {
    console.error("Error fetching plans:", err);
    setCurrencies([]); // fallback
  }
};


    const fetchBussiness = async () => {
  try {
    const data = await model.getAllBussiness();
    console.log("Plan's are", data);
    setBussiness(Array.isArray(data) ? data : data.data || []);
  } catch (err) {
    console.error("Error fetching plans:", err);
    setBussiness([]); // fallback
  }
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
    fetchCurrencies();  
    fetchBussiness();   
    fetchPlan();  
    // fetchBussinessType();     
  }, []);

  return {
    fetchCompanies, 
    companies,
    fetchAllCities,
    fetchRoles,
    roles,
    cities,
    plan,
    bussinessType,
    fetchRoles ,
    fetchCurrencies,
    currencies,
    fetchBussiness,
    bussiness,
    fetchPlan,
  };
};
