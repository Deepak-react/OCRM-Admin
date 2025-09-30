import React, { useState } from "react";
import { moduleController } from "./module_controller";
import ModuleForm from "./module_form";

export default function ModulePage() {
    const {
        modules,
        error,
        loading,
        addNewModule,
        updateModule,
        changeModuleStatus,
    } = moduleController();

    console.log("modules : ", modules);

    const [editing, setEditing] = useState(null);

    // Pagination setup
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentModules = modules.length > 0 ? modules.slice(indexOfFirstItem, indexOfLastItem) : [];

    const totalPages = Math.ceil(modules.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) return <p className="text-gray-600">Loading...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 p-6 sm:p-8 font-sans antialiased">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-8 leading-tight">
                    Module
                </h1>

                {/* Module Form */}
                <ModuleForm
                    onSubmit={(data) => {
                        if (editing) {
                            // editing is a full module object
                            updateModule({id:editing.imodule_id,  moduleName: data });
                            setEditing(null);
                        } else {
                            addNewModule({ moduleName: data });
                        }
                    }}
                    module={editing}
                />

                {/* Table */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 mt-6">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    S.No
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Module Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Created By
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Updated By
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentModules.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
                                    >
                                        No module found.
                                    </td>
                                </tr>
                            ) : (
                                currentModules.map((module, index) => (
                                    <tr
                                        key={module.imodule_id}
                                        className="hover:bg-blue-50 transition-colors duration-150 ease-in-out"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {indexOfFirstItem + index + 1}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                            {module.cmodule_name || "-"}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                            {module.createdBy?.cFull_name || "-"}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                            {module.updatedBy?.cFull_name || "-"}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                                            <button
                                                onClick={() => setEditing(module)} // 👈 pass full module object
                                                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => changeModuleStatus({id:module.imodule_id,status:!module.bactive})}
                                                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                            >
                                                Change Status
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-6 space-x-2">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Previous
                        </button>
                        {[...Array(totalPages).keys()].map((number) => (
                            <button
                                key={number + 1}
                                onClick={() => paginate(number + 1)}
                                className={`px-4 py-2 rounded-lg transition-colors ${currentPage === number + 1
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}
                            >
                                {number + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
