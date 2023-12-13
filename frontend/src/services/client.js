import { getToken } from "../components/token";

const token = getToken();


async function create(clientData) {
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

async function load() {
  const response = await fetch('http://localhost:3000/api/clients', {
    headers: {
      'authorization': 'bearer ' + token
    }
  });

  return await response.json();
}


async function remove(id) {
  const responseDelete = await fetch(`http://localhost:3000/api/clients/${id}`, {
    method: 'DELETE',
    headers: {
      'authorization': 'bearer ' + token
    }
  });

  return responseDelete;
}


async function getOneClient(dni) {
  const response = await fetch(`http://localhost:3000/api/clients?dni=${dni}`, {
    headers: {
      'authorization': 'bearer ' + token
    }
  });

  return response;

}


async function update(id, clientData) {
  const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
    method: 'PUT',
    body: JSON.stringify(clientData),
    headers: {
      'Content-Type': 'application/json',
      'authorization': 'bearer ' + token
    }
  });

  return response;
}


async function getClientById(id){
  const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
    headers: {
      'authorization': 'bearer ' + token
    }
  });

  return await response.json();
}

export { create, load, remove, getOneClient, update, getClientById };