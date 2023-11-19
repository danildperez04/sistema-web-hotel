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
      if (key !== 'id' && key !== 'createdAt' && key !== 'updatedAt' && key !== 'municipalityId') {
        const cell = document.createElement('td');
        cell.textContent = client[key];
        row.appendChild(cell);
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

    localStorage.setItem('id', client['id']);
    btnUpdate.href = `./update-client.html`;
    btnDelete.addEventListener('click', ()=>{
      deleteClient(client['id']);
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
        dialog.classList.add('info');
        const message = document.createElement('p');
        message.textContent = 'Se ha eliminado el cliente correctamente';
        dialog.appendChild(message);
        //pending
        document.querySelector('.msg').appendChild(dialog);
        setTimeout(() => {
          location.reload();
        }, 2000);
      }

    });

}

