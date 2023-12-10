import { getToken } from "./token.js";

const token = getToken();

document.addEventListener('DOMContentLoaded', () => {
  loadRooms();
  displayModal();
});


async function loadRooms() {
  const response = await fetch('http://localhost:3000/api/rooms', {
    headers: {
      'authorization': 'bearer ' + token
    }
  });
  const data = await response.json();
  showRooms(data);

}

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

function displayModal() {
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
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const roomData = Object.fromEntries(new FormData(e.target));

    fetch('http://localhost:3000/api/rooms', {
      method: 'POST',
      body: JSON.stringify(roomData),
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'bearer ' + token
      }
    })
      .then(response => {
        if (response.ok) {
          window.location.reload();
        }
      })
      .catch(err => console.log(err));

  });
}