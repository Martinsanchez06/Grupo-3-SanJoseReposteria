document.addEventListener("DOMContentLoaded", (event) => {

    const editProductForm = document.querySelector("#editProductForm");
    const nameInput = document.getElementById("name");
    const priceInput = document.getElementById("price");
    const image1 = document.getElementById("image1");
    const image2 = document.getElementById("image2");
    const image3 = document.getElementById("image3");
    const sizeInput = document.getElementById("size");
    const categorySelect = document.getElementById("category");
    const descriptionInput = document.getElementById("description");

    let allDocumentFields = [nameInput, priceInput, image1, image2, image3, sizeInput, categorySelect, descriptionInput];

    let imageFields = [image1, image2, image3];

    let allowedExtentions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

    editProductForm.addEventListener("submit", (event) => {
        const errorsArray = [];
        event.preventDefault();
        /*Array.from(createProductForm.elements).forEach(element => {
            if (element.type !== "submit") {
                if (element.value === "submit") {
                    errorsArray.push(`El campo ${element.name} debe ser diligenciado`);

                }
            }
        })*/

        allDocumentFields.forEach(field => {
            if(field.value === "") {
                errorsArray.push(`El campo ${field.name} debe estar diligenciado`);
            }
        })

        if (nameInput.value) {
            if (nameInput.value.length < 5) {
                errorsArray.push(`El campo ${nameInput.name} debe tener al menos 5 caracteres`);
            }
        }

        imageFields.forEach(element => {
            if (element.value) {
                if (!allowedExtentions.exec(element.value)) {
                    errorsArray.push(`El campo ${element.name} debe tener una extensión válida como: .jpg, .jpeg, .png o .gif`);
    
                }
            }
        });

        if (descriptionInput.value) {
            if (descriptionInput.value.length < 20) {
                errorsArray.push(`El campo ${descriptionInput.name} debe tener un mínimo de 20 caracteres`);
            }
        }

        if (errorsArray.length === 0) {
            editProductForm.submit();
        } else {
            const errorsDiv = document.querySelector("#errors-div");
            errorsDiv.innerHTML = "";
            errorsArray.forEach(error => {
                errorsDiv.hidden = false;
                errorsDiv.innerHTML += `<p class="p-error">-${ error }</p>`
            })
        }
    })


});