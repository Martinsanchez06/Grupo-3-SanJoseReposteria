document.addEventListener("DOMContentLoaded", () => {

    

    new Glider(document.querySelector(".div-product-contain"), {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: '.indicadores',
        arrows: {
            prev: '.anterior',
            next: '.siguiente'
            },
            responsive: [
               {
                  //
                  breakpoint: 600,
                  settings: {
                    // Set to `auto` and provide item width to adjust to viewport
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    itemWidth: 150,
                    duration: 0.25
                  }
                },{
                  //
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    itemWidth: 150,
                    duration: 0.25
                  }
                }
              ]
           
    }) 
})