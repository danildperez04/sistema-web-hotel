import { getToken } from "../js/token";

const token = getToken();

export async function loadRooms() {
  const response = await fetch('http://localhost:3000/api/rooms', {
    headers: {
      'authorization': 'bearer ' + token
    }
  });
  return await response.json();
}