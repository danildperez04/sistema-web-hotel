import { getToken } from "../components/token.js";

const token = getToken();


export async function createUser(userData) {
  const response = await fetch('http://localhost:3000/auth/signup/', {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: {
      'Content-Type': 'application/json',
      'authorization': 'bearer ' + token

    }
  })
  return await response;
}