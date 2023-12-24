import { loadRooms } from "../services/room.js";
import { create } from "../services/room.js";
import { modalFormRoom } from "../components/modal.js";
import { confirmationMessage } from "../components/modal.js";
import { updateRoom } from "../services/room.js";
import { displayMessage } from "../components/message.js";
import { removeRoom } from "../services/room.js";


document.addEventListener('DOMContentLoaded', () => {
  showRooms();
  displayModalCreate();

});

const savedCodes = [];


async function showRooms() {
  const data = await loadRooms();
  const table = document.querySelector('.table-rooms tbody');
  const rows = document.querySelectorAll('.row');
  rows.forEach(row => row.remove());

  data.forEach(room => {
    const row = document.createElement('tr');
    row.classList.add('row');

    Object.keys(room).forEach(key => {
      if (key !== 'id' && key !== 'createdAt' && key !== 'updatedAt') {
        const cell = document.createElement('td');
        cell.textContent = `${room[key]}`;
        row.appendChild(cell);
      }
    });

    const actions = document.createElement('td');
    actions.classList.add('actions');
    const btnUpdate = document.createElement('a');
    const btnDelete = document.createElement('a');
    btnUpdate.classList.add('btn-update');
    const updateIcon = document.createElement('i');
    updateIcon.classList.add('bi', 'bi-pencil-square');
    btnUpdate.appendChild(updateIcon);
    const deletIcon = document.createElement('i');
    deletIcon.classList.add('bi', 'bi-trash');
    btnDelete.appendChild(deletIcon);
    actions.appendChild(btnUpdate);
    actions.appendChild(btnDelete);
    row.appendChild(actions);
    table.appendChild(row);

    btnUpdate.addEventListener('click', () => {
      modalFormRoom('Actualizar información', room['id']);
      update(room['id'])
    });

    btnDelete.addEventListener('click', ()=>{
      deleteRoom(room['id']);
    });

  });
 
}


function displayModalCreate() {
  document.querySelector('#btn-display-modal-create-room')
    .addEventListener('click', () => {
      modalFormRoom('Crear una nueva habitación');
      createRoom();
    });

}


function createRoom() {

  if (document.querySelector('#btn-create-room').value === 'Crear Habitación') {
    const form = document.querySelector('.form');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();


      const roomData = Object.fromEntries(new FormData(e.target));

      savedCodes.length = 0;
      const tableRooms = document.querySelector('.table-rooms');
      const [_, ...rows] = Array.from(tableRooms.rows);
      rows.forEach(row => savedCodes.push(row['cells'][0]['textContent']));

      document.querySelector('.modal').remove();
      if (!savedCodes.includes(roomData.code)) {
        const response = await create(roomData);
        if (!response.ok) {
          return displayMessage('Error. No se pudo agregar la habitación', false);
        }
        displayMessage('Se ha agregado la habitación correctamente');
        return (
          setTimeout(() => {
            showRooms();
          }, 2000)
        );
      }
      displayMessage('El Código de habitación ingresado ya existe', false);

    });

  }

}


function update(id){
  const form = document.querySelector('.form');
      form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (document.querySelector('#btn-create-room').value === 'Actualizar') {
          savedCodes.length = 0;
          const tableRooms = document.querySelector('.table-rooms');
          const [_, ...rows] = Array.from(tableRooms.rows);
          rows.forEach(row => savedCodes.push(row['cells'][0]['textContent']));
          const roomCode = document.querySelector('#input-room-code').value;
          savedCodes.splice(savedCodes.indexOf(roomCode), 1);

          const roomData = Object.fromEntries(new FormData(e.target));
          document.querySelector('.modal').remove();
          if (!savedCodes.includes(roomData.code)) {
            const response = await updateRoom(id, roomData);

            if (!response.ok) {
              return displayMessage('Error. No se pudo actualizar la habitación', false);
            }
            displayMessage('Se ha actualizado la habitación correctamente');
            return (
              setTimeout(() => {
                showRooms();
              }, 2000)
            );
          }

          displayMessage('El Código de habitación ingresado ya existe', false);

        }

      });
}


function deleteRoom(id){
  confirmationMessage('Estas seguro que quieres eliminar esta habitación. Esta acción no se puede deshacer');

  document.querySelector('#btn-execute-action')
  .addEventListener('click', async()=>{
      const response = await removeRoom(id);

      document.querySelector('.modal').remove();
      if(!response.ok){
        return displayMessage('Error. No se pudo eliminar la habitación', false);
      }

      displayMessage('Se ha eliminado la habitación correctamente');
      return (
        setTimeout(() => {
          showRooms();
        }, 2000)
      );
  });
}