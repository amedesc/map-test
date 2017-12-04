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
