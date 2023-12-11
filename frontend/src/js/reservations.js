import { getToken } from "./token.js";
import { displayModal } from "./modal.js";

const token = getToken();

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.form')
        .addEventListener('submit', async (e) => {
            e.preventDefault();

            const reservationData = Object.fromEntries(new FormData(e.target));

            const dni = document.querySelector('#input-text-dni').value;

            const response = await fetch(`http://localhost:3000/api/clients?dni=${dni}`, {
                headers: {
                    'authorization': 'bearer ' + token
                }
            });


            if (!response.ok) {      
                return displayModal('No se encontro el cliente');
            }
            const client = await response.json();

            reservationData.clientId = client['id'];
            reservationData.cancelled = false;

           const request = await fetch(`http://localhost:3000/api/reservations`, {
                method: 'POST',
                body: JSON.stringify(reservationData),
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'bearer ' + token
                }
            });

            if(request.ok){
                displayModal('Se ha agregado la reserva correctamente');
            }

        });
})