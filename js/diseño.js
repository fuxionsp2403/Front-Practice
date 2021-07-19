const carrito = document.getElementById('carrito');
const animes = document.getElementById('lista-animes');
const listaAnimes = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

cargarEventListener();

function cargarEventListener() {
  animes.addEventListener('click', comprarAnime);

  carrito.addEventListener('click', eliminarAnime);

  vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

  document.addEventListener('DOMContentLoaded', leerLocalStorage);
}

function comprarAnime(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const anime = e.target.parentElement.parentElement;
        leerDatosAnime(anime);

    }
}

function leerDatosAnime(anime){
    const infoAnime = {
        imagen: anime.querySelector('img').src,
        description: anime.querySelector('h4').textContent,
        precio: anime.querySelector('.precio span').textContent,
        id: anime.querySelector('a').getAttribute('data-id')
    }

    insertarCarrito(infoAnime);
}

function insertarCarrito(anime){
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>
        <img src="${anime.imagen}" width=100>
    </td>
    <td>${anime.descripcion}</td>
    <td>${anime.precio}</td>
    <td>
        <a href="#" class="borrar-anime" data-id="${anime.id}">X</a>
    </td>
    `;

    listaAnimes.appendChild(row);
    guardarAnimeLocalStorage(anime);
}

function eliminarAnime(e){
    e.preventDefault();

    let anime,
     animeid;

     if(e.target.classList.contains('borrar-anime')){
         e.target.parentElement.parentElement.remove();
         anime = e.target.parentElement.parentElement;
         animeid = anime.querySelector('a').getAttribute('data-id');
     }

     eliminarAnimeLocalStorage(animeid)
}

function vaciarCarrito(){
    while(listaAnimes.firstChild){
        listaAnimes.removeChild(listaAnimes.firstChild);
    }
    vaciarLocalStorage();

    return false;
}

function guardarAnimeLocalStorage(anime){
    let anime;

    animes = obtenerAnimesLocalStorage();
    animes.push(anime);

    localStorage.setItem('animes', JSON.stringify(animes));
}

function obtenerAnimesLocalStorage(){
    let animesLS;
    if(localStorage.getItem('animes') === null){
        animesLS = [];
    }
    else{
        animesLS =JSON.parse(localStorage.getItem('animes'));
    }
    return animesLS;
}

function leerLocalStorage(){
    let animesLS;

    animesLS =obtenerAnimesLocalStorage();

    animesLS.forEach(function(anime){
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${anime.imagen}" width = 100>
        </td>
        <td>${anime.descripcion}</td>
        <td>${anime.precio}</td>
        <td>
            <a href="#" class="borrar-anime" data-id="${anime.id}">X</a>
        </td>
        `;
        listaAnimes.appendChild(row);

    });
}

function eliminarAnimeLocalStorage(anime){
    let animesLS;
    animesLS = obtenerAnimesLocalStorage();

    animesLS = forEach(function(animesLS, index){
        if(animesLS.id === anime){
            animesLS.splice(index, 1);

        }
    });

    localStorage.setItem('animes', JSON.stringify(animesLS));
}

function vaciarLocalStorage(){
    localStorage.clear();
}