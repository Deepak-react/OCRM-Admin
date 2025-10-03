import { moduleAllocationController } from "./module_allocation_controller";

// MODULE ALLOCATION COMPONENT 
export function ModuleAllocation() {
    //VARIABLES 
    const { moduleAllocation,
        error,
        loading } = moduleAllocationController();
        if(error)return<p>error</p>
        if(loading)return <p>Loading</p>

    return (
              <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 p-6 sm:p-8 font-sans antialiased">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-8 leading-tight">
                    Module
                </h1>
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 mt-6">
                    <table className="min-w-full divide-y divide-gray-200 p-2">
                        <thead className="bg-gray-50">
                        <tr >
                        <th className="p-2" >Subscription</th>
                        <th className="p-2">Module</th>
                        <th className="p-2">Created By</th>
                        <th className="p-2">Updated By</th>
                        <th className="p-2">status</th>
                        <th className="p-2">Options</th>
                    </tr>

                </thead>
                <tbody className="bg-white divide-y text-center divide-gray-200">
                    {moduleAllocation.length > 0 ? (
                        moduleAllocation.map(module => (
                            <tr key={module.id}>
                                <td className="p-2">{module.subscriptionName}</td>
                                <td className="p-2">{module.moduleName}</td>
                                <td className="p-2">{module.createdBy}</td>
                                <td className="p-2">{module.updatedBy}</td>
                                <td className="p-2">
                                     <span
                                                className={`px-3 py-1 rounded-full text-sm font-semibold 
                          ${module.bactive
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                    }`}
                                            >
                                                {module.bactive ? "Active" : "Inactive"}
                                            </span>


                                </td>
                                <td className="p-2 flex justify-evenly ">
                                    <button className=" p-2 py-1 rounded  bg-blue-500 hover:bg-blue-600">Edit</button>
                                    <button className=" p-2 py-1 rounded bg-yellow-500  hover:bg-yellow-600">Change status</button>
                                </td>

                            </tr>
                        ))
                    ) : (
                        <p>No modules allocated</p>
                    )}

                </tbody>
            </table>
        </div>
         </div>
          </div>
        
    )
}