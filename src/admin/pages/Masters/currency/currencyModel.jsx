import * as ApiHelper from '../../../api/ApiHelper';
import { ENDPOINTS } from '../../../api/ApiConstant';

export const getAllCurrency = async () => {
  try {
    const response = await ApiHelper.getAll(ENDPOINTS.CURRENCY);
    console.log('Raw Currency API Response:', response.data);

    // Assuming the response structure is consistent with the provided example
    return response.data.data.data;
  } catch (error) {
    console.error("Currency API Error:", error);
    throw error;
  }
};

export const addNewCurrency = async (data) => {
  try {
    const payload = {
      country_name: data.country_name,
      currency_code: data.currency_code,
      currency_name: data.currency_name,
      symbol: data.symbol,
      bactive: true
    };
    const response = await ApiHelper.create(payload, ENDPOINTS.CURRENCY);
    return response.data.data.data;
  } catch (error) {
    console.error("Error creating currency:", error);
    throw error;
  }
};

export const updateCurrency = async (id, currencyData) => {
  try {
    console.log(`Updating currency ${id} with:`, currencyData);
    // As the PUT request payload was not provided, I'm assuming a similar structure to POST.
    // The soft-delete is a separate API call based on the provided DELETE endpoint.
    const payload = {
      country_name: currencyData.country_name,
      currency_code: currencyData.currency_code,
      currency_name: currencyData.currency_name,
      symbol: currencyData.symbol,
      bactive: currencyData.bactive
    };
    const response = await ApiHelper.update(id, ENDPOINTS.CURRENCY, payload);
    console.log('API Response:', response);
    // Assuming the response data has the updated object
    return response.data.data;
  } catch (error) {
    console.error("Error updating currency:", error);
    throw error;
  }
};

export const deleteCurrency = async (id) => {
  try {
    // The user mentioned soft delete, and the district model uses a separate endpoint
    // so this will call the soft-delete API.
    const response = await ApiHelper.deActive(id, ENDPOINTS.CURRENCY_ID);
    return response;
  } catch (error) {
    console.error("Error deactivating currency:", error);
    throw error;
  }
};