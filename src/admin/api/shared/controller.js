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
      //contains cities data
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
    const fetchAllCities = async() =>{
      const data = await model.getAllCities();
      console.log("The lead status response is :", data);
      setCities(data);
    };


  //Use effect initially runs.
  useEffect(() => {
    fetchCompanies();
    fetchAllCities();
    fetchBussinessType();
    fetchPlan();
  }, []);

  return {
    fetchCompanies, //For manual refresh 
    companies,
    fetchAllCities,
    cities,
    fetchBussinessType,
    bussinessType,
    fetchPlan,
    plan
    

    
  };
};
