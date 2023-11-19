document.addEventListener('DOMContentLoaded', ()=>{
    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    
    fetch(`http://localhost:3000/api/clients/${id}`)
    .then(response => response.json())
    .then(data => {
        fullFields(data);
        const form = document.querySelector('.client-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const clientData = Object.fromEntries(new FormData(e.target));
            
           });
    });
});

function fullFields(obj){
    document.querySelector('#input-client-dni').value = obj.dni;
    document.querySelector('#input-client-name').value = obj.fullName;
    document.querySelector('#input-client-email').value = obj.email;
    document.querySelector('#input-client-phonenumber').value = obj.phoneNumber;
    document.querySelector('#input-client-birthdate').value = obj.birthDate;
    document.querySelector('#input-client-address').value = obj.address;
}