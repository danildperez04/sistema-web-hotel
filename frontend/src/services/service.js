import { getToken } from "../components/token.js";

const token = getToken();

async function getServices() {
  const response = await fetch('http://localhost:3000/api/services', {
    headers: {
      'authorization': 'bearer ' + token
    }
  });

  return await response.json();
}

async function create(serviceData){
  const reponse = await fetch('http://localhost:3000/api/services', {
      method: 'POST',
      body: JSON.stringify(serviceData),
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'bearer ' + token
      }
    });

    return response;
}


export {getServices, create};