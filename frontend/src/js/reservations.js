import { loadReservations } from "../services/reservations.js";

document.addEventListener('DOMContentLoaded', async () => {
  const reservations = await loadReservations();
  const table = document.querySelector('.table-reservations tbody');


  reservations.forEach(reservation => {
    const row = document.createElement('tr');
    row.classList.add('row');

    const cellID = document.createElement('td');
    cellID.textContent = reservation.id;
    const cellUser = document.createElement('td');
    cellUser.textContent = reservation.user['firstName'];
    const cellClient = document.createElement('td');
    cellClient.textContent = reservation.client['fullName'];
    const cellStartDate = document.createElement('td');
    cellStartDate.textContent = formatDate(reservation.startDate);
    const cellEndDate = document.createElement('td');
    cellEndDate.textContent = formatDate(reservation.endDate);
    const roomCell = document.createElement('td');
    roomCell.textContent = reservation.rooms.map(room => room.code).join(', ');
    const cellCancelled = document.createElement('td');
    cellCancelled.textContent = reservation.cancelled;



    row.appendChild(cellID);
    row.appendChild(cellUser);
    row.appendChild(cellClient);
    row.appendChild(cellStartDate);
    row.appendChild(cellEndDate);
    row.appendChild(roomCell);
    row.appendChild(cellCancelled);

    table.appendChild(row);

  });

});


function formatDate(date) {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return new Date(date).toLocaleDateString(
    'es-ES', options
  );
}
