import { useState } from "react";

export default function ModuleAllocationForm({ onSubmit, moduleAllocationObj }) {
  const [moduleAllocation, setModuleAllocation] = useState({
    subscriptionId: null,
    moduleIds: [],
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedData = {
      subscriptionId: Number(moduleAllocation.subscriptionId),
      moduleIds: moduleAllocation.moduleIds.map(Number),
    };

    console.log("Final module allocation data:", formattedData);
    onSubmit(formattedData);
  };

  // Handle single select (subscription)
  const handleSubscriptionChange = (e) => {
    setModuleAllocation((prev) => ({
      ...prev,
      subscriptionId: Number(e.target.value),
    }));
  };

  // Handle multi-select (modules)
  const handleModuleChange = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions, (opt) => Number(opt.value));

    setModuleAllocation((prev) => ({
      ...prev,
      moduleIds: selectedValues,
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-gray-100 rounded-xl shadow-md flex flex-col gap-4 w-[420px]"
    >
      <h2 className="text-xl font-semibold text-gray-800 text-center">
        Allocate Modules to Subscription
      </h2>

      {/* Subscription dropdown */}
      <div className="flex flex-col gap-2">
        <label className="font-medium text-gray-700">Select Subscription</label>
        <select
          name="subscriptionId"
          value={moduleAllocation.subscriptionId || ""}
          onChange={handleSubscriptionChange}
          className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="" disabled>-- Select Subscription --</option>
          {moduleAllocationObj.subscription?.length > 0 ? (
            moduleAllocationObj.subscription.map((subscription) => (
              <option key={subscription.plan_id} value={subscription.plan_id}>
                {subscription.plan_name}
              </option>
            ))
          ) : (
            <option>No active subscription found</option>
          )}
        </select>
      </div>

      {/* Module multi-select */}
      <div className="flex flex-col gap-2">
        <label className="font-medium text-gray-700">Select Modules</label>
        <select
          name="moduleIds"
          multiple
          value={moduleAllocation.moduleIds}
          onChange={handleModuleChange}
          className="border rounded-lg p-2 h-40 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          {moduleAllocationObj.modules?.length > 0 ? (
            moduleAllocationObj.modules.map((module) => (
              <option key={module.imodule_id} value={module.imodule_id}>
                {module.cmodule_name}
              </option>
            ))
          ) : (
            <option>No active module found</option>
          )}
        </select>
        <p className="text-sm text-gray-500">
          (Hold <kbd>Ctrl</kbd> or <kbd>Cmd</kbd> to select multiple)
        </p>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={() =>
            setModuleAllocation({
              subscriptionId: null,
              moduleIds: [],
            })
          }
          className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
