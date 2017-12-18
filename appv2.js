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
   //         '<div class="shadow"></div>' +
            '<div class="pulse"></div>' +
   //         '<div class="pin-wrap">' +
   //         '<div class="pin"></div>' +
            '</div>' +
            '</div>' +
            '')[0];
   //     this.pinWrap = this.div.getElementsByClassName('pin-wrap');
   //     this.pin = this.div.getElementsByClassName('pin');
        this.pinShadow = this.div.getElementsByClassName('shadow');
        div.style.position = 'absolute';
        div.style.cursor = 'pointer';
        var panes = this.getPanes();
        panes.overlayImage.appendChild(div);
        google.maps.event.addDomListener(div, "click", function(event) {
            google.maps.event.trigger(self, "click", event);
        });
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
              'featureType': 'administrative.country',
              'elementType': 'geometry.stroke',
              'stylers': [
                {
                  'color': '#263238'
                },
                {
                  'weight': 1
                }
              ]
            },
            {
              'featureType': 'administrative.land_parcel',
              'elementType': 'geometry.fill',
              'stylers': [
                {
                  'visibility': 'off'
                }
              ]
            },
            {
              'featureType': 'administrative.land_parcel',
              'elementType': 'labels',
              'stylers': [
                {
                  'visibility': 'off'
                }
              ]
            },
            {
              'featureType': 'administrative.province',
              'elementType': 'geometry.stroke',
              'stylers': [
                {
                  'color': '#546e7a'
                },
                {
                  'weight': 0.5
                }
              ]
            },
            {
              'featureType': 'landscape.natural.terrain',
              'elementType': 'geometry.fill',
              'stylers': [
                {
                  'color': '#b3d09c'
                }
              ]
            },
            {
              'featureType': 'poi',
              'elementType': 'labels.text',
              'stylers': [
                {
                  'visibility': 'off'
                }
              ]
            },
            {
              'featureType': 'road.arterial',
              'elementType': 'labels',
              'stylers': [
                {
                  'visibility': 'off'
                }
              ]
            },
            {
              'featureType': 'road.highway',
              'elementType': 'geometry.fill',
              'stylers': [
                {
                  'color': '#ffffff'
                },
                {
                  'weight': 1
                }
              ]
            },
            {
              'featureType': 'road.highway',
              'elementType': 'geometry.stroke',
              'stylers': [
                {
                  'color': '#ffffff'
                },
                {
                  'visibility': 'off'
                },
                {
                  'weight': 0.5
                }
              ]
            },
            {
              'featureType': 'road.highway',
              'elementType': 'labels',
              'stylers': [
                {
                  'visibility': 'off'
                }
              ]
            },
            {
              'featureType': 'road.highway.controlled_access',
              'elementType': 'geometry.stroke',
              'stylers': [
                {
                  'visibility': 'off'
                }
              ]
            },
            {
              'featureType': 'road.local',
              'stylers': [
                {
                  'visibility': 'off'
                }
              ]
            },
            {
              'featureType': 'road.local',
              'elementType': 'labels',
              'stylers': [
                {
                  'visibility': 'off'
                }
              ]
            },
            {
              'featureType': 'transit',
              'stylers': [
                {
                  'visibility': 'off'
                }
              ]
            },
            {
              'featureType': 'water',
              'elementType': 'geometry.fill',
              'stylers': [
                {
                  'color': '#9fd1ff'
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
            var normalIcon = '../map-test/icons/pin_verde.svg',
                midIcon = '../map-test/icons/pin_naranja.svg',
                dangerIcon ='../map-test/icons/pin_rojo.svg';
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
                    title: seism.local,
                    icon: {
                         anchor: new google.maps.Point(8.5, 51),
                         size: new google.maps.Size(17, 51),
                         url: icon
                     }
                });
                if (index===1){
                  var markerPulse = new CustomMarker({
                      position: new google.maps.LatLng(seism.lat, seism.lon),
                      map: map,
                  });   
              }              
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
