import { useEffect, useState } from "react"
import * as subscriptionModel from "./subscription_model"; // ✅ fixed import


//SUBSCRIPTION CONTROLLER 
export function subscriptionCRUDOperation() {
    //VARIABLES 
    const [subscriptions, setSubscriptions] = useState([])
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(null)

    //FUNCTION TO FETCH SUBSCRIPTION LIST 
    async function getAllSubscription() {
        try {
            setLoading(true);
            //CALLING MODEL 
            const data = await subscriptionModel.getAllSubscriptionModel()
            setSubscriptions(data);
        } catch (e) {
            setError(e.message)
        } finally {
            setLoading(false)
        }
    }


    //FUNCTION TO CREATE NEW SUBSCRIPTION  
    async function addSubscription(requestData) {
        try {
            //CALLING MODEL
            const data = await subscriptionModel.addSubscription(requestData);
            setSubscriptions(prev => [...prev, data])
        } catch (e) {
            setError(e.message)
        }
    }
    //FUNCTION TO EDIT SUBSCRIPTION
    async function editSubscription(id,requestData) {
        try {
            //CALLING MODEL
const data = await subscriptionModel.editSubscription(id, requestData);
            setSubscriptions(prev =>
        prev.map(sub => (sub.plan_id === id ? data : sub))
      );
        } catch (e) {
            setError(e.message)
        }
    }
     //FUNCTION TO UPDATE SUBSCRIPTION STATUS
    async function changeSubscriptionStatusController(id,requestData) {
        try {
            //CALLING MODEL
            const data = await subscriptionModel.changeSubscriptionStatus(id,requestData);
            setSubscriptions(prev =>
        prev.map(sub => (sub.plan_id === id ? data : sub))
      );
        } catch (e) {
            setError(e.message)
        }
    }




    //CALLING THE getAllSubscription() FUNCTION 
    useEffect(() => {
        getAllSubscription()
    }, [])

    return {
        subscriptions,
        loading,
        error,
        addSubscription,
        editSubscription,
        changeSubscriptionStatusController,
    }
}