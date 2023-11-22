document.addEventListener('DOMContentLoaded', () => {
  startApp();
});

function startApp() {
  const form = document.querySelector('.client-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const clientData = Object.fromEntries(new FormData(e.target));

    fetch('http://localhost:3000/api/clients', {
      method: 'POST',
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
                              <p>Se creó el nuevo cliente correctamente</p>
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

      })
      .catch(err => {
        console.error(err);

      });
  });
}