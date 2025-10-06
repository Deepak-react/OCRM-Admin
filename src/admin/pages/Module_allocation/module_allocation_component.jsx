import { useState, useEffect } from "react";
import { moduleAllocationController } from "./module_allocation_controller";
import ModuleAllocationForm from "./module_allocation_form";

// MODULE ALLOCATION COMPONENT 
export function ModuleAllocation() {
    const {
        moduleAllocation,
        subscriptionModuleAllocation,
        activeModules,
        activeSubscription,
        error,
        loading,
        createModuleAllocation,
        editModuleAllocationController,
        changeAllocationSts,
        getAllModuleAllocation,
        getAllocatedModulesBySubsId
    } = moduleAllocationController();

    // Snackbar state
    const [snackbar, setSnackbar] = useState({ open: false, message: "" });

    // Track current selected subscription
    const [selectedSubscriptionId, setSelectedSubscriptionId] = useState("");

    // Track array of module ids that are currently checked
    const [checkedModules, setCheckedModules] = useState([]);

    // Update checkedModules when switching subscription or allocations update
    useEffect(() => {
        if (
            selectedSubscriptionId &&
            subscriptionModuleAllocation?.length > 0
        ) {
            setCheckedModules(
                subscriptionModuleAllocation.map((allocated) => allocated.module_id)
            );
        } else {
            setCheckedModules([]);
        }
    }, [selectedSubscriptionId, subscriptionModuleAllocation]);

    // Snackbar for error display
    useEffect(() => {
        if (error) {
            setSnackbar({ open: true, message: error });
            const timer = setTimeout(
                () => setSnackbar({ open: false, message: "" }),
                3000
            );
            return () => clearTimeout(timer);
        }
    }, [error]);

    if (loading) return <p>Loading...</p>;

    //Store the active subscription and module
    const moduleAllocationObj = {
        subscription: activeSubscription,
        modules: activeModules
    };

    // Submit edit module allocation form
    const handleEditAllocation = (e) => {
        e.preventDefault();
        // Compare to currently allocated modules to find adds/removes
        const currentlyAllocated = subscriptionModuleAllocation.map(
            (allocated) => allocated.module_id
        );
        const deactivateModulesIds = currentlyAllocated.filter(
            (id) => !checkedModules.includes(id)
        );
        const newMouldesIds = checkedModules.filter(
            (id) => !currentlyAllocated.includes(id)
        );

        editModuleAllocationController({
            subscriptionId: Number(selectedSubscriptionId),
            moduleAllocations: [
                { deactivateModulesIds },
                { newMouldesIds }
            ]
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 p-6 sm:p-8 font-sans antialiased">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-8 leading-tight">
                    Module Allocation
                </h1>

                <button>Edit allocated and add new modules</button>
                <div>Edit allocated modules</div>

                {/* === EDIT MODULE FORM === */}
                <form onSubmit={handleEditAllocation}>
                    <select
                        value={selectedSubscriptionId}
                        onChange={(e) => {
                            setSelectedSubscriptionId(e.target.value);
                            getAllocatedModulesBySubsId(e.target.value, "allocatedModules");
                        }}
                        className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                        <option value="" disabled>
                            -- Select Subscription --
                        </option>
                        {activeSubscription?.length > 0 ? (
                            activeSubscription.map((subscription) => (
                                <option key={subscription.plan_id} value={subscription.plan_id}>
                                    {subscription.plan_name}
                                </option>
                            ))
                        ) : (
                            <option>No active subscription found</option>
                        )}
                    </select>

                    <div>
                        {activeModules.length > 0 ? (
                            activeModules.map((module) => (
                                <div
                                    key={module.imodule_id}
                                    className="flex items-center gap-2 my-2"
                                >
                                    <input
                                        type="checkbox"
                                        value={module.imodule_id}
                                        checked={checkedModules.includes(module.imodule_id)}
                                        onChange={() => {
                                            setCheckedModules((prev) =>
                                                prev.includes(module.imodule_id)
                                                    ? prev.filter((id) => id !== module.imodule_id)
                                                    : [...prev, module.imodule_id]
                                            );
                                        }}
                                    />
                                    <label>{module.cmodule_name}</label>
                                </div>
                            ))
                        ) : (
                            <h3>No active module found</h3>
                        )}
                        <button type="submit">Edit allocation</button>
                    </div>
                </form>

                {/* === MODULE ALLOCATION FORM === */}
                <ModuleAllocationForm
                    onSubmit={(data) => {
                        createModuleAllocation(data);
                        console.log("Request data is : ", data);
                    }}
                    moduleAllocationObj={moduleAllocationObj}
                />

                {/* === ALLOCATION TABLE === */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 mt-6">
                    <table className="min-w-full divide-y divide-gray-200 p-2">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="p-2">Subscription</th>
                                <th className="p-2">Module</th>
                                <th className="p-2">Created By</th>
                                <th className="p-2">Updated By</th>
                                <th className="p-2">Status</th>
                                <th className="p-2">Option</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y text-center divide-gray-200">
                            {moduleAllocation.length > 0 ? (
                                moduleAllocation.map((module) => (
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
                                        <td className="p-2 flex justify-evenly">
                                            <button
                                                className="p-2 py-1 rounded bg-yellow-500 hover:bg-yellow-600"
                                                onClick={() => {
                                                    changeAllocationSts(module.id, !module.bactive);
                                                    getAllModuleAllocation();
                                                }}
                                            >
                                                Change status
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="p-2 text-center">
                                        No modules allocated
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Snackbar */}
            {snackbar.open && (
                <div className="fixed bottom-5 right-5 bg-red-400 text-white px-4 py-2 rounded shadow-lg">
                    {snackbar.message}
                </div>
            )}
        </div>
    );
}
