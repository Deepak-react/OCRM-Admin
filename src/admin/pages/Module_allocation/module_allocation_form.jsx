import { useState } from "react"

//MODULE ALLOCATION FORM 
export default function ModuleAllocationForm({onSubmit,moduleAllocationObj}){
    const [moduleAllocation,setModuleAllocation]=useState({
        subscriptionId:"",
        moduleIds:[]
        
    })
    const handleSubmit=()=>{
        
    }
    return(
        <form  onSubmit={handleSubmit}>
            <label>Select Subscription</label>
        <select value={moduleAllocation.subscriptionId} 
        onChange={(e)=>setModuleAllocation({subscription:e.target.value})}>
            {/* {moduleAllocationObj.subscription.length>0?(
                {moduleAllocationObj.subscription.map(subscription=>(
                     <option value={subscription}>{subscription}</option>
                ))}
               
            ):()} */}
        
        </select>
         <label>Select Module</label>
        <select value={moduleAllocation.moduleIds}
        onChange={(e)=>setModuleAllocation({...prev,module:e.target.value})}
        >
        <option value="">Module 1</option>
        </select>
        <button>Submit</button>
        <button>Cancel</button>
        </form>
    )
}