import { displayModal } from "./modal.js";

document.addEventListener('DOMContentLoaded', ()=>{
createService();

});

function createService(){
    const form = document.querySelector('.form');
    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        const serviceData = Object.fromEntries(new FormData(e.target));

        fetch('http://localhost:3000/api/services', {
            method: 'POST',
            body: JSON.stringify(serviceData),
            headers: {
                'Content-Type': 'application/json'
              }
        })
        .then(response => {
            if(response.ok){
                displayModal('Se ha agregado el servicio correctamente');
            }
        })
    });
}