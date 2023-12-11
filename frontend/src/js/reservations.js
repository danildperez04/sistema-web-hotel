import { getToken } from "./token.js";
import { displayModal } from "./modal.js";
import { getServices } from "../services/service.js";
import { loadRooms } from "../services/room.js";

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

      if (request.ok) {
        displayModal('Se ha agregado la reserva correctamente');
      }

    });

  fillOptions();
});

async function fillOptions() {
  const services = await getServices();
  const rooms = await loadRooms();

  const cmbServices = document.querySelector('#select-services');
  const cmbRooms = document.querySelector('#select-rooms');

  services.forEach(service => {
    const option = document.createElement('option');
    option.textContent = service['name'];
    option.value = service['name'];
    cmbServices.appendChild(option);
  });

  rooms.forEach(room => {
    const option = document.createElement('option');
    option.textContent = room['code']
    cmbRooms.appendChild(option);
    console.log(room['code']);
  });


  cmbServices.addEventListener('change', () => {
    const tableServices = document.querySelector('.table-service');

    const id = cmbServices

    const row = document.createElement('tr');
    row.classList.add('row');

  })

}