document.addEventListener("DOMContentLoaded", (event) => {
    const loginForm = document.querySelector(".info-login");
    const emailInput = document.querySelector("#email");

    const validRegex = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;

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

        if (errors.length === 0) {
            createProductForm.submit();
        } else {
            const errorsDiv = document.querySelector("#create-errors-div");
            errorsDiv.innerHTML = "";
            errors.forEach(error => {
                errorsDiv.hidden = false;
                errorsDiv.innerHTML += `<p class="p-error">-${ error }</p>`
            })
        }
    })
});
