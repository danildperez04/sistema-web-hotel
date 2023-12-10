document.addEventListener('DOMContentLoaded', () => {

  const id = localStorage.getItem('id');

  fetch(`http://localhost:3000/api/clients/${id}`)
    .then(response => response.json())
    .then(data => {
      fullFields(data);
      const form = document.querySelector('.client-form');
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const clientData = Object.fromEntries(new FormData(e.target));
        localStorage.clear();

        fetch(`http://localhost:3000/api/clients/${id}`, {
          method: 'PUT',
          body: JSON.stringify(clientData),
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => {
            if (response.ok) {
              document.body.scrollTop = 0;
              document.documentElement.scrollTop = 0;
              const modal = document.createElement('div');
              modal.classList.add('modal');
              modal.innerHTML = `
                             <div class="modal-content">
                             <img src="../img/check.png">
                              <p>Se ha actualizado el cliente correctamente</p>
                              <div>
                                  <button class="close-modal">Aceptar</button>
                            </div>
                            </div>
                            `;

              setTimeout(() => {
                const modalContent = document.querySelector('.modal-content');
                modalContent.classList.add('animation');

                document.querySelector('.close-modal').addEventListener('click', () => {
                  modal.remove();
                  window.location.replace('client-list.html', 'update-client.html');
                });

              }, 0);

              document.querySelector('body').appendChild(modal);
            }
          });

      });
    });

});

function fullFields(obj) {
  document.querySelector('#input-client-dni').value = obj.dni;
  document.querySelector('#input-client-name').value = obj.fullName;
  document.querySelector('#input-client-email').value = obj.email;
  document.querySelector('#input-client-phonenumber').value = obj.phoneNumber;
  document.querySelector('#input-client-birthdate').value = obj.birthDate;
  document.querySelector('#input-client-address').value = obj.address;
}