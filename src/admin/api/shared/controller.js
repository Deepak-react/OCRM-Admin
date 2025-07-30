// controllers/UserController.js
import { useEffect, useState } from 'react';
import * as model from './model';

export const useSharedController = () => {
    //contains comapies data 
  const [companies, setCompanies] = useState([]);

    //contains cities data
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);



  //Contains the business logic to fetch all the companies
  const fetchCompanies = async () => {
      const data = await model.getAllCompanies();
    console.log("The lead status response is :", data);
    setCompanies(data);
    };

  //Contains the business logic to fetch all the cities    
    const fetchAllCities = async() =>{
      const data = await model.getAllCities();
      console.log("The lead status response is :", data);
      setCities(data);
    };


//Contains the business logic to fetch all the countries
    const fetchAllCountries = async() =>{
      const data = await model.getAllCountries();
      console.log("The country response is :", data);
      setCountries(data);
    };


  //Use effect initially runs.
  useEffect(() => {
    fetchCompanies();
    fetchAllCities();
    fetchAllCountries();
  }, []);

  return {
    fetchCompanies, //For manual refresh 
    companies,
    fetchAllCities,
    cities,
    fetchAllCountries,
    countries 

    
  };
};
