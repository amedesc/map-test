var map;
var urlDis = "https://raw.githubusercontent.com/cluis11/pruebas/master/discontinuas.json";
var urlCon = "https://raw.githubusercontent.com/cluis11/pruebas/master/continuas.json";
var url="https://raw.githubusercontent.com/amedesc/map-test/master/fallas/falla.json";
var icon = "ic_circle.png"
var color="#ff6d00", size=1.9;

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










/*google.maps.event.addDomListener(window, 'DOMContentLoaded', function() {
    addMarker();

    google.maps.event.addDomListener(markerX, 'mouseover', function() {
        fallasLines.forEach(function(falla, index, arr) {
            
                falla.line.setOptions({strokeColor: 'blue'});
            
        });
    });
    google.maps.event.addDomListener(markerX, 'mouseout', function() {
        fallasLines.forEach(function(falla, index, arr) {
            
                falla.line.setOptions({strokeColor: color});
        });
    });
});*/

var fallasLines=[];
var marker;
google.maps.event.addDomListener(window, 'load', function() {
    
    var fallaObj = {name:"", line:null};
    $('.button-collapse').sideNav({ menuWidth: 400 });

    initMap();

    function drawLines(location, name){
        if (location.hasOwnProperty('continuas') && location.hasOwnProperty('discontinuas')){
            addFallasCon(location.continuas);
            addFallasDis(location.discontinuas);
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
                nameX = String(falla.name);
              drawLines(falla.location, falla.name);
          });
          
        });
    }
    
    
    function addFallasDis(discontinuas, name){
        if (discontinuas[0].constructor === Array){
            discontinuas.forEach(function(element, index, arr) {    
                addFallasDis(element);
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
                    strokeColor: color,
                        icons: [{
                          icon: lineaDiscontinua,
                          offset: '0',
                          repeat: '10px'
                        }],
                        map: map
                      });
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
                    strokeColor: color,
                    strokeOpacity: 1.0,
                    strokeWeight: size
                });
            fallaLine.setMap(map);
            fallaObj.line=fallaLine;
            fallaObj.name=name;
            fallasLines.push(fallaObj);
            
        }
    }
    function addMarker(){

        fallasLines.forEach(function(falla, index, arr) {
            alert(falla.name);
        });
        marker = new google.maps.Marker({
            map: map,
            position: new google.maps.LatLng(9.8637285975727, -83.974196586968),//agua caliente
            title:'Agua Caliente',
            icon: {
                url: '../fallas/Falla_2_1.svg',
            }
        });
    
        marker = new google.maps.Marker({
            map: map,
            position: new google.maps.LatLng(10.065834534918, -84.237673064005),//alajuela
            icon: {
                url: '../fallas/Falla_2_2.svg',
            }
        });
    
        marker = new google.maps.Marker({
            map: map,
            position: new google.maps.LatLng(10.098998016865, -83.84868906873),//alto grande
            title: 'hol',
            icon: {
                url: '../fallas/Falla_2_3.svg',
            }
        });
    
        marker = new google.maps.Marker({
            map: map,
            position: new google.maps.LatLng(   8.7857500680123, -82.830702597457),//alturas
            title: 'hol',
            icon: {
                url: '../fallas/Falla_2_1.svg',
            }
        });
    
        marker = new google.maps.Marker({
            map: map,
            position: new google.maps.LatLng(9.9125789018347, -83.999934919321),//cipreses
            title: 'hol',
            icon: {
                url: '../fallas/Falla_2_2.svg',
            }
        });
    
        marker = new google.maps.Marker({
            map: map,
            position: new google.maps.LatLng(9.795481263913, -84.046480070029),//frailes
            icon: {
                url: '../fallas/Falla_2_3.svg',
            }
        });
    
        marker = new google.maps.Marker({
            map: map,
            position: new google.maps.LatLng(9.8130440436941, -83.637519603721),//turrialba
            icon: {
                url: '../fallas/Falla_2_1.svg',
            }
        });
    
        marker = new google.maps.Marker({
            map: map,
            position: new google.maps.LatLng(10.209106038905, -84.399508834394),//zarcero
            icon: {
                url: '../fallas/Falla_2_2.svg',
            }
        });
    
        marker = new google.maps.Marker({
            map: map,
            position: new google.maps.LatLng(8.926609594636, -82.762861289701),//la lucha
            icon: {
                url: '../fallas/Falla_2_3.svg',
            }
        });
    
    
        marker = new google.maps.Marker({
            map: map,
            position: new google.maps.LatLng(10.452754931614, -84.700046850537),//danta
            icon: {
                url: '../fallas/Falla_2_1.svg',
            }
        });
    
        marker = new google.maps.Marker({
            map: map,
            position: new google.maps.LatLng(10.41244215182, -84.449246395503),//florencia
            icon: {
                url: '../fallas/Falla_2_2.svg',
            }
        });
    
        marker = new google.maps.Marker({
            map: map,
            position: new google.maps.LatLng(10.293119248225, -84.356858173726),//porvenir
            icon: {
                url: '../fallas/Falla_2_3.svg',
            }
        });
    
        marker = new google.maps.Marker({
            map: map,
            title: 'Zumbona',
            position: new google.maps.LatLng(8.7784985049083, -83.024766608146),//zumbona
            icon: {
                url: '../fallas/Falla_2_3.svg',
            }
        });
        
    }
    
        readJson();
        addMarker();
        google.maps.event.addDomListener(marker, 'mouseover', function() {
            
            cambiarColor();
            });
            google.maps.event.addDomListener(marker, 'mouseout', function() {
                regresarColor()
            });
        
});

function cambiarColor(){
    fallasLines.forEach(function(falla, index, arr) {
        if (falla.name=='Agua Caliente' || falla.name=='Zumbona')   {
            falla.line.setOptions({strokeColor: 'blue'});
        }
    });
}

function regresarColor(){
    fallasLines.forEach(function(falla, index, arr) {
        if (falla.name=='Agua Caliente' || falla.name=='Zumbona')   {
            falla.line.setOptions({strokeColor: color});
        }
    });
}

