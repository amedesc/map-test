//-- Código del custom marker de https://codepen.io/dylanvann/pen/yNWdxJ
CustomMarker.prototype = new google.maps.OverlayView();

function CustomMarker(opts) {
    this.setValues(opts);
}

CustomMarker.prototype.draw = function() {
    var self = this;
    var div = this.div;
    if (!div) {
        div = this.div = $('' +
            '<div>' +
            // '<div class="pulse-box">' +
            '<svg class="pulse-svg">' +
            '<circle class="circle first-circle" fill="#FF0000" cx="10" cy="10" r="10"></circle>' +
            '<circle class="circle second-circle" fill="#FF0000" cx="10" cy="10" r="10"></circle>' +
            '<circle class="circle third-circle" fill="#FF0000" cx="10" cy="10" r="10"></circle>' +
            '<circle class="circle" fill="#FF0000" cx="10" cy="10" r="10"></circle>' +
            '</svg>' +
            // '</div>' +
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
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#f5f5f5"
                }
              ]
            },
            {
              "elementType": "labels.icon",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#616161"
                }
              ]
            },
            {
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#f5f5f5"
                }
              ]
            },
            {
              "featureType": "administrative.country",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#263238"
                },
                {
                  "weight": 1
                }
              ]
            },
            {
              "featureType": "administrative.land_parcel",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#bdbdbd"
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
              "featureType": "administrative.land_parcel",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#bdbdbd"
                }
              ]
            },
            {
              "featureType": "administrative.province",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#263238"
                },
                {
                  "weight": 0.5
                }
              ]
            },
            {
              "featureType": "landscape.natural.terrain",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#bfc2cb"
                }
              ]
            },
            {
              "featureType": "landscape.natural.terrain",
              "elementType": "geometry.stroke",
              "stylers": [
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
                  "color": "#eeeeee"
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
              "featureType": "poi",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#e5e5e5"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#9e9e9e"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#ffffff"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#ffffff"
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
              "featureType": "road.arterial",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#dadada"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#ffffff"
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
                  "weight": 0.5
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
              "featureType": "road.highway",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#616161"
                }
              ]
            },
            {
              "featureType": "road.local",
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
              "featureType": "road.local",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#9e9e9e"
                }
              ]
            },
            {
              "featureType": "transit",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "transit.line",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#e5e5e5"
                }
              ]
            },
            {
              "featureType": "transit.station",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#eeeeee"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#c9c9c9"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#9e9e9e"
                }
              ]
            }
          ]
    });
    var marker2 = new CustomMarker({
        position: new google.maps.LatLng(9.839190796211385, -83.98526430130005),
        map: map,
        icon : {
            anchor: new google.maps.Point(10, 10),
            size: new google.maps.Size(20, 20),
        }
    });
    var allSeisms = [],
        url = 'http://rsnapiusr.ucr.ac.cr/api/seisms/' +
            'getWebMapSeisms' +
            '?access_token=559aca63553be4973f58dbc1',
        addMarkers = function(seisms) {
            var icon1 = '../map-test/icons/1.svg',
                icon2 = '../map-test/icons/2.svg',
                icon3 = '../map-test/icons/3.svg',
                icon4 = '../map-test/icons/4.svg',
                icon5 = '../map-test/icons/5.svg',
                icon6 = '../map-test/icons/6.svg',
                icon7 = '../map-test/icons/7.svg',
                icon8 = '../map-test/icons/8.svg',
                icon9 = '../map-test/icons/9.svg',
                icon10 = '../map-test/icons/10.svg';
            seisms.forEach(function(seism, index, arr) {
                var icon = icon1;
                switch(seism.properties.intensity) {
                    case 1:
                        icon = icon1;
                        break;
                    case 2:
                        icon = icon2;
                        break;
                    case 3:
                        icon = icon3;
                        break;
                    case 4:
                        icon = icon4;
                        break;
                    case 5:
                        icon = icon5;
                        break;
                    case 6:
                        icon = icon6;
                        break;
                    case 7:
                        icon = icon7;
                        break;
                    case 8:
                        icon = icon8;
                        break;
                    case 9:
                        icon = icon9;
                        break;
                    case 10:
                        icon = icon10;
                        break;
                }
                var marker = new SVGMarker({
                    map: map,
                    position: new google.maps.LatLng(seism.geometry.coordinates[1], seism.geometry.coordinates[0]),
                    title: seism.local,
                    icon: {
                         anchor: new google.maps.Point(12.5, 35),
                         size: new google.maps.Size(25, 35),
                         url: icon
                     }
                });           
            });
        };
    function getSeisms(){
        $.getJSON('https://raw.githubusercontent.com/amedesc/map-test/master/map_18nov.geojson', function (result)  {
            allSeisms = result.features;
            addMarkers(allSeisms);
        }, function(error) {
            console.error(error);
        });
    }
    getSeisms();
});
