import {create} from "../services/client.js";
import {displayModal} from "../components/modal.js";
import { loadDepartment } from "../services/departments.js";


document.addEventListener('DOMContentLoaded', () => {
  startApp();
  loadDepartments();
});

function startApp() {
  const form = document.querySelector('.client-form');
  form.addEventListener('submit', async(e) => {
    e.preventDefault();
    const clientData = Object.fromEntries(new FormData(e.target));

    const municipalities = document.querySelector('#option-municipality');

    clientData.municipalityId = municipalities.options[municipalities.selectedIndex].value;

    const response = await create(clientData);

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

         if (!response.ok) {
            return displayModal('Error. No se pudo agregar el cliente', false);
        }

        displayModal('Se creó el nuevo cliente correctamente', true, 'http://localhost:5173/src/pages/client-list.html');
        //window.location.replace('client-list.html', 'update-client.html');

       });

}

async function loadDepartments() {
  
  const data = await loadDepartment();

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
