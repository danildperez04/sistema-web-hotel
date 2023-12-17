import { load } from '../services/client.js';
import { remove } from '../services/client.js';
import { getOneClient } from '../services/client.js';
import { confirmationMessage } from '../components/modal.js';


document.addEventListener('DOMContentLoaded', () => {
  start();
  filterClient();
});


async function start() {
  const clients = await load();
  showClients(clients);
}


function showClients(data) {

  addActions(data);

}


async function deleteClient(id) {
  const response = await remove(id)

  if (response.ok) {
    displayMessage('Se ha eliminado el cliente correctamente')
    setTimeout(() => {
      location.reload();
    }, 2000);
  }

}

function filterClient() {
  const btnSearch = document.querySelector('#btn-search-client')
  btnSearch.addEventListener('click', async () => {
    const dni = document.querySelector('#input-search-client').value;
    const response = await getOneClient(dni);

    if (!response.ok) {
      return displayMessage('No se encontró el cliente', false);
    }

    const filteredClient = await response.json();
    console.log(filteredClient);
    const rows = document.querySelectorAll('.row');
    rows.forEach(row => row.remove());

    addActions([filteredClient]);

  });
}


function addActions(data) {
  const table = document.querySelector('.client-list tbody');

  data.forEach(client => {
    const row = document.createElement('tr');
    row.classList.add('row');
    Object.keys(client).forEach(key => {
      if (key !== 'id' && key !== 'createdAt' && key !== 'updatedAt' && key !== 'reservations' && key !== 'municipalityId' && key !== 'birthDate') {
        const cell = document.createElement('td');
        key === 'municipality' ?  
        cell.textContent = client[key]['name'] :     
        cell.textContent = client[key];
        
        row.appendChild(cell);

      }

    });

    const actions = document.createElement('td');
    actions.classList.add('actions');
    const btnUpdate = document.createElement('a');
    const btnDelete = document.createElement('a');
    btnUpdate.textContent = 'Actualizar';
    btnUpdate.classList.add('btn-update');
    btnDelete.textContent = 'Eliminar';
    actions.appendChild(btnUpdate);
    actions.appendChild(btnDelete);
    row.appendChild(actions);
    table.appendChild(row);

    btnUpdate.addEventListener('click', () => {
      localStorage.removeItem('idClient');
      localStorage.setItem('idClient', client['id']);
      window.location.replace('update-client.html', 'client-list.html')
    });
    btnDelete.addEventListener('click', () => {

      confirmationMessage('¿Estas seguro que quieres eliminar este cliente? Esta acción no se puede deshacer');

      document.querySelector('.btnDelete').addEventListener('click', () => {
        document.querySelector('.modal').remove();
        deleteClient(client['id']);
      });

    }, 0);

  });

}


function displayMessage(message, success = true) {
  const dialog = document.createElement('div');
  success ? dialog.classList.add('message') : dialog.classList.add('alert');
  const text = document.createElement('p');
  text.textContent = message;
  dialog.appendChild(text);
  document.querySelector('.show-message').appendChild(dialog);

  setTimeout(() => {
    dialog.remove();
  }, 2000);
}