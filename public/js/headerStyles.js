document.addEventListener("DOMContentLoaded", () => {

    // experimental code for example view

    
    let settingsBox = document.querySelector(".settingsBox");
    let icon = document.querySelector(".hdicon");

    icon.addEventListener("click", () => {

        settingsBox.classList.toggle("active");
    });

    

});