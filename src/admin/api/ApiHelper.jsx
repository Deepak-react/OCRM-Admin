import API from './Api';
export const getAll = (endpoint) => API.get(endpoint);
export const getById = (id, endpoint) => API.get(`${endpoint}/${id}`);
export const create = (data, endpoint) => API.post(endpoint, data);
export const update = (id, endpoint, data) => API.put(`${endpoint}/${id}`, data);
export const update_patch = (id, endpoint, data) => API.patch(`${endpoint}/${id}`, data);
export const deActive = (id, endpoint) => API.delete(`${endpoint}${id}`);
//UPDATE WITH QUERY PARAMS
export const updateWithQueryParams = (queryParams, endpoint, data) => {
  // Build query string from object
  const queryString = new URLSearchParams(queryParams).toString();
  const url = `${endpoint}?${queryString}`;
  return API.put(url, data);
};


    