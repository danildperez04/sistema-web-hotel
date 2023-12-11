import { getToken } from "../js/token.js";

const token = getToken();

export async function loadReservations(){
    const response = await fetch('http://localhost:3000/api/reservations', {
        headers: {
            'authorization': 'bearer ' + token
          }
    });

    return await response.json();    
}