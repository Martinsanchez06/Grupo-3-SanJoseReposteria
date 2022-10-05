document.addEventListener("DOMContentLoaded", (event) => {
    //const db = require("../../src/database/models"); 
    const loginForm = document.querySelector(".info-login");
    const emailInput = document.querySelector("#email");

    const validRegex = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
    //const emailExist = db.Usuario.findOne({ where: { email: emailInput.value } });

    loginForm.addEventListener("submit", (event) => {
        const errors = [];
        event.preventDefault();

        if (emailInput.value === "") {
            errors.push(`El campo ${ emailInput.name} debe estar diligenciado`);
        }

        if (emailInput.value) {
            if (!emailInput.value.match(validRegex)) {
                errors.push(`El campo ${emailInput.name} debe contener un email válido`);
            }
        }

        /*if (emailInput.value !== emailExist) {
            errors.push(`El email ingresado no esta registrado`);
        }*/

        if (errors.length === 0) {
            createProductForm.submit();
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
