let lugaresInfo = []
const ConseguirLugares = () => {
    fetch('https://crsseguridad.live/intranet/encustascrs/prueba-cleaver/consultweb.php')
        .then(response => response.json())
        .then(lugares => {

            lugares.forEach(lugar => {
                let lugarInfo = {
                    posicion: { latitud: lugar.latitud, longitud: lugar.longitud },
                    nombre: lugar.Nombre
                }
                lugaresInfo.push(lugarInfo)
            })

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(usuarioUbicacion => {
                    let ubicacion = {
                        lat: usuarioUbicacion.coords.latitude,
                        lng: usuarioUbicacion.coords.longitude
                    }
                    console.log("arreglo de mi ubicacion", ubicacion);
                    dibujarMapa(ubicacion)
                })
            }
        })
}
const dibujarMapa = (obj) => {
    console.log("objetComo recibe el objeto", obj);
    let mapa = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: obj
    })

    let marcadorUsuario = new google.maps.Marker({
        position: obj,
        title: 'Tu ubicacion'
    })

    marcadorUsuario.setMap(mapa)
    let marcadores = lugaresInfo.map(lugar => {
        return new google.maps.Marker({
            position: lugar.posicion,
            title: lugar.nombre,
            map: mapa
        })
    })
}

ConseguirLugares()