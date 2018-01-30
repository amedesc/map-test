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

CustomMarker.prototype.draw = function() {
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

CustomMarker.prototype.remove = function() {
    if (this.div) {
      this.div.parentNode.removeChild(this.div);
      this.div = null;
    }
  };


/*
	Función que crea el mapa
*/
function initMap(){
	map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: new google.maps.LatLng(9.4, -84),
        streetViewControl: false,
        zoomControlOptions: {
              position: google.maps.ControlPosition.TOP_LEFT
          },
        styles: [{
            'featureType': 'administrative.country',
            'elementType': 'geometry.stroke',
            'stylers': [{
                'color': '#263238'
            }, {
                'weight': 1
            }]
        }, {
            'featureType': 'administrative.land_parcel',
            'elementType': 'geometry.fill',
            'stylers': [{
                'visibility': 'off'
            }]
        }, {
            'featureType': 'administrative.land_parcel',
            'elementType': 'labels',
            'stylers': [{
                'visibility': 'off'
            }]
        }, {
            'featureType': 'administrative.province',
            'elementType': 'geometry.stroke',
            'stylers': [{
                'color': '#546e7a'
            }, {
                'weight': 0.5
            }]
        }, {
            'featureType': 'landscape.natural.terrain',
            'elementType': 'geometry.fill',
            'stylers': [{
                'color': '#b3d09c'
            }]
        }, {
            'featureType': 'poi',
            'elementType': 'labels.text',
            'stylers': [{
                'visibility': 'off'
            }]
        }, {
            'featureType': 'road.arterial',
            'elementType': 'labels',
            'stylers': [{
                'visibility': 'off'
            }]
        }, {
            'featureType': 'road.highway',
            'elementType': 'geometry.fill',
            'stylers': [{
                'color': '#ffffff'
            }, {
                'weight': 1
            }]
        }, {
            'featureType': 'road.highway',
            'elementType': 'geometry.stroke',
            'stylers': [{
                'color': '#ffffff'
            }, {
                'visibility': 'off'
            }, {
                'weight': 0.5
            }]
        }, {
            'featureType': 'road.highway',
            'elementType': 'labels',
            'stylers': [{
                'visibility': 'off'
            }]
        }, {
            'featureType': 'road.highway.controlled_access',
            'elementType': 'geometry.stroke',
            'stylers': [{
                'visibility': 'off'
            }]
        }, {
            'featureType': 'road.local',
            'stylers': [{
                'visibility': 'off'
            }]
        }, {
            'featureType': 'road.local',
            'elementType': 'labels',
            'stylers': [{
                'visibility': 'off'
            }]
        }, {
            'featureType': 'transit',
            'stylers': [{
                'visibility': 'off'
            }]
        }, {
            'featureType': 'water',
            'elementType': 'geometry.fill',
            'stylers': [{
                'color': '#9fd1ff'
            }]
        }]
    });
}


// Main function
google.maps.event.addDomListener(window, 'load', function() {
	initMap();

	//permite que la barra del menú de dispositivos móviles se abrá al darle click
    $('.button-collapse').sideNav({ menuWidth: 421 });

    //permite que se ejecuten los filtros de 15 días y 24 horas
    $('.filter').click(function(eventObject) {
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
            remove24(allSeisms.filter(function(seism, index, arr) {
            	return moment(seism['origin_time'].replace('Z', '+06:00'))
            	.unix() < twentyFourHoursAgo;
            }));
        }
        $this.addClass('active');
    });


    function addData (time, date, magnitude, depth, lat, lon, local){
    	$('[data-latest-seism="localDate"]').text(date);
        $('[data-latest-seism="localTime"]').text(time);
        $('[data-latest-seism="magnitude"]').text(magnitude + ' Mw');
        $('[data-latest-seism="depth"]').text(depth + ' km');
        $('[data-latest-seism="lat"]').text(Math.abs(lat) + (lat < 0?' S': ' N'));
        $('[data-latest-seism="lon"]').text(Math.abs(lon) + (lat < 0?' E': ' O'));
        $('[data-latest-seism="local"]').text(local);
    }
       
    function addMarkers(seisms) {
    	seisms.forEach(function(seism, index, arr) {
            var time = moment.tz(seism['origin_time'].toString().replace('Z', '+06:00'), "America/Costa_Rica").format('h:mm a');
            var date = moment.tz(seism['origin_time'].toString().replace('Z', '+06:00'), "America/Costa_Rica").format('DD-MM-YYYY');
            seism.localDateTime = moment.tz(seism['origin_time'].toString().replace('Z', '+06:00'), "America/Costa_Rica").format('DD-MM-YYYY h:mm a');

    		if(index === 0) {
    			addData(time, date, seism.magnitude, seism.depth, seism.lat, seism.lon, seism.local);
                var markerPulse = new CustomMarker({
    				position: new google.maps.LatLng(seism.lat, seism.lon),
    				map: map
    			});   
            }
                var icon = normalIcon;
                if (seism.magnitude > 3.5) {
                    icon = midIcon;
                }
                if (seism.magnitude >= 5) {
                    icon = dangerIcon;
                }
                if (index ===0){
                var marker = new google.maps.Marker({
                    map: map,
                    position: new google.maps.LatLng(seism.lat, seism.lon),
                    title: seism.local,
                    icon: {
                        url: icon,
                        size: new google.maps.Size(13, 38),
                        anchor: new google.maps.Point(6.5, 38)
                    },
                   	zIndex: google.maps.Marker.MAX_ZINDEX + 1
                });

               }
               else{
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
               }
                var content = [
                    '<b class="fecha_hora_infoWindow">Fecha y hora local: </b> <span class="fecha_hora_infoWindow">' + seism.localDateTime + '</span>',
                    '<b class="fecha_hora_infoWindow">Magnitud: </b> <span class="fecha_hora_infoWindow">' + seism.magnitude + ' Mw' + '</span>',
                    '<b class="fecha_hora_infoWindow">Ubicaci&oacute;n: </b> <span class="fecha_hora_infoWindow">' + seism.local + '</span>',
                    '<b class="fecha_hora_infoWindow">Profundidad :</b> <span class="fecha_hora_infoWindow">' + seism.depth + ' km' + '</span>',
                    '<b class="fecha_hora_infoWindow">Latitud: </b> <span class="fecha_hora_infoWindow">' +
                    (
                        Math.abs(seism.lat) +
                        (seism.lat < 0 ? ' S' : ' N')
                    ) + '</span>',
                    '<b class="fecha_hora_infoWindow">Longitud: </b> <span class="fecha_hora_infoWindow">' +
                    (
                        Math.abs(seism.lon) +
                        (seism.lat < 0 ? ' E' : ' O')
                    ) + '</span>'
                ].join('<br />');
                google.maps.event.addListener(marker, 'click', (function(marker) {
                    return function() {
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
        };


     function locate(marker_id) {
        var myMarker = markers[marker_id];
        var div = map.getDiv();
        map.panTo(new google.maps.LatLng(myMarker.position.lat() , myMarker.position.lng()));
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

    function fixInfoWindow(){
        if (heigth <=560){
            map.panBy(0, -70);
        }
        else if(heigth<=580){
            map.panBy(0, -50);
        }
    }


    function add24(){
    	for (var i = 0; i < markers.length; i++ ) {
    		if (markers[i].map==null){
    			markers[i].setMap(map);
    		}
    	}
    	locate(0);
    }

    function remove24(seisms){
        var i = markers.length - seisms.length;
        for (i; i < markers.length; i++ ) {
            markers[i].setMap(null);
        }
        locate(0);
    }

    function getSeisms() {
        $.get(url).then(function(result) {
            allSeisms = result.seisms;
            addMarkers(allSeisms);
        }, function(error) {
            console.error(error);
        });
    }
    getSeisms();
});