document.addEventListener("DOMContentLoaded", (e) => {
    let products = [];
    const cartRow = document.querySelector(".cart-row");
    const deleteFromCartBtn = document.querySelectorAll("#delete-btn");
    console.log(deleteFromCartBtn);


    function emptyShopingCart() {

    };

    function deleteItem() {

    };

    function calculateTotal () {
        let acum = 0;

        for( let i = 0; i < products.length; i++ ) {
            acum = acum + (products[i].price * products[i].quantity);
        }
        return acum;
    }

    
    if (localStorage.shoppingCart) {
        let jsonParse = JSON.parse(localStorage.shoppingCart);
        jsonParse.forEach((item, i) => {
            fetch(`/api/productDetail/${item.id}`)
                .then(resp => resp.json())
                .then(product => {
                    if (product) {
                        products.push({
                            image: product.imagesUrl.image_1,
                            originalProductId: product.data.id,
                            name: product.data.name,
                            quantity: item.quantity,
                            price: product.data.price
                        })
                        cartRow.innerHTML +=
                            `
                            <div class="d-flex justify-content-between mb-2 p-2 align-items-center">
                                <div class="w-100 d-flex align-items-center ">
                                    <div class="cart-image-container me-2">
                                        <a class="w-100" href="/productos/productdetail/${product.data.id}">
                                            <img class="w-100" src="${product.imagesUrl.image_1}" alt="">
                                        </a>
                                    </div>
                                    <div class="w-75 cart-name-container">
                                        <p class="mb-0"><strong>${product.data.name}</strong></p>
                                    </div>
                                </div>
                                <div class="w-100 d-flex justify-content-center align-items-center quantity-container">
                                    <span>Cantidad</span>
                                    <span class="d-flex quantity-input"><input class="rounded-pill" type="number" min="0" max="10" value="${product.quantity}"></span>
                                </div>
                                <div class="">
                                    <p class="mb-0"><strong>$${product.data.price}</strong></p>
                                </div>
                                <div class="p-3 delete-btn-cart">
                                    <button class="delete-from-cart" id="delete-btn" onClick="window.location.reload();"><i class="text-danger fa-solid fa-trash delete-from-cart"></i></button>
                                </div>
                            </div>
                        `
                    } else {
                        shoppingCart.splice(index, 1);
                        localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
                    }
                })
                .then(() => {
                    let total = document.querySelector(".cart-subtotal");
                    total.innerText = products !== [] ? `$ ${calculateTotal()}` : "$ 0" 
                })
        })
    }
});
