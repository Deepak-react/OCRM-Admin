import { useState, useEffect } from "react";

export default function ModuleForm({ onSubmit, module }) {
  const [moduleName, setModuleName] = useState("");

  // whenever "module" changes (Edit button clicked), update the field
  useEffect(() => {
    if (module) {
      setModuleName(module.cmodule_name || "");
    } else {
      setModuleName("");
    }
  }, [module]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!moduleName.trim()) return;

    // send only the name (id is already in module object in parent)
    onSubmit(moduleName);

    // reset only if creating new
    if (!module) {
      setModuleName("");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={moduleName}
          onChange={(e) => setModuleName(e.target.value)}
          placeholder="Enter module name"
        />
        <button type="submit">
          {module ? "Update Module" : "Create Module"}
        </button>
      </form>
    </div>
  );
}
