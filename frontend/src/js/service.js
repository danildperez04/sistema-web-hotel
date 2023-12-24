import { getServices } from "../services/service.js";
import { displayModal, modalForm } from "../components/modal.js";
import { create } from "../services/service.js";
import { confirmationMessage } from "../components/modal.js";
import { update } from "../services/service.js";
import { deleteService } from "../services/service.js";
import { displayMessage } from "../components/message.js";


document.addEventListener('DOMContentLoaded', async () => {
  
  fillServices();

  document.querySelector('.btn-display-modal-service')
    .addEventListener('click', () => {
      modalForm('Agregar un nuevo servicio');
      createService();
    });
});

function createService() {
  const form = document.querySelector('.form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const serviceData = Object.fromEntries(new FormData(e.target));

    if (document.querySelector('#btn-create-service').textContent = 'Crear') {
      const response = await create(serviceData);
      if (response.ok) {
        document.querySelector('.modal').remove();
        displayMessage('Se ha creado el servicio correctamente');
        return (
          setTimeout(() => {
          fillServices();
          }, 2000)
          )
      }
    }


  });
}

async function fillServices() {
  const services = await getServices();
  const table = document.querySelector('.table-services tbody');
  const rows = document.querySelectorAll('.row');
  rows.forEach(row => row.remove());

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
    btnUpdate.classList.add('btn-update');
    const updateIcon = document.createElement('i');
    updateIcon.classList.add('bi', 'bi-pencil-square');
    btnUpdate.appendChild(updateIcon);
    actions.appendChild(btnUpdate);
    const deletIcon = document.createElement('i');
    deletIcon.classList.add('bi', 'bi-trash');
    btnDelete.appendChild(deletIcon);
    actions.appendChild(btnDelete);
    row.appendChild(actions);
    table.appendChild(row);

    btnUpdate.addEventListener('click', () => {
      modalForm('Actualizar Servicio', service['id']);

      const buttonSave = document.querySelector('#btn-create-service');

      document.querySelector('.form-service')
        .addEventListener('submit', async (e) => {
          e.preventDefault();
          if (buttonSave.textContent = 'Actualizar') {
            const serviceData = Object.fromEntries(new FormData(e.target));
            const response = await update(service['id'], serviceData);
            if (response.ok) {
              document.querySelector('.modal').remove();
              displayMessage('Se actualizó el servicio correctamente');
              return (
                setTimeout(() => {
                fillServices();
                }, 2000)
                )
            }
          }
        });

    });

    btnDelete.addEventListener('click', () => {
      confirmationMessage('¿Estas seguro que quieres eliminar este servicio?');
      document.querySelector('#btn-execute-action')
        .addEventListener('click', async () => {
          const response = await deleteService(service['id']);

          if (!response.ok) {
            return displayMessage('Error. No se pudo eliminar el servicio', false);
          }

          document.querySelector('.modal').remove();
          displayMessage('Se eliminó el servicio correctamente');
          setTimeout(() => {
            fillServices();
          }, 2000);

        })
    });
  });
} 