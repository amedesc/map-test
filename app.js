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
    var allSeisms = [],
        url = 'http://rsnapiusr.ucr.ac.cr/api/seisms/' +
            'getWebMapSeisms' +
            '?access_token=559aca63553be4973f58dbc1',
        addMarkers = function(seisms) {
            var normalIcon = '../map-test/icons/markerV.png',
                midIcon = '../map-test/icons/markerN.png',
                dangerIcon ='../map-test/icons/markerR.png';
            seisms.forEach(function(seism, index, arr) {
                seism.localDateTime = new Date($.now());
                var icon = normalIcon;
                if(seism.magnitude > 3.5) {
                    icon = midIcon;
                }
                if(seism.magnitude >= 5) {
                    icon = dangerIcon;
                }
                var marker = new google.maps.Marker({
                    map: map,
                    position: new google.maps.LatLng(seism.lat, seism.lon),
                    title: seism.local,
                    icon: icon,
                });         
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
