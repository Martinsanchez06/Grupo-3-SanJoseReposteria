document.addEventListener("DOMContentLoaded", () => {

    // experimental code for example view

    
    let settingsBox = document.querySelector(".settingsBox");
    let ProfileIcon = document.querySelector(".hdicon");
    let searchIcon = document.getElementById("search-icon");
    let searchInput = document.getElementById("input-search");
    let bars = document.querySelector(".bars");
    let menuBox = document.querySelector(".menuBox");
    let menuBoxButton = document.querySelector(".popOutButton");

    searchIcon.addEventListener("click", () => {
        searchInput.classList.toggle("active-search");
    });

    bars.addEventListener("click", () => {

        menuBox.classList.add("active2");
    });

    menuBoxButton.addEventListener("click" , () => {
        menuBox.classList.remove("active2");

    });

    ProfileIcon.addEventListener("click", () => {

        settingsBox.classList.toggle("active");
    });



    

});