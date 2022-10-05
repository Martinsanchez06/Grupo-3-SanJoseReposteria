document.addEventListener("DOMContentLoaded", (event) => {
    const registerForm = document.querySelector(".Form-registro");
    const nameInput = document.getElementById("nombre");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const conPasswordInput = document.getElementById("con_password");
    const imageInput = document.getElementById("imagen");
    const numberInput = document.getElementById("numero-identificacion");
    const dateInput = document.getElementById("fecha");
    const cityInput = document.getElementById("ciudad");
    const policyInput = document.getElementById("politica");

    let allDocumentFields = [numberInput, nameInput, imageInput, emailInput, dateInput, cityInput, passwordInput, conPasswordInput]
    let allowedExtentions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    const validRegex = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;


    registerForm.addEventListener("submit", (event) => {
        const errors = [];
        event.preventDefault();

        allDocumentFields.forEach(field => {
            if(field.value === "") {
                errors.push(`El campo ${field.name} debe estar diligenciado`);
            }
        })

        if (nameInput.value) {
            if (nameInput.value.length < 2) {
                errors.push(`El campo ${nameInput.name} debe tener al menos 2 caracteres`);
            }
        }

        if (emailInput.value) {
            if (!emailInput.value.match(validRegex)) {
                errors.push(`El campo ${emailInput.name} debe contener un email válido`);
            }
        }

        if (passwordInput.value) {
            if (passwordInput.value.length < 8) {
                errors.push(`El campo ${passwordInput.name} debe tener al menos 8 caracteres`);
            }
        }

        if (conPasswordInput.value !== passwordInput.value) {
            errors.push(`El campo ${ conPasswordInput.name} debe ser igual que la contraseña`);
        }

        if (imageInput.value) {
            if (!allowedExtentions.exec(imageInput.value)) {
                errors.push(`El campo ${imageInput.name} debe tener una extencion valida como: .jpg, .jpeg, .png o .gif`);

            }
        }

        if (errors.length === 0) {
            registerForm.submit();
        } else {
            const errorsDiv = document.querySelector("#errors-div");
            errorsDiv.innerHTML = "";
            errors.forEach(error => {
                errorsDiv.hidden = false;
                errorsDiv.innerHTML += `<p class="p-error">-${ error }</p>`
            })
        }
    })


});