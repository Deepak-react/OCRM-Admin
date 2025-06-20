import { useState } from "react"
import { useEffect } from "react";
import * as DashboardModel from './dashboardModel';


export const useDashboardController = () =>{
    const [dashboardData, setDashboardData] = useState();
    const [Error, setError] = useState();

    const fetchDashboardData = async ()=>{
        const data = await DashboardModel.getDasgboardData(1);
        setDashboardData(data);
    }

     useEffect(() => {
    fetchDashboardData();
  }, []);

    return {
        dashboardData, 
        fetchDashboardData
    }
}