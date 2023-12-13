import { getToken } from "../components/token.js";

const token = getToken();

async function loadReservations(){
    const response = await fetch('http://localhost:3000/api/reservations', {
        headers: {
            'authorization': 'bearer ' + token
          }
    });

    return await response.json();    
}


async function findClient(dni){
    const response = await fetch(`http://localhost:3000/api/clients?dni=${dni}`, {
        headers: {
            'authorization': 'bearer ' + token
        }
    });

    return response;
}

async function createReservation(reservationData){
    const response = await fetch(`http://localhost:3000/api/reservations`, {
        method: 'POST',
        body: JSON.stringify(reservationData),
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'bearer ' + token
        }
    });

    return await response.json();
}


export{loadReservations, findClient, createReservation};