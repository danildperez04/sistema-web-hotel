import { getToken } from "../components/token";

const token = getToken();


async function create(clientData){
  const responseCreate = await fetch('http://localhost:3000/api/clients', {
    method: 'POST',
    body: JSON.stringify(clientData),
    headers: {
      'Content-Type': 'application/json',
      'authorization': 'bearer ' + token
    }
  });

  return responseCreate;
}

async function load(){
    const response = await fetch('http://localhost:3000/api/clients', {
    headers: {
      'authorization': 'bearer ' + token
    }
  });

  return await response.json();
}


async function remove(id){
    const responseDelete = await fetch(`http://localhost:3000/api/clients/${id}`, {
    method: 'DELETE',
    headers: {
      'authorization': 'bearer ' + token
    }
  });

  return responseDelete;
}

export {create, load, remove};