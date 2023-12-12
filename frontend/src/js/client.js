import { getToken } from "../components/token.js";

const token = getToken();

document.addEventListener('DOMContentLoaded', () => {
  startApp();
  loadDepartments();
});

function startApp() {
  const form = document.querySelector('.client-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const clientData = Object.fromEntries(new FormData(e.target));

    const municipalities = document.querySelector('#option-municipality');

    clientData.municipalityId = municipalities.options[municipalities.selectedIndex].value;

    fetch('http://localhost:3000/api/clients', {
      method: 'POST',
      body: JSON.stringify(clientData),
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'bearer ' + token
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

async function loadDepartments() {
  const response = await fetch('http://localhost:3000/api/departments', {
    headers: {
      'authorization': 'bearer ' + token
    }
  });
  const data = await response.json();

  const cmbDepartments = document.querySelector('#option-department');
  const cmbMunicipalities = document.querySelector('#option-municipality');
  let allMunicipalities = [];

  data.forEach(department => {
    const option = document.createElement('option');
    option.textContent = department['name'];
    option.value = department['id'];
    cmbDepartments.appendChild(option);
    allMunicipalities = allMunicipalities.concat(department.municipalities);
  });

  cmbDepartments.addEventListener('change', () => {
    cmbMunicipalities.innerHTML = '';
    const id = cmbDepartments.options[cmbDepartments.selectedIndex].value;
    const selected = data.find(department => department.id == parseInt(id));

    selected.municipalities.forEach(municipality => {
      const option = document.createElement('option');
      option.textContent = municipality['name'];
      option.value = municipality['id'];
      cmbMunicipalities.appendChild(option);
    });
  });
}

