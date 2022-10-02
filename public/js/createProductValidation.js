document.addEventListener("DOMContentLoaded", (event) => {

    const createProductForm = document.querySelector("#createProductForm");
    const nameInput = document.getElementById("name");
    const priceInput = document.getElementById("price");
    const image1 = document.getElementById("image1");
    const image2 = document.getElementById("image2");
    const image3 = document.getElementById("image3");
    const sizeInput = document.getElementById("size");
    const categorySelect = document.getElementById("category");
    const descriptionInput = document.getElementById("description");

    let allowedExtentions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

    let methods = [image1, image2, image3];


    createProductForm.addEventListener("submit", (event) => {
        const errorsArray = [];
        event.preventDefault();
        Array.from(createProductForm.elements).forEach(element => {
            if (element.type !== "submit") {
                if (element.value === "submit") {
                    errorsArray.push(`El campo ${element.name} debe ser diligenciado`);

                }
            }
        })

        if (nameInput.value === "") {
            errorsArray.push(`El campo ${nameInput.name} debe estar diligenciado`);
        }

        if (nameInput.value.length < 5) {
            errorsArray.push(`El campo ${nameInput.name} debe tener al menos 5 caracteres`);
        }

        if (priceInput.value === "") {
            errorsArray.push(`El campo ${priceInput.name} debe estar diligenciado`);
        }

        if (image1.value === "") {
            errorsArray.push(`El campo ${image1.name} debe estar diligenciado`);
        }

        if (image2.value === "") {
            errorsArray.push(`El campo ${image2.name} debe estar diligenciado`);
        }

        if (image3.value === "") {
            errorsArray.push(`El campo ${image3.name} debe estar diligenciado`);
        }

        methods.forEach(element => {
            if (!allowedExtentions.exec(element.value)) {
                errorsArray.push(`El campo ${element.name} debe tener una extencion valida como: .jpg, .jpeg, .png o .gif`);

            }
        });

        if (sizeInput.value === "") {
            errorsArray.push(`El campo ${sizeInput.name} debe estar diligenciado`);
        }

        if (categorySelect.value === "") {
            errorsArray.push(`El campo ${categorySelect.name} debe estar diligenciado`);
        }

        if (descriptionInput.value === "") {
            errorsArray.push(`El campo ${descriptionInput.name} debe estar diligenciado`);
        }

        if (descriptionInput.value.length < 20) {
            errorsArray.push(`El campo ${descriptionInput.name} debe tener minimo un 20 caracteres`);
        }


        if (errorsArray.length === 0) {
            createProductForm.submit();
        } else {
            const errosDiv = document.querySelector("#create-errors-div");
            errosDiv.innerHTML = "";
            errorsArray.forEach(error => {
                errosDiv.hidden = false;
                errosDiv.innerHTML += `<p class="p-error">-${ error }</p>`
            })
        }
    })


});