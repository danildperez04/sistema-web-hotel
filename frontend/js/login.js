document.addEventListener('DOMContentLoaded', ()=>{
    startApp();
});

function startApp(){
    const submit = document.querySelector('.sub');
    submit.addEventListener('click', (e)=>{
        e.preventDefault();

        validateFields();

    });
}

function validateFields(){
    const message = 'Este campo es obligatorio';
    if(document.querySelector('#name').value === ''){
        showError(message, 'name');
    }
    else if(document.querySelector('#lastName').value === ''){
        showError(message, 'lastName');
    }
    else if(document.querySelector('#email').value === ''){
        showError(message, 'email');
    }
    else if(document.querySelector('#pass').value === ''){
        showError(message, 'pass');
    }
    else if(document.querySelector('#confirm').value === ''){
        showError(message, 'confirm');
    }
    else if(pass !== confirm){
        showError('Las contraseñas no coinciden', 'confirm')
    }
}


function showError(text, filed){
    if(document.querySelector('.error') !== null){
       document.querySelector('.error').remove();
    }

        const error = document.createElement('div');
        const info = document.createElement('p');
        info.textContent = text;
        error.appendChild(info);
        error.classList.add('error')
        const add = document.querySelector('.'+filed);
        add.appendChild(error);
}