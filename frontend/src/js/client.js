import {create} from "../services/client.js";
import {displayModal} from "../components/modal.js";
import { showDepartments } from "./deparment.js";


document.addEventListener('DOMContentLoaded', () => {
  startApp();
  showDepartments();
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

       });

}

