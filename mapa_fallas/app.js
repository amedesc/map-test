var map;
var markers=[];
var urlDis = "https://raw.githubusercontent.com/cluis11/pruebas/master/discontinuas.json";
var urlCon = "https://raw.githubusercontent.com/cluis11/pruebas/master/continuas.json";
var icon = "ic_circle.png"

function initMap(){
	map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: new google.maps.LatLng(9.4, -84),
        streetViewControl: false,
        zoomControlOptions: {
              position: google.maps.ControlPosition.TOP_LEFT
          },
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

function addFallasDis(){
    var lineaDiscontinua = {
        path: 'M 0,-1 0,1',
        strokeOpacity: 1,
        scale: 2
      };

      var lineaDiscontinuax = {
        path: 'M 0,-1 0,1',
        strokeOpacity: 1,
        scale: 6
      };
      $.getJSON(urlDis, function(json) {
          var falla = json.discontinuas;
          falla.forEach(function(seism, index, arr) {
            if (index==61){
                var line = new google.maps.Polyline({
                    path: falla[index],
                    strokeOpacity: 0,
                    strokeColor: '#ff0000',
                    icons: [{
                      icon: lineaDiscontinuax,
                      offset: '0',
                      repeat: '10px'
                    }],
                    map: map
                  });
            }
            var line = new google.maps.Polyline({
            path: falla[index],
            strokeOpacity: 0,
            icons: [{
              icon: lineaDiscontinua,
              offset: '0',
              repeat: '10px'
            }],
            map: map
          });
        });
      });
}

function addFallasCon(){
    $.getJSON(urlCon, function(json) {
          var falla = json.continuas;
          falla.forEach(function(seism, index, arr) {
            var fallaLine = new google.maps.Polyline({
              path: falla[index],
              geodesic: true,
              strokeColor: '#000',
              strokeOpacity: 1.0,
              strokeWeight: 2
            });
            fallaLine.setMap(map);
        });
      });
}

function addMarker(falla){
    var loc = falla[Math.floor(falla.length / 2)];
    var marker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(loc),
        title: "falla",
        icon: icon
    });
}

google.maps.event.addDomListener(window, 'load', function() {
    $('.button-collapse').sideNav({ menuWidth: 400 });

    initMap();
    addFallasDis();
    addFallasCon();
});