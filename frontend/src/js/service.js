import { getServices } from "../services/service.js";
import { displayModal, modalForm } from "../components/modal.js";
import { create } from "../services/service.js";


document.addEventListener('DOMContentLoaded', async () => {
  const services = await getServices();
  fillServices(services);

  document.querySelector('.btn-display-modal-service')
    .addEventListener('click', () => {
      modalForm('Agregar un nuevo servicio');
      createService();
    });
});

function createService() {
  const form = document.querySelector('.form');
  form.addEventListener('submit', async(e) => {
    e.preventDefault();
    const serviceData = Object.fromEntries(new FormData(e.target));

    
      const response = await create(serviceData);
        if (response.ok) {
          displayModal('Se ha agregado el servicio correctamente');
          window.location.reload();
        }
      
  });
}

function fillServices(services) {
  const table = document.querySelector('.table-services tbody');

  services.forEach(service => {
    const row = document.createElement('tr');
    row.classList.add('row');
    Object.keys(service).forEach(column => {
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

      modalForm('Actualizar Servicio', service['id']);
    });
  });
} 