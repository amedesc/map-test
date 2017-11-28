CustomMarker.prototype = new google.maps.OverlayView();

function CustomMarker(opts) {
    this.setValues(opts);
}

CustomMarker.prototype.draw = function() {
    var self = this;
    var div = this.div;
    if (!div) {
        div = this.div = $('' +
           // '<div class="pulse"></div>' +
            '<div class="pulse-container">' +
                '<div class="pulse-box">' +
                    '<svg class="pulse-svg">' +
                        '<circle class="circle first-circle" fill="#FF6347" cx="10" cy="10" r="10"></circle>' +
                        '<circle class="circle second-circle" fill="#FF6347" cx="10" cy="10" r="10"></circle>' +
                        '<circle class="circle third-circle" fill="#FF6347" cx="10" cy="10" r="10"></circle>' +
                        '<circle class="circle" fill="#FF6347" cx="10" cy="10" r="10"></circle>' +
                    '</svg>' +
                '</div>' +
            '</div>' +
            '')[0];
        this.circle = this.div.getElementsByClassName('circle');
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

// Main function
window.addEventListener('load', function () {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: new google.maps.LatLng(9.4, -84),
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
                "featureType": "landscape.man_made",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#a80326"
                    },
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
                "featureType": "landscape.natural.terrain",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#b3d09c"
                    },
                    {
                        "visibility": "on"
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
                        "color": "#a2d0ee"
                    },
                    {
                        "gamma": "1.00"
                    }
                ]
            }
        ]
    });
    var marker2 = new CustomMarker({
        position: new google.maps.LatLng(10, -84),
        map: map,
        icon : {
            anchor: new google.maps.Point(0, 51),
            size: new google.maps.Size(10, 10),
        }
    });
    var allSeisms = [],
        url = 'http://rsnapiusr.ucr.ac.cr/api/seisms/' +
            'getWebMapSeisms' +
            '?access_token=559aca63553be4973f58dbc1',
        addMarkers = function(seisms) {
            var normalIcon = '../rsn-map 2.0/icons/markerV.svg',
                midIcon = '../rsn-map 2.0/icons/markerN.svg',
                dangerIcon ='../rsn-map 2.0/icons/markerR.svg';
            seisms.forEach(function(seism, index, arr) {
                seism.localDateTime = new Date($.now());
                var icon = normalIcon;
                if(seism.magnitude > 3.5) {
                    icon = midIcon;
                }
                if(seism.magnitude >= 5) {
                    icon = dangerIcon;
                }
                var marker = new SVGMarker({
                    map: map,
                    position: new google.maps.LatLng(seism.lat, seism.lon),
                    icon: {
                        anchor: new google.maps.Point(0, 51),
                        size: new google.maps.Size(17, 51),
                        url: icon
                    },
                    infoWindow: {
                        content: [
                            '<b class="fecha_hora_infoWindow">Fecha y Hora Local: </b> <span class="fecha_hora_infoWindow">' + seism.localDateTime + '</span>',
                            '<b class="fecha_hora_infoWindow">Magnitud: </b> <span class="fecha_hora_infoWindow">' + seism.magnitude + ' Mw'+ '</span>',
                            '<b class="fecha_hora_infoWindow">Ubicaci&oacute;n: </b> <span class="fecha_hora_infoWindow">' + seism.local+ '</span>',
                            '<b class="fecha_hora_infoWindow">Profundidad :</b> <span class="fecha_hora_infoWindow">' + seism.depth + ' km'+ '</span>',
                            '<b class="fecha_hora_infoWindow">Latitud: </b> <span class="fecha_hora_infoWindow">' +
                            (
                                Math.abs(seism.lat) +
                                (seism.lat < 0?' S': ' N')
                            )+ '</span>',
                            '<b class="fecha_hora_infoWindow">Longitud: </b> <span class="fecha_hora_infoWindow">' +
                            (
                                Math.abs(seism.lon) +
                                (seism.lat < 0?' E': ' O')
                            )+ '</span>',
                            '<b class="fecha_hora_infoWindow">Localizaci&oacute;n: </b> <span class="fecha_hora_infoWindow">Revisada por ' +
                            seism.agency+ '</span>'
                        ].join('<br />')
                    }
                })               
            });
        };
    function getSeisms(){
        $.get(url).then(function(result) {
                allSeisms = result.seisms;
                addMarkers(allSeisms);
        }, function(error) {
            console.error(error);
        });
    }
    getSeisms();
});
