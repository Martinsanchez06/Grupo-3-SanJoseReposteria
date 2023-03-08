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
        settingsBox.classList.remove("active");
    });

    bars.addEventListener("click", () => {
        menuBox.classList.add("active2");
        settingsBox.classList.remove("active");
    });

    menuBoxButton.addEventListener("click" , () => {
        menuBox.classList.remove("active2");

    });

    ProfileIcon.addEventListener("click", () => {
        settingsBox.classList.toggle("active");
        searchInput.classList.remove("active-search");
    });



    

});