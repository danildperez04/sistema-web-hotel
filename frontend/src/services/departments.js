import { getToken } from "../components/token.js";

const token = getToken();
 

export async function loadDepartment(){
    const response = await fetch('http://localhost:3000/api/departments', {
    headers: {
      'authorization': 'bearer ' + token
    }
  });

  return await response.json();
}