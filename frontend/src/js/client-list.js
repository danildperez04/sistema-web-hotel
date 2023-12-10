document.addEventListener('DOMContentLoaded', () => {
  start();
});


function start() {
  fetch('http://localhost:3000/api/clients')
    .then(response => response.json())
    .then(data => showClients(data));
}

function showClients(data) {
  const table = document.querySelector('.client-list tbody');

  data.forEach(client => {
    const row = document.createElement('tr');
    row.classList.add('row');
    Object.keys(client).forEach(key => {
      if (key !== 'id' && key !== 'createdAt' && key !== 'updatedAt' && key !== 'municipalityId' && key !== 'birthDate') {
        const cell = document.createElement('td');
        cell.textContent = client[key];
        row.appendChild(cell);
        console.log(typeof(key));
        
      }

    });
    const actions = document.createElement('td');
    actions.classList.add('actions');
    btnUpdate = document.createElement('a');
    btnDelete = document.createElement('a');
    btnUpdate.textContent = 'Actualizar';
    btnUpdate.classList.add('btn-update');
    btnDelete.textContent = 'Eliminar';
    actions.appendChild(btnUpdate);
    actions.appendChild(btnDelete);
    row.appendChild(actions);
    table.appendChild(row);

    btnUpdate.addEventListener('click', () => {
      localStorage.clear();
      localStorage.setItem('id', client['id']);
      window.location.replace('update-client.html', 'client-list.html')
    });
    btnDelete.addEventListener('click', () => {
      const modal = document.createElement('div');
      modal.classList.add('modal');
      modal.innerHTML = `
        <div class="modal-content">
          <p>¿Estas seguro que quieres eliminar este cliente? Esta acción no se puede deshacer</p>

        <div>
          <button class="btnDelete">Eliminar</button>
          <button class="close-modal">Cancelar</button>
        </div>
        </div>
        `;

      setTimeout(() => {
        const modalContent = document.querySelector('.modal-content');
        modalContent.classList.add('animation');

        document.querySelector('.close-modal').addEventListener('click', () => {
          modal.remove();
        });

        document.querySelector('.btnDelete').addEventListener('click', ()=>{
          modal.remove();
          deleteClient(client['id']);
        });

      }, 0);

      document.querySelector('body').appendChild(modal);

    });

  });

}


function deleteClient(id) {
  fetch(`http://localhost:3000/api/clients/${id}`, {
    method: 'DELETE'
  })
    .then(response => {

      if (response.ok) {
        const dialog = document.createElement('div');
        dialog.classList.add('message');
        const message = document.createElement('p');
        message.textContent = 'Se ha eliminado el cliente correctamente';
        dialog.appendChild(message);
        document.querySelector('.msg').appendChild(dialog);
        setTimeout(() => {
          location.reload();
        }, 2000);
      }

    });

}

