import * as ApiHelper from '../../api/ApiHelper';
import axios from "axios";
// import { getAll, getById, create, update, deActive } from '../../api/ApiHelper';
import { ENDPOINTS } from '../../api/ApiConstant';
import { getAll } from "../../api/ApiHelper";


/** 
* @param {number} iuaId - The User Attribute ID (iua_id).
* @param {boolean} status - The new active status.
*/

// update the attribute based on the selected user
export const updateAttributeStatus = async (iuaId, status) => {
  const fullApiUrl = `${ENDPOINTS.UPDATE_ATTRIBUTE_USER_ID}/${iuaId}/status`;
  const token = localStorage.getItem('token');

  if (!token) {
    console.error("Authentication token not found!");
    throw new Error("Missing authentication token.");
  }

  try {
    const response = await axios.put(
      fullApiUrl,
      { status: status },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (err) {
    console.error(`Axios PUT failed for ${fullApiUrl}:`, err);
    throw err;
  }
};

export const applyUserAttributeChanges = async (targetUserId, stagedAttributes, existingUserAttributes) => {
  const existingAttrMap = new Map();
  existingUserAttributes.forEach(attr => {
    existingAttrMap.set(attr.iattribute_id, attr);
  });

  const promises = [];

  for (const [attrIdString, isChecked] of Object.entries(stagedAttributes)) {
    const attrId = parseInt(attrIdString);
    const existingAttr = existingAttrMap.get(attrId);
    if (!existingAttr) {
      if (isChecked) {
        console.warn(`Skipping NEW assignment for attribute ${attrId}. Only status update (PUT) is allowed.`);
      }
      continue;
    }

    // Only proceed if the attribute EXISTS (has an iua_id)
    if (isChecked && !existingAttr.bactive) {
      // ACTIVATE
      promises.push(updateAttributeStatus(existingAttr.iua_id, true));
    } else if (!isChecked && existingAttr.bactive) {
      // DEACTIVATE
      promises.push(updateAttributeStatus(existingAttr.iua_id, false));
    }
  }
  return Promise.all(promises);
};


// to get all the attribute data.
export const getAllAttributes = async () => {
  const response = await ApiHelper.getAll(ENDPOINTS.GET_ATTRIBUTE);
  return response.data.attribuites || [];
};

// get attribute basedon the user id
export const getUserAttributes = async (userId) => {
  try {
    const response = await ApiHelper.getById(userId, ENDPOINTS.GET_ATTRIBUTE_USER_ID);
    // console.log('Response from getUserAttributes:', response.data);

    if (response.data && response.data.error === "No attribute found for this user ID !") {
      return [];
    }
    return response.data.attributes || [];

  } catch (err) {
    const errorMessage = err?.response?.data?.error;

    if (errorMessage === "No attribute found for this user ID !") {
      console.warn(`User ${userId} has no assigned attributes. Displaying empty list.`);
      return [];
    }
    console.error("Failed to fetch user attributes due to critical error:", err);
    throw err;
  }
};


export const changeUserSettingsStatus = async (settingsData) => {
  // console.log('Settings data being sent to changeUserSettingsStatus:', settingsData, ENDPOINTS.USER_SETTINGS);
  const res = await ApiHelper.update_patch_no_id(ENDPOINTS.USER_SETTINGS, settingsData);
  // console.log('The response from changeUserSettingsStatus is :', res);

  return res.data;
}

// to get all the company data.
export const getAllCompantData = async () => {
  console.info("all company data api called");
  const res = await ApiHelper.getAll(ENDPOINTS.COMPANIES);
  return res.data;
};


export const getAuditLogs = async (company_id) => {
  const res = await ApiHelper.getAll(ENDPOINTS.AUDIT_LOGS(company_id));
  return res.data;
};

export const changeSettingStatus = async (data, company_id) => {
  //console.log(ENDPOINTS.COMPANIES);
  const res = await ApiHelper.update_patch(company_id, ENDPOINTS.COMPANY_SETTINGS, data);
  console.log("The errored response is :", res);
  return res.data;
}

export const changeUserStatus = async (user_id) => {
  const res = await ApiHelper.deActive(user_id, ENDPOINTS.USER);
  return res.data;
};

//to add an new company.
export const addNewCompany = async (data) => {
  return await ApiHelper.create(data, ENDPOINTS.COMPANIES);
};


//to add an admin user when the company is created
export const addAdminUser = async (data) => {
  const res = await ApiHelper.create(data, ENDPOINTS.USER);
  return res.data;
};


export const editCompany = async (data, company_id) => {
  console.log("The company data and the company id are :", data, company_id);
  const res = await ApiHelper.update(company_id, data, ENDPOINTS.COMPANIES);
  console.log("The errored response is :", res);
  return res.data;
};

//to get an company data based on the id.
export const getCompanyById = async (id) => {
  const res = await ApiHelper.getById(id, ENDPOINTS.COMPANIES_ID);
  return res.data.result;
}

// to get all the user data based on the company id.
export const getUsersByCompanyId = async (companyId) => {
  try {
    const response = await getAll(ENDPOINTS.USER_TAB(companyId));
    return response.data;
  } catch (error) {
    throw error;
  }
};

//To the storage details based on the company id 
export const getStorageDetails = async (companyId) => {
  try {
    const response = await ApiHelper.getById(companyId, ENDPOINTS.GET_STORAGE_DETAILS);
    const data = response.data;
    if (data.success) return data.data;
    throw new Error(data.message)
  } catch (e) {
    return e.message
  }
}