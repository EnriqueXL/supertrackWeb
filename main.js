let lugaresInfo = []
const ConseguirLugares = () => {
    fetch('https://crsseguridad.live/intranet/encustascrs/prueba-cleaver/consultweb.php')
        .then(response => response.json())
        .then(lugares => {

            lugares.forEach(lugar => {
                let lugarInfo = {
                    lat: parseFloat(lugar.latitud),
                    lng: parseFloat(lugar.longitud),
                    /* nombre: lugar.Nombre */
                }
                lugaresInfo.push(lugarInfo);
                console.log("sucursales", lugarInfo);
                dibujarMapa(lugar);
            })


            navigator.geolocation.getCurrentPosition(lugares.forEach(lugar => {
                let lugarInfo = {
                    lat: parseFloat(lugar.latitud),
                    lng: parseFloat(lugar.longitud),
                }

                /* console.log("mi ubicacion", lugarInfo);
                dibujarMapa(lugarInfo) */


            }))

        })
}
const dibujarMapa = (obj) => {
    let mapa = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: obj

    })
    console.log("obj", obj);

    let marcadorUsuario = new google.maps.Marker({
        position: obj,
        title: 'Tu ubicacion'
    })

    marcadorUsuario.setMap(mapa)
    let marcadores = lugaresInfo.map(lugar => {
        return new google.maps.Marker({
            lat: parseFloat(lugar.latitud),
            lng: parseFloat(lugar.longitud),
            map: mapa
        })

    })


}



ConseguirLugares()