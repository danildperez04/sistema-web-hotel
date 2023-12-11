import { getToken } from "../js/token";

const token = getToken();

export async function getReport( { limit , date } ) {
  const response = await fetch(`http://localhost:3000/api/reports?limit=${limit}&date=${date}`,{
    headers: {
      'authorization': 'bearer ' + token
    }
  });
  return await response.blob();
}