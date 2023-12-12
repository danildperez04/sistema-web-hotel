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


export {create, loadRooms}