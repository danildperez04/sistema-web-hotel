import { getToken } from "./token.js";
import { displayModal } from "./modal.js";
import { getServices } from "../services/service.js";
import { loadRooms } from "../services/room.js";

const token = getToken();

const tableService = document.querySelector('.table-service');
const tableRooms = document.querySelector('.table-room');

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
        return displayModal('No se encontro el cliente', false);
      }
      const client = await response.json();

      reservationData.clientId = client['id'];
      reservationData.cancelled = false;


      const tableRows = tableService.rows.length;
      if (tableRows > 1) {
        const [_, ...rows] = Array.from(tableService.rows);

        reservationData.services = rows.map(row => {
          return { id: row['cells'][0]['textContent'], price: parseInt(row['cells'][2]['textContent']) };
        });

      }

      if (document.querySelector('.table-room').rows.length > 1) {
        const [_, ...rows] = Array.from(tableRooms.rows);

        reservationData.rooms = rows.map(row => {
          return { id: row['cells'][0]['textContent'], price: parseInt(row['cells'][2]['textContent']) };
        });
      }


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

const cmbServices = document.querySelector('#select-services');
const cmbRooms = document.querySelector('#select-rooms');

async function fillOptions() {
  const services = await getServices();
  const rooms = await loadRooms();


  services.forEach(service => {
    const option = document.createElement('option');
    option.textContent = service['name'];
    option.value = JSON.stringify(service);
    cmbServices.appendChild(option);
  });

  rooms.forEach(room => {
    const option = document.createElement('option');
    option.textContent = room['code'];
    option.value = JSON.stringify(room);
    cmbRooms.appendChild(option);
  });

}

cmbServices.addEventListener('change', () => {
  const tableServices = document.querySelector('.table-service tbody');
  const serviceSelected = JSON.parse(cmbServices.options[cmbServices.selectedIndex].value);

  const row = document.createElement('tr');
  row.classList.add('row');

  const [_, ...rows] = Array.from(tableService.rows);

  const ids = rows.map(row => {
    return parseInt(row['cells'][0]['textContent']);
  });

  if (ids.includes(serviceSelected['id']))
    return;

  Object.keys(serviceSelected).forEach(key => {

    if (key !== 'details' && key !== 'createdAt' && key !== 'updatedAt') {
      const cell = document.createElement('td');
      cell.textContent = serviceSelected[key];
      row.appendChild(cell);
    }

  });
  tableServices.appendChild(row);

});


cmbRooms.addEventListener('change', () => {
  const roomSelected = JSON.parse(cmbRooms.options[cmbRooms.selectedIndex].value);
  const tableRooms = document.querySelector('.table-room tbody');
  const row = document.createElement('tr');
  row.classList.add('row');

  const [_, ...rows] = Array.from(tableRooms.rows);

  const ids = rows.map(row => {
    return parseInt(row['cells'][0]['textContent']);
  });

  if (ids.includes(roomSelected['id']))
    return;
  Object.keys(roomSelected).forEach(key => {
    if (key !== 'description' && key !== 'createdAt' && key !== 'updatedAt') {
      const cell = document.createElement('td');
      cell.textContent = roomSelected[key];
      row.appendChild(cell);
    }

  });

  tableRooms.appendChild(row);
});