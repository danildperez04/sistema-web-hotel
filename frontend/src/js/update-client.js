import { update } from "../services/client.js";
import { displayModal } from "../components/modal.js";
import { getClientById } from "../services/client.js";


document.addEventListener('DOMContentLoaded', async() => {

  const idClient = localStorage.getItem('idClient');

  
    const data = await getClientById(idClient);
    console.log(data);

      fullFields(data);
      const form = document.querySelector('.client-form');
      form.addEventListener('submit', async(e) => {
        e.preventDefault();
        const clientData = Object.fromEntries(new FormData(e.target));
        localStorage.removeItem('idClient');

        
            const response = await update(idClient, clientData);
            if (response.ok) {
              document.body.scrollTop = 0;
              document.documentElement.scrollTop = 0;

              displayModal('Se ha actualizado el cliente correctamente', true, 'http://localhost:5173/src/pages/client-list.html');

            }
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