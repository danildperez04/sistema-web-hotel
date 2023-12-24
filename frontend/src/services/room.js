import { getToken } from "../components/token.js";

const token = getToken();


async function create(roomData){
  const response = await fetch('http://localhost:3000/api/rooms', {
      method: 'POST',
      body: JSON.stringify(roomData),
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'bearer ' + token
      }
    });

    return response;
}

async function loadRooms() {
  const response = await fetch('http://localhost:3000/api/rooms', {
    headers: {
      'authorization': 'bearer ' + token
    }
  });

  return await response.json();
}


async function updateRoom(id, roomData){
  const response = await fetch(`http://localhost:3000/api/rooms/${id}`, {
    method: 'PUT',
    body: JSON.stringify(roomData),
    headers: {
      'Content-Type': 'application/json',
      'authorization': 'bearer ' + token
    }
  });

  return response;
}


async function getOneRoom(id){
  const response = await fetch(`http://localhost:3000/api/rooms/${id}`, {
    headers: {
      'authorization': 'bearer ' + token
    }
  });

  return await response.json();
}


async function removeRoom(id){
  const response = await fetch(`http://localhost:3000/api/rooms/${id}`, {
    method: 'DELETE',
    headers: {
      'authorization': 'bearer ' + token
    }
  });

  return response;
}

export {create, loadRooms, updateRoom, getOneRoom, removeRoom}