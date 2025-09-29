// controllers/UserController.js
import { useEffect, useState } from 'react';
import * as model from './model';

export const useSharedController = () => {
    //contains comapies data 
  const [companies, setCompanies] = useState([]);
  //Bussiness type
  const [bussinessType, setBussinessType] = useState([]);

    //contains cities data
  const [cities, setCities] = useState([]);

  // contains roles data
  const [roles, setRoles] = useState([]);

  //  const [roles, setRoles] = useState([]);

  // const [bussiness, setBussinessType] = useState([]);
//Currencies 
  const [currencies, setCurrencies] = useState([]);

  // Plan 
    const [plan, setPlan] = useState([]);



  //Contains the business logic to fetch all the companies
  const fetchCompanies = async () => {
      const data = await model.getAllCompanies();
    console.log("The lead status response is :", data);
    setCompanies(data);
    };
 

    //constain for bussiness type

    const fetchBussinessType = async () => {
      const data = await model.getBussinessType();
      console.log("The bussiness.types are", data);
      setBussinessType(data.data)
    }

      //constain for bussiness type

    const fetchPlan = async () => {
  try {
    const data = await model.getPlan();
    console.log("Plan's are", data);
    setPlan(Array.isArray(data) ? data : data.data || []);
  } catch (err) {
    console.error("Error fetching plans:", err);
    setPlan([]); // fallback
  }
};


  //Contains the business logic to fetch all the cities    
    const fetchAllCities = async () => {
      const data = await model.getAllCities();
      console.log("The lead status response is :", data);
      setCities(data);
    };
    //containes the bussiness to fetch all currencies
const fetchCurrencies = async () => {
  const res = await model.getAllCurrencies();
  console.log("The currency response is :", res);
  setCurrencies(res.data.data);   // <-- pick the array inside
};

const fetchBussiness = async () => {
  const res = await model.getAllBussiness();
  console.log("The business response is :", res);
  setBussinessType(res.data.data);  // <-- pick the array inside
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
    fetchCurrencies();  
    fetchBussiness();   
    fetchPlan();       
  }, []);

  return {
    fetchCompanies, 
    companies,
    fetchAllCities,
    fetchRoles,
    roles,
    cities,
    fetchCurrencies,
    currencies,
    fetchBussiness,
    bussiness,
    fetchPlan,
    plan


    
  };
};
