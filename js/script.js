// //Uso window.onload para que cargue todo el HTML antes de ejecutar el JS
window.onload = () => {
    const direccion = 'https://api.themoviedb.org/3/'
    const apiKey = '8b63f9cc103eeac66a2e67bf1bd6bda8';
    //En esta constante guardo el main que contendrá los primeros 20 resultados de la busqueda. 
    const contenido = document.getElementById('contenido');
    const buscador = document.querySelector('button')


    // Con esta función obtengo el json con la información de la película para insertarlo en la busqueda
    const realizarLaConexion = () => {
        URLInfo = `${direccion}search/movie?api_key=${apiKey}&query=${nombrePelicula}`
        fetch(URLInfo)
            .then(response => response.json())
            .then(response => {
                response.results.forEach(pelicula => mostrar(pelicula));

            })
    }

    const mostrar = pelicula => {
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
        contenido.insertAdjacentHTML('beforeEnd', informacion);   
    }



    //Con esta función logro realizar la busqueda en la API y agregar los elementos HTML cuando hago la busqueda.
    buscador.onclick = () => {
        //De esta manera obtengo el valor que será usado para la busqueda, además, 
        //uso el método encodeURIComponent para que acepte los espacios.
        nombrePelicula = encodeURIComponent(document.querySelector('input[name="buscador"]').value);
        //Agrega los márgenes de la nueva posición.
        document.querySelector('header').style.marginLeft = "2%";
        document.querySelector('header').style.marginTop = "2%";
        //Cambio la orientación del menu
        document.querySelector('header').style.flexDirection = "row";  
        //Cambio del tamaño del buscador.
        document.getElementById('buscador').style.height = "2.8rem";
        document.getElementById('buscador').style.width = "80%";
        document.getElementById('buscador').style.marginLeft = "2rem";  
        //Consulta la API
        realizarLaConexion();
        //Agrega el template    
        mostrar();
    };

    //Con esta función obtengo el json de las imágenes pero aún no logro usarla
    // id = pelicula => {
    //     URLImagen = `${direccion}movie/${pelicula.id}/images?api_key=${apiKey}`

    //     fetch(URLImagen).then(response => response.json())
    //     .then(response => {
    //         response.posters.forEach(imagen => mostrarImagen(imagen))
    //     })
    // }

}
