function initMap() {
    // Latitude and Longitude
    // var myLatLng = {lat: -18.8708887, lng: 47.5210518};

    // var map = new google.maps.Map(document.getElementById('google-maps'), {
    //     zoom: 17,
    //     center: myLatLng
    // });

    // L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //     maxZoom: 19,
    //     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    // }).addTo(map);

    var tiles = L.tileLayer('https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.{ext}', {
        minZoom: 0,
        maxZoom: 20,
        attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; contributors',
        ext: 'png'
    });

    const map = L.map('google-maps').setView([-18.879190, 47.507905], 6);

    tiles.addTo(map);

    var greenIcon = L.icon({
        iconUrl: 'assets/img/placeholder_684908.png',
        // shadowUrl: 'leaf-shadow.png',
    
        iconSize:     [50, 50], // size of the icon
        // shadowSize:   [40, 50], // size of the shadow
        iconAnchor:   [34, 49], // point of the icon which will correspond to marker's location
        // shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    var popup = L.popup({
        offset: [-10, -30]
    })
    .setLatLng([-18.879190, 47.507906])
    .setContent('<p>I\'m from here. <br>In my country, new technology is very prosperous.</p>')
    .openOn(map);

	// const marker = L.marker([-18.879190, 47.507905],{
    //     icon: new L.DivIcon({
    //         className: 'my-div-icon',
    //         html: `<div></div>
    //         <img class="my-div-image" src="assets/img/placeholder_684908.png"/>`
    //     }),
    // }).addTo(map);

    const marker = L.marker([-18.879190, 47.507905],{
        icon: greenIcon
    }).addTo(map);
}

/*--------------*/

var index = 0;
dots[index].classList.add("active");


function prevSlide(){
    var slides = document.querySelectorAll(".slide");
    var dots = document.querySelectorAll(".dot");
    let slide_active = document.querySelector(".slide.active");
    let dot_active = document.querySelector(".dot.active");
    // var index = slides.indexOf(slide_active);
    slides.forEach(sld=>{
        sld.classList.remove("active");
    })
    dots.forEach(dt=>{
        dt.classList.remove("active");
    })
    if(slide_active.previousElementSibling && slide_active.previousElementSibling.classList.contains("slide")){
        slide_active.previousElementSibling.classList.add("active")
    }else{
        slides[slides.length-1].classList.add("active");
    }

    if(dot_active.previousElementSibling && dot_active.nextElementSibling.classList.contains("dot")){
        dot_active.previousElementSibling.classList.add("active")
    }else{
        dots[dots.length-1].classList.add("active");
    }
}

function nextSlide(){
    var slides = document.querySelectorAll(".slide");
    var dots = document.querySelectorAll(".dot");
    let slide_active = document.querySelector(".slide.active");
    let dot_active = document.querySelector(".dot.active");
    // var index = slides.indexOf(slide_active);
    slides.forEach(sld=>{
        sld.classList.remove("active");
    })
    dots.forEach(dt=>{
        dt.classList.remove("active");
    })
    if(slide_active.nextElementSibling && slide_active.nextElementSibling.classList.contains("slide")){
        slide_active.nextElementSibling.classList.add("active")
    }else{
        slides[0].classList.add("active");
    }

    if(dot_active.nextElementSibling && dot_active.nextElementSibling.classList.contains("dot")){
        dot_active.nextElementSibling.classList.add("active")
    }else{
        dots[0].classList.add("active");
    }
}
