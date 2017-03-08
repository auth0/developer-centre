import axios from 'axios';
import { getIdToken } from './AuthService';
import settings from '../../settings';

const BASE_URL = 'http://localhost:3333';

const ACCESS_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5FWXdRelJHT1RjMU1ESTNNVGxEUVRZNFJqbERRa0pGUWtOQk5qVkROa1V6TWtKQ05qQkJSQSJ9.eyJpc3MiOiJodHRwczovL3VuaWNvZGVyLmF1dGgwLmNvbS8iLCJzdWIiOiIzWDdQNW9WZG1uU3FwUEtlMDBmVDZzWkFmbE5hdXExSkBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly91bmljb2Rlci5hdXRoMC5jb20vYXBpL3YyLyIsImV4cCI6MTQ4OTA0MDExNiwiaWF0IjoxNDg4OTUzNzE2LCJzY29wZSI6InJlYWQ6Y2xpZW50X2dyYW50cyBjcmVhdGU6Y2xpZW50X2dyYW50cyBkZWxldGU6Y2xpZW50X2dyYW50cyB1cGRhdGU6Y2xpZW50X2dyYW50cyByZWFkOnVzZXJzIHVwZGF0ZTp1c2VycyBkZWxldGU6dXNlcnMgY3JlYXRlOnVzZXJzIHJlYWQ6dXNlcnNfYXBwX21ldGFkYXRhIHVwZGF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgZGVsZXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBjcmVhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGNyZWF0ZTp1c2VyX3RpY2tldHMgcmVhZDpjbGllbnRzIHVwZGF0ZTpjbGllbnRzIGRlbGV0ZTpjbGllbnRzIGNyZWF0ZTpjbGllbnRzIHJlYWQ6Y2xpZW50X2tleXMgdXBkYXRlOmNsaWVudF9rZXlzIGRlbGV0ZTpjbGllbnRfa2V5cyBjcmVhdGU6Y2xpZW50X2tleXMgcmVhZDpjb25uZWN0aW9ucyB1cGRhdGU6Y29ubmVjdGlvbnMgZGVsZXRlOmNvbm5lY3Rpb25zIGNyZWF0ZTpjb25uZWN0aW9ucyByZWFkOnJlc291cmNlX3NlcnZlcnMgdXBkYXRlOnJlc291cmNlX3NlcnZlcnMgZGVsZXRlOnJlc291cmNlX3NlcnZlcnMgY3JlYXRlOnJlc291cmNlX3NlcnZlcnMgcmVhZDpkZXZpY2VfY3JlZGVudGlhbHMgdXBkYXRlOmRldmljZV9jcmVkZW50aWFscyBkZWxldGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGNyZWF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgcmVhZDpydWxlcyB1cGRhdGU6cnVsZXMgZGVsZXRlOnJ1bGVzIGNyZWF0ZTpydWxlcyByZWFkOmVtYWlsX3Byb3ZpZGVyIHVwZGF0ZTplbWFpbF9wcm92aWRlciBkZWxldGU6ZW1haWxfcHJvdmlkZXIgY3JlYXRlOmVtYWlsX3Byb3ZpZGVyIGJsYWNrbGlzdDp0b2tlbnMgcmVhZDpzdGF0cyByZWFkOnRlbmFudF9zZXR0aW5ncyB1cGRhdGU6dGVuYW50X3NldHRpbmdzIHJlYWQ6bG9ncyByZWFkOnNoaWVsZHMgY3JlYXRlOnNoaWVsZHMgZGVsZXRlOnNoaWVsZHMgcmVhZDpncmFudHMgZGVsZXRlOmdyYW50cyByZWFkOmd1YXJkaWFuX2ZhY3RvcnMgdXBkYXRlOmd1YXJkaWFuX2ZhY3RvcnMgcmVhZDpndWFyZGlhbl9lbnJvbGxtZW50cyBkZWxldGU6Z3VhcmRpYW5fZW5yb2xsbWVudHMgY3JlYXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRfdGlja2V0cyByZWFkOnVzZXJfaWRwX3Rva2VucyJ9.R5zAknhb-Xkb-ZC057QCMU-SF_iMeH_yIeptPtMUowamfm2JXEDMhERnllKiqrZMoHIsW83ofO2BXXJvQO-gIpAnOAXAXzvRe1STVbdfH-HLMvxKhdqGQo6G1NhyuaQzJQkg3RSLQHbyOcLasTrhuIvsIpwHFRa_MEg7sQS2sBzdrWYMWG-qBxaZ3QUx0iP1-tV-QwfnD2NIW-dsu9TvnX9Ukth1IplPqcG8ZpUbtttl0Cl6MExIenUsp7S2BwjK7Oq43RJZMjIu3CYcHVvqIHrrSUcmGM-7djoHpbVmbVncUJ1PRNWswnp5XzO_PCek54Huv3ZA3__Ikn3dEwpRtg';

export { 
    getAllClients, 
    getClientsCreatedByLoggedInUser, 
    registerNewClient,
    deleteClient
};

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

function deleteClient(clientID) {
    const url = `${BASE_URL}/api/client/${clientID}`;
    return axios.delete(url, { headers: { Authorization: `Bearer ${getIdToken()}` }});
}

// function deleteClient(clientID) {
//   const url = `${settings.tenant}/api/v2/clients/${clientID}`;
//   return axios.delete(url, { headers: { Authorization: `Bearer ${ACCESS_TOKEN}` }});
// }

function getClientsCreatedByLoggedInUser(userID) {
  const url = `${BASE_URL}/api/clients?createdBy=${userID}`;
  return axios.get(url, { headers: { Authorization: `Bearer ${getIdToken()}` }}).then(response => response.data);
}