var map;
var marcador1='../volcanes/ic_volcano_1.svg';
var marcador2='../volcanes/ic_volcano_2.svg';
var marcador3='../volcanes/ic_volcano_3.svg';

function initMap(){
	map = new google.maps.Map(document.getElementById('map'), {
        maxZoom:12,
        minZoom:8,
        zoom: 9,
        center: new google.maps.LatLng(10.5, -84.5),// dimensions: 847 x 600
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
                        "gamma": "1.00"
                    },
                    {
                        "weight": "0.70"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels",
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
                        "saturation": "32"
                    },
                    {
                        "lightness": "52"
                    },
                    {
                        "hue": "#27ff00"
                    },
                    {
                        "gamma": "0.30"
                    }
                ]
            },
            {
                "featureType": "landscape.natural",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "off"
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
                        "saturation": "-22"
                    },
                    {
                        "lightness": "100"
                    },
                    {
                        "gamma": "3.30"
                    },
                    {
                        "hue": "#ff0000"
                    }
                ]
            },
            {
                "featureType": "landscape.natural.terrain",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "saturation": "0"
                    },
                    {
                        "lightness": "-6"
                    },
                    {
                        "gamma": "0.70"
                    },
                    {
                        "hue": "#31ff00"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "off"
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
                "featureType": "poi.place_of_worship",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels",
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
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#9cd2fa"
                    }
                ]
            }
        ]
    });
}

function addVolcanos(volc){
    var icono='../volcanes/icons/'+volc.name+'.svg';
    var marker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(volc.location),
        icon: icono
    });

    marker.addListener('click', function() {
        window.open('http://'+volc.link, '_blank');
    });
}

function readJson(){
    var volcanes = data.Volcanes;
    volcanes.forEach(function(volc, index, arr) {
        addVolcanos(volc);
      });
    
}

google.maps.event.addDomListener(window, 'load', function() {
    $('.button-collapse').sideNav({ menuWidth: 400 });

    initMap();
    readJson();
});