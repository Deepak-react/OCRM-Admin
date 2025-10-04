import React, { useState, useEffect, useCallback } from "react"; 
import { useParams } from "react-router-dom"; 
import { useCompanyController } from "./companyController";
import * as companyModel from "./companyModel"; 

const CompanyUser = () => {
    const { userId } = useParams(); 
    const targetUserId = userId ? parseInt(userId) : null;

    const { 
        attributes,       
        userAttributes,   
        loading, 
        error,
        fetchUserAttributes 
    } = useCompanyController(targetUserId);

    const [stagedAttributes, setStagedAttributes] = useState({});
    const [isSaving, setIsSaving] = useState(false);
    const [hasPendingChanges, setHasPendingChanges] = useState(false);
    
    useEffect(() => {
        if (!loading && attributes.length > 0) {
            const initialStaged = {};
            
            attributes.forEach(attr => {
                initialStaged[attr.iattribute_id] = false;
            });

            userAttributes.forEach(assignedAttr => {
                initialStaged[assignedAttr.iattribute_id] = assignedAttr.bactive; 
            });
            
            setStagedAttributes(initialStaged);
            setHasPendingChanges(false); 
        }
    }, [userAttributes, loading, attributes]); 

    const handleCheckboxChange = (attrId, checked) => {
        setStagedAttributes(prev => ({
            ...prev,
            [attrId]: checked
        }));
        setHasPendingChanges(true); 
    };

    const handleSave = async () => {
        if (!targetUserId || isSaving || !hasPendingChanges) return;

        setIsSaving(true);
        try {
            await companyModel.applyUserAttributeChanges(
                targetUserId, 
                stagedAttributes, 
                userAttributes 
            );
            
            await fetchUserAttributes(targetUserId);
            alert("Attribute changes saved successfully! 🎉");
        } 
        catch (err) {
            console.error("Failed to save attribute changes:", err);
            await fetchUserAttributes(targetUserId); 
            alert("Error: Failed to save changes. Please try again.");
        }
         finally {
            setIsSaving(false);
        }
    };

    const isReady = !loading && targetUserId;
    const assignedAttrIds = new Set(userAttributes.filter(a => a.bactive).map(attr => attr.iattribute_id));

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Attribute Access for User ID: {targetUserId || 'N/A'}</h2>
                
                {/* SAVE BUTTON */}
                <button
                    onClick={handleSave}
                    disabled={!hasPendingChanges || isSaving || loading || !targetUserId}
                    className={`px-6 py-2 rounded-lg font-semibold transition-colors duration-200 shadow-md ${
                        hasPendingChanges && isReady && !isSaving 
                            ? 'bg-blue-600 text-white hover:bg-blue-700' 
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            {!targetUserId && <p className="text-red-700 font-bold">Error: No User ID provided in the URL.</p>}
            {loading && <p>Loading attributes...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {isReady && !error && attributes.length > 0 && userAttributes.length === 0 && (
                <div className="p-4 mb-4 text-sm text-yellow-800 bg-yellow-100 rounded-lg" role="alert">
                    ⚠️ This user currently has **no attributes assigned**. Check the boxes below to grant access.
                </div>
            )}
            
            {/* Attribute List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {isReady && attributes.map(attr => {
                    const isChecked = stagedAttributes[attr.iattribute_id] || false; 
                    return (
                        <label
                            key={attr.iattribute_id}
                            className="flex items-center space-x-2 border p-2 rounded-md"
                        >
                            <input
                                type="checkbox"
                                checked={isChecked} 
                                disabled={!isReady || isSaving} 
                                onChange={(e) =>
                                    handleCheckboxChange(attr.iattribute_id, e.target.checked)
                                }
                                className="w-4 h-4"
                            />
                            <span>{attr.cattribute_name}</span>
                        </label>
                    );
                })}
            </div>
        </div>
    );
};

export default CompanyUser;