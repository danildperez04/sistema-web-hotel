import { update } from "../services/client.js";
import { displayModal } from "../components/modal.js";
import { getClientById } from "../services/client.js";
import { loadDepartments } from "./deparment.js";
import { showDepartments } from "./deparment.js";
import { loadMunicipality } from "./deparment.js";


document.addEventListener('DOMContentLoaded', async () => {

  const idClient = localStorage.getItem('idClient');

  const data = await getClientById(idClient);

  await fullFields(data);
  const form = document.querySelector('.client-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const clientData = Object.fromEntries(new FormData(e.target));
    localStorage.removeItem('idClient');

    const municipalities = document.querySelector('#option-municipality');
    clientData.municipalityId = municipalities.options[municipalities.selectedIndex].value;

    const response = await update(idClient, clientData);
    if (response.ok) {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;

      displayModal('Se ha actualizado el cliente correctamente', true, 'http://localhost:5173/src/pages/client-list.html');

    }
  });

});


async function fullFields(obj) {
  document.querySelector('#input-client-dni').value = obj.dni;
  document.querySelector('#input-client-name').value = obj.fullName;
  document.querySelector('#input-client-email').value = obj.email;
  document.querySelector('#input-client-phonenumber').value = obj.phoneNumber;
  document.querySelector('#input-client-birthdate').value = obj.birthDate;
  document.querySelector('#input-client-address').value = obj.address;
  const departments = await loadDepartments();
  await showDepartments();
  const cmbDepartments = document.querySelector('#option-department');
  const cmbMunicipalities = document.querySelector('#option-municipality');
  cmbDepartments.options[(obj.municipality.departmentId) - 1].selected = true;

  loadMunicipality(cmbDepartments, departments);

  let index = 0;
  for (let i = 0; i < cmbMunicipalities.options.length; i++) {
    if (cmbMunicipalities.options[i].textContent === obj.municipality.name) {
      index = i;
      break;
    }
  }

  cmbMunicipalities.options[index].selected = true;

}