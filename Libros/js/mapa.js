var map;
var latitud = 41.67097948393865;
var longitud = -3.6769259916763985;

function inicioMapa()
{
 
    map = new google.maps.Map(
        document.getElementById('map_canvas'), {
        // En el mapa se visualiza el mapa correspondiente a esta latitud, longitud
            center: new google.maps.LatLng(latitud,longitud),//latitud,longitud),//
           // center: new google.maps.LatLng(41.6685198,-3.6886618),//latitud,longitud),//
        zoom: 18, // zoom del mapa
        draggableCursor: 'auto', // forma del cursor
        draggingCursor: 'crosshair',
        mapTypeId: google.maps.MapTypeId.SATELLITE // tipo de mama
    });
    
    google.maps.event.addListener(map, 'click', function (event) {
     
        datolatitud_longitud = event.latLng.toString();
    
       
    
        var fileName = "./imagenes/Logo.png";
       
        var icono = {
            url: "./imagenes/curso.png", // url
            scaledSize: new google.maps.Size(25, 25), // scaled size
            origin: new google.maps.Point(0,0), // origin
            anchor: new google.maps.Point(0, 0) // anchor
        };
    
        marker = new google.maps.Marker({
            position: event.latLng,
            icon: icono,
            map: map,
            nombre: 'Pepino'
        });
        google.maps.event.addListener(marker, 'click', function() {
          //  alert("Click en marcador " + this.nombre+latitud_longitud.value);
        });
        //enviaLL(lineaAutobus,datolatitud_longitud);
        leeDireccion(event.latLng);
    });
    
    
    }
    
    // Obtiene la longitud y la latitud correspondiente al clic
    // y copia los datos en cajas de texto. Tambien obtiene la
    // dirección del lugar donde hacemos clic
    function leeDireccion( latlng) {
        geocoder = new google.maps.Geocoder();
        if (latlng != null) {
            //    address = latlng;
            //    geocoder.getLocations(latlng, MuestraDireccion);
               
            geocoder.geocode({'latLng': latlng}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        //https://developers.google.com/maps/documentation/javascript/geocoding?hl=es
                        //  alert(results[1].formatted_address);
                        //  alert(results[0].formatted_address);
                        MuestraDireccion(latlng,results[0].formatted_address)
                    } else {
                        alert('No results found');
                    }
                } else {
                    alert('Geocoder failed due to: ' + status);
                }
            });                   
          
        }
    }
    
    function MuestraDireccion(latlng,direccion) {
     
    direccionLocal.value= direccion;
       
        latitud_longitud.value=latlng.lat()+","+latlng.lng();
    }
    
    //VIsualiza el mapa cuando el script se visualiza
    inicioMapa();
    