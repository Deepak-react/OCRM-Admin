import { useEffect, useState } from "react";
import { leadLostReason } from "./lead_lost_reason_controller";
import { LostReasonForm } from "./lead_lost_reason_form";
import CloseIcon from "@mui/icons-material/Close";

//COMPONENT FUNCTION TO ADD AND GET LEAD LOST REASON
export function LeadLostReason(companyId) {
  console.log("Company id in lead lost reason ; ", companyId.company)
  //CALLING CONTROLLER 
  const {
    leadLostReasons,
    loading,
    error,
    message,
    getLeadLostReasonByCompanyId,
    createLeadLostReasonController
  } = leadLostReason();

  console.log("message in component : ",message)
  const [showForm, setShowForm] = useState(false)
      // Snackbar state
    const [snackbar, setSnackbar] = useState({ open: false, message: "" });

        // Snackbar for error display
    useEffect(() => {
        if (message) {
            setSnackbar({ open: true, message: message });
            const timer = setTimeout(
                () => setSnackbar({ open: false, message: "" }),
                3000
            );
            return () => clearTimeout(timer);
        }
    }, [message]);

  //current page 
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerpage, setItemsPerPage] = useState(10);
  //defing the first index and lost index of the lead lost reason list 
  const firstIndexItem = currentPage - itemsPerpage;
  const lastIndexItem = currentPage * itemsPerpage;
  //calculating the total pages 
  const totalPages = leadLostReasons.length > 0 ? leadLostReasons / itemsPerpage : 0;
  //slice the leadLostReasons value by the firstIndexItem and lostIndexItem structur the list into pagination 
  const listItems = leadLostReasons.length > 0 ? leadLostReasons.slice(firstIndexItem, lastIndexItem) : [];
  //CALLING THE getLeadLostReasonByCompanyId  if it is provided(passed from companyProfile.jsx file ) 
  useEffect(() => {
    if (companyId.company) getLeadLostReasonByCompanyId(companyId.company);
  }, [])
  //return error or load as which one is true otherwise show the table of content 
  if(error) return <p className="text-red-700">{error}</p>
    if(loading) return <p className="text-black font-bold">Loading...</p>
  return (
    <div>
      
      <button onClick={()=>setShowForm(true)}>Add Lost Reason + </button>
      {showForm && (
        
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4" >
          <div className="flex flex-row-reverse ">
                 <button className="z-999" onClick={()=>{setShowForm(false) } }><CloseIcon className="bg-red-500 rounded-full -mt-56 -ml-20 hover:bg-red-600 "/></button>
          <LostReasonForm
            onSubmit={(data)=>{
              createLeadLostReasonController({lostReason:data,
                companyId:companyId.company
              })
            }}
          />
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                S.No
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Lost Reason
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Created At
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Updated At
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {listItems.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  No proposal send mode found for the selected criteria.
                </td>
              </tr>
            ) : (
              listItems.map((reason, index) => (
                <tr
                  key={reason.lostReasonId || `reason-${indexOfFirstItem + index}`} // Using a stable ID or generated one
                  className="hover:bg-blue-50 transition-colors duration-150 ease-in-out"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {++index}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {reason.reason || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                      {reason.createdAt || "-"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {reason.updatedAt || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 ">
                    <span className={` p-2 rounded-2xl w-5 ${reason.isActive ? "bg-green-400 text-green-900" : "bg-red-400 text-red-900"}`}>
                      {reason.isActive === true ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
         {/* Snackbar */}
            {snackbar.open && (
                <div className="fixed bottom-5 right-5 bg-gray-600 text-white px-4 py-2 rounded shadow-lg">
                    {snackbar.message}
                </div>
            )}
      </div>
    </div>
  )
}