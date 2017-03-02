import axios from 'axios';
import { getIdToken } from './AuthService';

const BASE_URL = 'http://localhost:3333';

export { 
    getAllClients, 
    getClientsCreatedByLoggedInUser, 
    registerNewClient 
};

// function getFoodData() {
//   const url = `${BASE_URL}/api/jokes/food`;
//   return axios.get(url).then(response => response.data);
// }

function getAllClients() {
  const url = `${BASE_URL}/api/clients`;
  return axios.get(url).then(response => response.data);
}

function registerNewClient(data) {
  const url = `${BASE_URL}/api/client`;
  return axios.post(url, data,
    { headers: 
        { Authorization: `Bearer ${getIdToken()}` }
    });
}

function getClientsCreatedByLoggedInUser(userID) {
  const url = `${BASE_URL}/api/clients?createdBy=${userID}`;
  return axios.get(url, { headers: { Authorization: `Bearer ${getIdToken()}` }}).then(response => response.data);
}