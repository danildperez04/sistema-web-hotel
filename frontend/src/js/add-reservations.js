import { displayModal } from "../components/modal.js";
import { getServices } from "../services/service.js";
import { loadRooms } from "../services/room.js";
import { findClient } from "../services/reservations.js";
import { createReservation } from "../services/reservations.js";


const tableService = document.querySelector('.table-service');
const tableRooms = document.querySelector('.table-room');

document.addEventListener('DOMContentLoaded', () => {

  document.querySelector('.form')
    .addEventListener('submit', async (e) => {
      e.preventDefault();

      const reservationData = Object.fromEntries(new FormData(e.target));

      const dni = document.querySelector('#input-text-dni').value;

      const response = await findClient(dni);

      if (!response.ok) {
        return displayModal('No se encontró el cliente', false);
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


      const create = await createReservation(reservationData);
      console.log(create);

      if (create.statusCode === 400) {
        const message = create.message ? create.message : 'No se pudo agregar la reserva';
        return displayModal(message, false);

      }

      return displayModal('Se ha guardado la reserva correctamente');


    });

  fillOptions();
  setDates();

});

const cmbServices = document.querySelector('#select-services');
const cmbRooms = document.querySelector('#select-rooms');


function setDates() {
  const date = new Date();
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  const hh = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');

  const currentDate = yyyy + '-' + mm + '-' + dd + 'T' + hh + ':' + min;

  const inputDateStart = document.querySelector('#input-date-start');
  inputDateStart.min = currentDate;

  inputDateStart.addEventListener('change', () => {
    const inputDateEnd = document.querySelector('#input-date-end');
    inputDateEnd.disabled = false;
    const selectedDate = inputDateStart.value;
    const selectedDay = selectedDate.substring(8, 10)
    const nextDay = (parseInt(selectedDay) + 1).toString();
    const minDateEnd = selectedDate.replace(selectedDay, nextDay);
    inputDateEnd.min = minDateEnd;
  });
}

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

  const rows = Array.from(tableRooms.rows);
  console.log(tableRooms.rows);

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