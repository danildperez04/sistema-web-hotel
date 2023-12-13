import { loadRooms } from "../services/room.js";
import { create } from "../services/room.js";
import { displayModal } from "../components/modal.js";


document.addEventListener('DOMContentLoaded', async () => {
  const rooms = await loadRooms();
  showRooms(rooms);
  displayModalCreate();

});


function showRooms(data) {
  const table = document.querySelector('.table-rooms tbody');

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

    table.appendChild(row);
  });
}

function displayModalCreate() {
  document.querySelector('.btn-create')
    .addEventListener('click', () => {
      const modal = document.createElement('div');
      modal.classList.add('modal');
      modal.classList.add('modal-create-room')
      modal.innerHTML = `
          <div class="modal-content">
          <img class ="btn-x" src="../img/cerrar.png">
            <h1>Agregar nueva habitación</h1>

            <form class="form">
                <input type="number" placeholder="Código" name="code">
                <input type="number" placeholder="Precio" required name="price">
                <textarea placeholder="Descripcion" required name="description"></textarea>
            <input type="submit" value="Crear Habitación" class="btn-create-room btn-create">
            </form>
          <div>

          </div>
          </div>
          ;`
      setTimeout(() => {
        const modalContent = document.querySelector('.modal-content');
        modalContent.classList.add('animation');

      }, 0);

      document.querySelector('body').appendChild(modal);

      document.querySelector('.btn-x')
        .addEventListener('click', () => {
          modal.remove();
        });

      document.querySelector('.btn-create-room')
        .addEventListener('click', () => {
          createRoom();
        });
    });

}

function createRoom() {
  const form = document.querySelector('.form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const roomData = Object.fromEntries(new FormData(e.target));

    const tableRooms = document.querySelector('.table-rooms');
    const [_, ...rows] = Array.from(tableRooms.rows);
    const savedCodes = [];

    rows.forEach(row => savedCodes.push(row['cells'][0]['textContent']));
    
    if(!savedCodes.includes(roomData.code)){
      const response = await create(roomData);
      if (!response.ok) {
        return displayModal('Error. No se pudo agregar la habitación', false);
      }
  
     return window.location.reload();
    }
     document.querySelector('.modal').remove();
     displayModal('El Código de habitación ingresado ya existe', false);

  });
}