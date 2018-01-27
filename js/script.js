const direccion = 'https://api.themoviedb.org/3/'
const apiKey = '8b63f9cc103eeac66a2e67bf1bd6bda8';

// Con esta función obtengo el json con la información de la película para insertarlo en los resultados
function traerInfoDeLaAPI () {
    const urlInfo = `${direccion}search/movie?api_key=${apiKey}&query=${nombrePelicula}`;
    
    fetch(urlInfo)
        .then(response => response.json())
        .then(response => {
            response.results.forEach(pelicula =>  mostrarInfo(pelicula));
        })        
}

///Agrega el html con los resultados de la busqueda.
function mostrarInfo(pelicula) {
    const informacion = `
        <div>
            <img src="${pelicula.poster_path}" alt="${pelicula.original_title}">
            <h2>${pelicula.original_title}</h2>
            <div>
                <p>${pelicula.overview}</p>
                <p><b>Año de lanzamiento:</b> ${pelicula.release_date}</p>
            </div>
        </div>
    `;
    return document.getElementById('contenido').insertAdjacentHTML('beforeEnd', informacion);   
}

//Con esta función obtengo el json de las imágenes pero aún no logro usarla
// id = pelicula => {
//     URLImagen = `${direccion}movie/${pelicula.id}/images?api_key=${apiKey}`

//     fetch(URLImagen).then(response => response.json())
//     .then(response => {
//         response.posters.forEach(imagen => mostrarImagen(imagen))
//     })
// }

//Modifica el template al hacer click.
function modificacionesAlBuscar () {
    //Agrega los márgenes de la nueva posición.
    document.getElementById('logo').style.fontSize = "2rem"
    document.querySelector('header').style.marginLeft = "2%";
    document.querySelector('header').style.marginTop = "2%";
    //Cambio la orientación del menu
    document.querySelector('header').style.flexDirection = "row";  
    //Cambio del tamaño de la lupa
    document.querySelector('button').style.fontSize = "1.4rem";
    //Cambio del tamaño del buscador.
    document.getElementById('buscador').style.height = "1.8rem";
    document.getElementById('buscador').style.width = "70%";
    document.getElementById('buscador').style.marginLeft = "2rem";  
}

//Con esta función logro realizar la busqueda en la API y agregar los elementos HTML cuando hago la busqueda.
const buscador = document.querySelector('button').onclick = () => {
    //De esta manera obtengo el valor que será usado para la busqueda, además, 
    //uso el método encodeURIComponent para que acepte los espacios.
    nombrePelicula = encodeURIComponent(document.querySelector('input[name="buscador"]').value);
    // let nombreVariable = document.getElementById('idDeTuInput').value();
    //Modificaciones cuando hago la busqueda
    modificacionesAlBuscar();
    //Consulta la API
    traerInfoDeLaAPI();
    //Agrega el template    
    mostrarInfo();
};