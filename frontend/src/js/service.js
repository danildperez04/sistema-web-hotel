import { displayModal, modalForm } from "./modal.js";
import { getToken } from "./token.js";

const token = getToken();

document.addEventListener('DOMContentLoaded', () => {
  getServices();
  document.querySelector('.btn-display-modal-service')
  .addEventListener('click', ()=>{
    modalForm('Agregar un nuevo servicio');
    createService();
  });
});

function createService() {
  const form = document.querySelector('.form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const serviceData = Object.fromEntries(new FormData(e.target));

    fetch('http://localhost:3000/api/services', {
      method: 'POST',
      body: JSON.stringify(serviceData),
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'bearer ' + token
      }
    })
      .then(response => {
        if (response.ok) {
          displayModal('Se ha agregado el servicio correctamente');
          window.location.reload();
        }
      })
  });
}



async function getServices(){
  const response = await fetch('http://localhost:3000/api/services', {
    headers:{
      'authorization': 'bearer ' + token
    }
  });

  const services = await response.json();
  const table = document.querySelector('.table-services tbody');

  services.forEach(service =>{
    const row = document.createElement('tr');
    row.classList.add('row');
    Object.keys(service).forEach(column =>{
      if (column !== 'id' && column !== 'createdAt' && column !== 'updatedAt') {
        const cell = document.createElement('td');
        cell.textContent = service[column];
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
      
      modalForm('Actualizar Servicio' ,service['id']);

    });

  });
}