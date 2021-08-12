// mneu ham
ham.addEventListener('click', function() {
    ham.classList.toggle('crece');
    menu_wrapper.classList.toggle('crece');
});

botonArriba = document.getElementById('botonArriba');
window.onscroll = function() {

    let scroll = document.documentElement.scrollTop;
    if (scroll > 200) {
        botonArriba.style.transform = "scale(1)";

    } else if (scroll < 200) {
        botonArriba.style.transform = "scale(0)";
    }

};

