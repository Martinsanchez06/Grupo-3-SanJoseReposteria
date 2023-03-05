document.addEventListener("DOMContentLoaded", (e) => {
    const addToCartBtn = document.querySelectorAll(".shopping-add");
    const cartNumber = document.querySelector(".container-number-cart");
    console.log(cartNumber);

    function cartProducts () {
        return localStorage.shoppingCart ? JSON.parse(localStorage.shoppingCart).length : 0;
    }

    console.log(cartProducts());

    cartNumber.innerText = cartProducts();

    addToCartBtn.forEach(btn => {
        btn.addEventListener("click", (e) => {
            if (localStorage.shoppingCart) {
                const shoppingCart = JSON.parse(localStorage.shoppingCart);
                const index = shoppingCart.findIndex((product) => {
                    product.id === e.target.dataset.id
                });
                if (index !== -1) {
                    shoppingCart[index].quantity++;
                } else {
                    shoppingCart.push({
                        id: e.target.dataset.id,
                        quantity: 1
                    })
                }
                localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
            } else {
                localStorage.setItem("shoppingCart", JSON.stringify([{
                    id: e.target.dataset.id,
                    quantity: 1
                }]))
            }
            cartNumber.innerText = cartProducts();
        })
    });

});