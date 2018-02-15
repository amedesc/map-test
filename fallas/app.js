var map;
var url="https://raw.githubusercontent.com/amedesc/map-test/master/fallas/falla.json";
var fallasLines=[], marcadores=[], color1="#ff6d00", color2='#0087E0', size=1.9;
function initMap(){
	map = new google.maps.Map(document.getElementById('map'), {
        maxZoom:12,
        minZoom:7,
        zoom: 9,
        center: new google.maps.LatLng(10, -84),// con dimensiones de 847 x 600
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



function drawLines(location, name){
    if (location.hasOwnProperty('continuas') && location.hasOwnProperty('discontinuas')){
        addFallasCon(location.continuas,name);
        addFallasDis(location.discontinuas, name);
    }
    else if(location.hasOwnProperty('continuas')){
        addFallasCon(location.continuas, name);
    }
    else{
        addFallasDis(location.discontinuas, name);
    }
}
function readJson(){
    $.getJSON(url, function(doc) {
        var fallas = doc.fallas;
        fallas.forEach(function(falla, index, arr) {
          drawLines(falla.location, falla.name);
          if (!falla.hasOwnProperty('link') && falla.hasOwnProperty('marcador')){
              addMarker(falla.marcador, falla.name, falla.icono);
          }
          else if(falla.hasOwnProperty('link') && falla.hasOwnProperty('marcador')){
            addMarker(falla.marcador, falla.name, falla.icono, falla.link);
          }
      });
      
    });
}

function addFallasDis(discontinuas, name){
    if (discontinuas[0].constructor === Array){
        discontinuas.forEach(function(element, index, arr) {    
            addFallasDis(element,name);
        });
    }
    else{
        var lineaDiscontinua = {
            path: 'M 0,-1 0,1',
            strokeOpacity: 1,
            scale: size
        };
            var line = new google.maps.Polyline({
                path: discontinuas,
                strokeOpacity: 0,
                strokeColor: color1,
                    icons: [{
                      icon: lineaDiscontinua,
                      offset: '0',
                      repeat: '10px'
                    }],
                    map: map
                  });
                  fallasLines.push({
                    line: line,
                    name: name
                })
        }
}

function addFallasCon(continuas, name){
    if (continuas[0].constructor === Array){
        continuas.forEach(function(element, index, arr) {    
            addFallasCon(element,name);
        });
    }
    else{
        var fallaLine;
            fallaLine = new google.maps.Polyline({
                path: continuas,
                geodesic: true,
                strokeColor: color1,
                strokeOpacity: 1.0,
                strokeWeight: size
            });
        fallaLine.setMap(map);
        fallasLines.push({
            line: fallaLine,
            name: name
        })
        
    }
}

function addMarker(marcador, name, icono){
    var marker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(marcador),//agua caliente
        title: name,
        icon: {
            url: '../fallas/icons/'+icono+".svg",
        }
    });

    marker.addListener('mouseover', function() {
        fallasLines.forEach(function(falla, index, arr) {
            if (falla.name==marker.getTitle()){
                falla.line.setOptions({strokeColor: color2});
            }
        });
    });
    marker.addListener('mouseout', function() {
        fallasLines.forEach(function(falla, index, arr) {
            if (falla.name==marker.getTitle()){
                falla.line.setOptions({strokeColor: color1});
            }
        });
    }); 
}

function addMarker(marcador, name, icono, link){
    var marker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(marcador),//agua caliente
        title: name,
        icon: {
            url: '../fallas/icons/'+icono+".svg",
        }
    });

    marker.addListener('mouseover', function() {
        fallasLines.forEach(function(falla, index, arr) {
            if (falla.name==marker.getTitle()){
                falla.line.setOptions({strokeColor: color2});
            }
        });
    });
    marker.addListener('mouseout', function() {
        fallasLines.forEach(function(falla, index, arr) {
            if (falla.name==marker.getTitle()){
                falla.line.setOptions({strokeColor: color1});
            }
        });
    });

    marker.addListener('click', function() {
        window.open('http://'+link, '_blank');
    });
    
}


google.maps.event.addDomListener(window, 'load', function() {
    
    $('.button-collapse').sideNav({ menuWidth: 400 });

    initMap();
    readJson();
});


