import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newPersonObject) => {
  const request = axios.post(baseUrl, newPersonObject);
  return request.then((response) => response.data);
};

const update = (id, newPersonObject) => {
  const url = `${baseUrl}/${id}`;
  const request = axios.put(url, newPersonObject);
  return request.then((response) => response.data);
};

const deletePerson = (id) => {
  const url = `${baseUrl}/${id}`;
  const request = axios.delete(url);
  return request.then((response) => response.data);
};

export default {
  getAll,
  create,
  update,
  deletePerson,
};
