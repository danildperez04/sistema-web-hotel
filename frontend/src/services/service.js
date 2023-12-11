import { getToken } from "../js/token";

const token = getToken();

export async function getServices() {
  const response = await fetch('http://localhost:3000/api/services', {
    headers: {
      'authorization': 'bearer ' + token
    }
  });

  return await response.json();
}