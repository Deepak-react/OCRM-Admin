import { useEffect, useState } from "react";
import * as ModuleALlocationModel from "./module_allocation_model"
//MODULE ALLOCATION CONTROLLER 
export  function moduleAllocationController() {
    console.log("Controller check: ")
    //VARIABLES 
    const[moduleAllocation,setModuleAllocation]=useState([])
    const [error,setError]=useState()
    const [loading,setLoading]=useState(true)
    //FUNCTION TO FETCH ALL MODULE ALLOCATIONS 
    async  function getAllModuleAllocation() {
        try {
            setLoading(true)
            //CALLING MODEL FUCNTION 
            const data= await ModuleALlocationModel.getAllAllocatedModules();
            console.log("checking model: ",data)
            setModuleAllocation(data)
        } catch (e) {
            setError(e.message)
        }finally{
            setLoading(false)
        }
        
    }
    


useEffect(()=>{
    getAllModuleAllocation();
},[]);

return {
    moduleAllocation,
    error,
    loading

}
}