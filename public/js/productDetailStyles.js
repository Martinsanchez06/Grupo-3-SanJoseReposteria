const imgs = document.querySelectorAll(".img-select a");
const imgBtns = [ ...imgs ];
let imgId = 1;


imgBtns.forEach((imgItem) => {
    imgItem.addEventListener("click", (event) => {
        event.preventDefault();
        imgId = imgItem.dataset.id;
        slideImge();
    });
});

function slideImge() {
    const displayWidth = document.querySelector(".img-showcase img:first-child").clientWidth;

    document.querySelector(".img-showcase").style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;

}

let items = document.querySelectorAll('.carousel-item')

		items.forEach((el) => {
			const minPerSlide = 4
			let next = el.nextElementSibling
			for (var i=1; i<minPerSlide; i++) {
				if (!next) {
            // wrap carousel by using first child
            next = items[0]
        }
        let cloneChild = next.cloneNode(true)
        el.appendChild(cloneChild.children[0])
        next = next.nextElementSibling
    }
})

new Glider(document.querySelector(".div-product-contain"), {
    slidesToShow: 2,
    slidesToScroll: 2,
    dots: '.indicadores',
    arrows: {
        prev: '.anterior',
        next: '.siguiente'
        },
        responsive: [
           {
              //
              breakpoint: 750,
              settings: {
                // Set to `auto` and provide item width to adjust to viewport
                slidesToShow: 3,
                slidesToScroll: 3,
                itemWidth: 150,
                itemHeight: 2,
                duration: 0.25
              }
            },{
              //
              breakpoint: 1024,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                itemWidth: 150,
                itemHeight: 1,
                duration: 0.25
              }
            }
          ]
       
})


