var width = $(window).width();
var heigth = $(window).height();
var map;
var markers = [];
var allSeisms = [],
    url = 'http://rsnapiusr.ucr.ac.cr/api/seisms/' + 'getWebMapSeisms' + '?access_token=559aca63553be4973f58dbc1';
var normalIcon = '../map/icons/pin_verde.svg',
    midIcon = '../map/icons/pin_naranja.svg',
    dangerIcon = '../map/icons/pin_rojo.svg',
    infowindow = new google.maps.InfoWindow();

CustomMarker.prototype = new google.maps.OverlayView();

/*
	Definición del custommarker y sus funciones para agregarlo en el mapa y removerlo
	El marcadaor consiste de 2 animaciones css pulse úbicado en el sismo más reciente
*/
function CustomMarker(opts) {
    this.setValues(opts);
}

CustomMarker.prototype.draw = function () {
    var self = this;
    var div = this.div;
    if (!div) {
        div = this.div = $('' + '<div>' +
            '<div class="pulse-first"></div>' +
            '<div class="pulse-second"></div>' +
            '</div>' + '')[0];
        this.pinShadow = this.div.getElementsByClassName('shadow');
        div.style.position = 'absolute';
        div.style.cursor = 'pointer';
        var panes = this.getPanes();
        panes.overlayImage.appendChild(div);
    }
    var point = this.getProjection().fromLatLngToDivPixel(this.position);
    if (point) {
        div.style.left = point.x + 'px';
        div.style.top = point.y + 'px';
    }
};

CustomMarker.prototype.remove = function () {
    if (this.div) {
        this.div.parentNode.removeChild(this.div);
        this.div = null;
    }
};


/*
    funcion para redondear la profundidad del sismo
*/
function round(value, step) {
    step || (step = 1.0);
    var inv = 1.0 / step;
    return Math.round(value * inv) / inv;
}

/*
	Función que crea el mapa
*/
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        maxZoom:15,
        minZoom:5,
        zoom: 8,
        center: new google.maps.LatLng(9.4, -84),
        streetViewControl: false,
        zoomControlOptions: {
            position: google.maps.ControlPosition.TOP_LEFT
        },
        clickableIcons: false,
        styles: [
            {
                "featureType": "administrative.country",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#263238"
                    },
                    {
                        "weight": "1.00"
                    }
                ]
            },
            {
                "featureType": "administrative.province",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#546e7a"
                    },
                    {
                        "weight": "0.70"
                    },
                    {
                        "saturation": "0"
                    },
                    {
                        "gamma": "1.00"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [
                    {
                        "hue": "#27ff00"
                    },
                    {
                        "saturation": "32"
                    },
                    {
                        "lightness": "52"
                    },
                    {
                        "gamma": "0.3"
                    }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "landscape.natural",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "gamma": "1.00"
                    }
                ]
            },
            {
                "featureType": "landscape.natural.landcover",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "landscape.natural.terrain",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "hue": "#ff0000"
                    },
                    {
                        "saturation": "-22"
                    },
                    {
                        "lightness": "100"
                    },
                    {
                        "gamma": "3.30"
                    }
                ]
            },
            {
                "featureType": "landscape.natural.terrain",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#e03229"
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "hue": "#31ff00"
                    },
                    {
                        "lightness": "-6"
                    },
                    {
                        "gamma": "0.70"
                    }
                ]
            },
            {
                "featureType": "poi.attraction",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "weight": "1.00"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#9cd2fa"
                    },
                    {
                        "gamma": "1.00"
                    }
                ]
            }
        ]
    });
}


// Main function
google.maps.event.addDomListener(window, 'load', function () {
    initMap();

    //permite que la barra del menú de dispositivos móviles se abrá al darle click
    $('.button-collapse').sideNav({ menuWidth: 421 });

    //permite que se ejecuten los filtros de 15 días y 24 horas
    $('.filter').click(function (eventObject) {
        var $this = $(this);
        if ($this.hasClass('active')) return;
        $('.active').removeClass('active');
        if ($this.hasClass('week-filter')) {
            add24();
            currentFilter = 1;
        }
        else {
            currentFilter = 2;
            var twentyFourHoursAgo = moment()
                .utcOffset('-06:00')
                .add(-24, 'hours')
                .unix();
            remove24(allSeisms.filter(function (seism, index, arr) {
                return moment(seism['origin_time'].replace('Z', '+06:00'))
                    .unix() < twentyFourHoursAgo;
            }));
        }
        $this.addClass('active');
    });


    function addData(time, date, magnitude, depth, lat, lon, local) {
        $('[data-latest-seism="localDate"]').text(date);
        $('[data-latest-seism="localTime"]').text(time);
        $('[data-latest-seism="magnitude"]').text(magnitude + ' Mw');
        $('[data-latest-seism="depth"]').text(depth + ' km');
        $('[data-latest-seism="lat"]').text(Math.abs(lat) + (lat < 0 ? ' S' : ' N'));
        $('[data-latest-seism="lon"]').text(Math.abs(lon) + (lat < 0 ? ' E' : ' O'));
        $('[data-latest-seism="local"]').text(local);
    }

    function addMarkers(seisms) {
        seisms.forEach(function (seism, index, arr) {
            var time = moment.tz(seism['origin_time'].toString().replace('Z', '+06:00'), "America/Costa_Rica").format('h:mm a');
            var date = moment.tz(seism['origin_time'].toString().replace('Z', '+06:00'), "America/Costa_Rica").format('DD-MM-YYYY');
            seism.localDateTime = moment.tz(seism['origin_time'].toString().replace('Z', '+06:00'), "America/Costa_Rica").format('DD-MM-YYYY h:mm a');
            seism.depth=round(seism.depth, 0.5);
            var icon = normalIcon;
            if (seism.magnitude > 3.5) {
                icon = midIcon;
            }
            if (seism.magnitude >= 5) {
                icon = dangerIcon;
            }
            var marker = new google.maps.Marker({
                map: map,
                position: new google.maps.LatLng(seism.lat, seism.lon),
                title: seism.local,
                icon: {
                    url: icon,
                    size: new google.maps.Size(13, 38),
                    anchor: new google.maps.Point(6.5, 38)
                }
            });
            if (index === 0) {
                addData(time, date, seism.magnitude, seism.depth, seism.lat, seism.lon, seism.local);
                var markerPulse = new CustomMarker({
                    position: new google.maps.LatLng(seism.lat, seism.lon),
                    map: map
                });
                marker.setZIndex(999);
            }
            var content = addContent(seism.localDateTime, seism.magnitude, seism.location, seism.depth, seism.lat, seism.lon);
            google.maps.event.addListener(marker, 'click', (function (marker) {
                return function () {
                    infowindow.setContent(content);
                    infowindow.setOptions({
                        maxWidth: 300
                    });
                    infowindow.open(map, marker);
                }
            })(marker));
            markers.push(marker);

        });
        locate(0);
        google.maps.event.trigger(markers[0], 'click');
        google.maps.event.addListener(map, "click", function(event) {
            infowindow.close();
        });
    };


    function addContent(date, magnitude, location, depth, lat, lon){
        return '<div id="iw-container">' +
        '<b class="fecha_hora_infoWindow">Fecha y hora local: </b><span class="fecha_hora_infoWindow">' + date + '</span></br>' +
        '<b class="fecha_hora_infoWindow">Magnitud: </b><span class="fecha_hora_infoWindow">' + magnitude + ' Mw</span></br>' +
        '<b class="fecha_hora_infoWindow">Ubicaci&oacute;n: </b> <span class="fecha_hora_infoWindow">' + location + '</span></br>' +
        '<b class="fecha_hora_infoWindow">Profundidad :</b> <span class="fecha_hora_infoWindow">' + depth + ' km</span></br>' +
        '<b class="fecha_hora_infoWindow">Latitud: </b> <span class="fecha_hora_infoWindow">' +
        (
            Math.abs(lat) +
            (lat < 0 ? ' S' : ' N')
        ) + '</span></br>' +
        '<b class="fecha_hora_infoWindow">Longitud: </b> <span class="fecha_hora_infoWindow">' +
        (
            Math.abs(lon) +
            (lon < 0 ? ' O' : ' E')
        ) + '</span></br>' +
        '</div>';
    }

    function locate(marker_id) {
        var myMarker = markers[marker_id];
        var div = map.getDiv();
        map.panTo(new google.maps.LatLng(myMarker.position.lat(), myMarker.position.lng()));
        if (width <= 640) {
            map.setZoom(9);
        }
        else if (width >= 1280) {
            map.setZoom(8);
        }
        else {
            map.setZoom(9);
        }

        fixInfoWindow();
    }

    function fixInfoWindow() {
        if (heigth <= 560) {
            map.panBy(0, -70);
        }
        else if (heigth <= 580) {
            map.panBy(0, -50);
        }
    }


    function add24() {
        for (var i = 0; i < markers.length; i++) {
            if (markers[i].map == null) {
                markers[i].setMap(map);
            }
        }
        locate(0);
    }

    function remove24(seisms) {
        var i = markers.length - seisms.length;
        for (i; i < markers.length; i++) {
            markers[i].setMap(null);
        }
        locate(0);
    }

    function getSeisms() {
        $.get(url).then(function (result) {
            allSeisms = result.seisms;
            addMarkers(allSeisms);
        }, function (error) {
            console.error(error);
        });
    }
    getSeisms();
});

google.maps.event.addListener(infowindow, 'domready', function () {

    // Reference to the DIV which receives the contents of the infowindow using jQuery
    var iwOuter = $('.gm-style-iw');

    /* The DIV we want to change is above the .gm-style-iw DIV.
     * So, we use jQuery and create a iwBackground variable,
     * and took advantage of the existing reference to .gm-style-iw for the previous DIV with .prev().
     */
    var iwBackground = iwOuter.prev();

    // Remove the background shadow DIV
    iwBackground.children(':nth-child(2)').css({ 'display': 'none' });

    // Remove the white background DIV
    iwBackground.children(':nth-child(4)').css({ 'display': 'none' });

    // Changes the desired tail shadow color.
    iwBackground.children(':nth-child(3)').find('div').children().css({ 'box-shadow': 'none', 'z-index': '1' });

    var iwCloseBtn = iwOuter.next();
    // Apply the desired effect to the close button
    iwCloseBtn.css({
        opacity: '0', // by default the close button has an opacity of 0.7
        right: '50px', top: '23px', // button repositioning
        border: '0px'
    });


});