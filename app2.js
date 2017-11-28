var allSeisms = [],
url = 'http://rsnapiusr.ucr.ac.cr/api/seisms/' +
    'getWebMapSeisms' +
    '?access_token=559aca63553be4973f58dbc1',
map = new GMaps({
    div: '#map',
    width: '100%',
    height: '100%',
    lat: 9.4,
    lng: -84.00,
    zoom: 8
}),
addMarkers = function(seisms) {
    map.removeMarkers();
    var normalIcon = require('./normal-marker.png'),
        midIcon = require('./mid-marker.png'),
        dangerIcon = require('./danger-marker.png'),
        newestNormalIcon = require('./newest-normal-marker.png'),
        newestMidIcon = require('./newest-mid-marker.png'),
        newestDangerIcon = require('./newest-danger-marker.png');
    seisms.forEach(function(seism, index, arr) {
        var time = moment.tz(seism['origin_time'].toString().replace('Z','+06:00'), "America/Costa_Rica").format('DD-MM-YYYY h:mm a')
        seism.localDateTime = time;
        if(index === 0) {
            $('[data-latest-seism="localDateTime"]')
                .text(seism.localDateTime);
            $('[data-latest-seism="magnitude"]')
                .text(seism.magnitude + ' Mw');
            $('[data-latest-seism="depth"]')
                .text(seism.depth + ' km');
            $('[data-latest-seism="lat"]')
                .text(Math.abs(seism.lat) + (seism.lat < 0?' S': ' N'));
            $('[data-latest-seism="lon"]')
                .text(Math.abs(seism.lon) + (seism.lat < 0?' E': ' O'));
            $('[data-latest-seism="local"]')
                .text(seism.local);
        }
        var icon = index === 0? newestNormalIcon : normalIcon;
        if(seism.magnitude > 3.5) {
            icon = index === 0? newestMidIcon : midIcon;
        }
        if(seism.magnitude >= 5) {
            icon = index === 0? newestDangerIcon : dangerIcon;
        }

        var markerObj = {
            lat: seism.lat,
            lng: seism.lon,
            title: seism.local,
            icon: icon,
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
        };

        if (index === 0) {
            markerObj.zIndex = 9999999;
        }

        map.addMarker(markerObj);

        if (index === 0 ) {
            var div = map.getDiv();
            map.panTo(new google.maps.LatLng(seism.lat , seism.lon));
            if (width <= 640) {
                map.setZoom(10);
                map.panBy(div.offsetWidth/45, div.offsetHeight/45);
            }else if (width >= 1280) {
                map.setZoom(8);
                map.panBy(div.offsetWidth/10, div.offsetHeight/10);
            }else {
                map.setZoom(9);
                map.panBy(div.offsetWidth/8, div.offsetHeight/8);
            }

        }
        if (index+1 === seisms.length) {
            $('.loader').css('display', 'none');
            (map.markers[0].infoWindow).open(map.map,map.markers[0]);
        }
    });
};

$('#filter_button').on('click', function(){
var values = {};
var filterData;
$('.loader').css('display', 'block');
$.each($('#filter_form').serializeArray(), function(i, field) {
        values[field.name] = field.value;
});
console.log(values);
usingFilters = true;

if(values.minD.length > 2 || values.maxD.length > 2){

    var minD;
    var maxD;

    if(values.minD.length > 2){
        minD = moment(values.minD).hour(0).minute(0).second(0).millisecond(0).add(6, 'hours').format('YYYY-MM-DDTHH:mm:ss-06:00');
    }

    if(values.maxD.length > 2){
        if(minD != undefined){
            maxD = moment(values.maxD).hour(0).minute(0).second(0).millisecond(0).add(6, 'hours').format('YYYY-MM-DDTHH:mm:ss-06:00');
        }else{
            minD = moment(values.maxD).hour(0).minute(0).second(0).millisecond(0).add(6, 'hours').format('YYYY-MM-DDTHH:mm:ss-06:00');
            maxD = moment(values.maxD).hour(0).minute(0).second(0).millisecond(0).add(6, 'hours').add(1,'days').format('YYYY-MM-DDTHH:mm:ss-06:00');
        }
    }else{
        maxD = moment(values.minD).hour(0).minute(0).second(0).millisecond(0).add(6, 'hours').add(1,'days').format('YYYY-MM-DDTHH:mm:ss-06:00');
    }

    if(values.minLat > 1 || values.maxLat > 1 || values.minLon > 1 || values.maxLon > 1){

        if(values.minLat == 0){
            values.minLat = 5;
        }
        if(values.maxLat == 0){
            values.maxLat = 13;
        }
        if(values.minLon == 0){
            values.minLon = -88;
        }
        if(values.maxLon == 0){
            values.maxLon = -81;
        }
        var data = {
            minD: minD,
            maxD: maxD,
            minLat: values.minLat,
            maxLat: values.maxLat,
            minLon: values.minLon,
            maxLon: values.maxLon
        };
        var postURL = 'http://rsnapiusr.ucr.ac.cr/api/seisms/' + 'getDateGeo'+
            '?access_token=559aca63553be4973f58dbc1&request='+JSON.stringify(data);
        console.log(postURL);
        $.getJSON(postURL).then(function(result) {
            userFilters(result.seisms, values);
            if(isShowing1524hr){
                isShowing1524hr = false;
                $('.filter').hide();
            }
        }, function(error) {
            console.error(error);
        });
    }else{
        var data = {
            minD: minD,
            maxD: maxD
        };
        var postURL = 'http://rsnapiusr.ucr.ac.cr/api/seisms/' + 'getFilteredData'+
            '?access_token=559aca63553be4973f58dbc1&dates='+JSON.stringify(data);
        console.log(postURL);
        $.getJSON(postURL).then(function(result) {
            userFilters(result.seisms, values);
            if(isShowing1524hr){
                isShowing1524hr = false;
                $('.filter').hide();
            }
        }, function(error) {
            console.error(error);
        });
    }
}else if(values.minLat > 1 || values.maxLat > 1 || values.minLon > 1 || values.maxLon > 1){
    if(values.minLat == 0){
        values.minLat = 5;
    }
    if(values.maxLat == 0){
        values.maxLat = 13;
    }
    if(values.minLon == 0){
        values.minLon = -88;
    }
    if(values.maxLon == 0){
        values.maxLon = -81;
    }
    var data = {
        minLat: values.minLat,
        maxLat: values.maxLat,
        minLon: values.minLon,
        maxLon: values.maxLon
    };
    var postURL = 'http://rsnapiusr.ucr.ac.cr/api/seisms/' + 'getFilteredGPS'+
        '?access_token=559aca63553be4973f58dbc1&geo='+JSON.stringify(data);
    console.log(postURL);
    $.getJSON(postURL).then(function(result) {
        userFilters(result.seisms, values);
        if(isShowing1524hr){
            isShowing1524hr = false;
            $('.filter').hide();
        }
    }, function(error) {
        console.error(error);
    });
}else{
    if(currentFilter === 2){
        var twentyFourHoursAgo = moment()
            .utcOffset('-06:00')
            .add(-24, 'hours')
            .unix();
        filterData =  allSeisms.filter(function(seism, index, arr) {
            return moment(seism['origin_time'].replace('Z', '+06:00'))
                    .unix() >= twentyFourHoursAgo;
        });
    }else{
        filterData = allSeisms;
    }
    if(!isShowing1524hr){
        $('.filter').show();
        isShowing1524hr = true;
    }
    userFilters(filterData, values);
}

});


function userFilters(filterData, values){

var minMag = parseFloat(values.minMag);
var maxMag = parseFloat(values.maxMag);
var minDepth = parseFloat(values.minDepth);
var maxDepth = parseFloat(values.maxDepth);

var sism = new Array();

_(filterData).forEach(function(sismo, key){
    if(parseFloat(sismo.magnitude) >= minMag || minMag == 0){
        if(parseFloat(sismo.magnitude) <= maxMag || maxMag == 0){
            if(parseFloat(sismo.depth) >= minDepth || minDepth == 0){
                if(parseFloat(sismo.depth) <= maxDepth || maxDepth == 0){
                    sism.push(sismo);
                }
            }
        }

    }
    if(key+1 == filterData.length){
        addMarkers(sism);
    }
});
}

$('.button-collapse').sideNav({
menuWidth: 280
});
$('.filter').click(function(eventObject) {
var $this = $(this);

if($this.hasClass('active')) return;

$('.active').removeClass('active');

if(usingFilters){
    var values = {};
    $.each($('#filter_form').serializeArray(), function(i, field) {
        values[field.name] = field.value;
    });
    if($this.hasClass('week-filter')) {
        currentFilter = 1;
        userFilters(values);
    } else {
        currentFilter = 2;
        userFilters(values);
    }
}else{
    if($this.hasClass('week-filter')) {
        addMarkers(allSeisms);
        currentFilter = 1;
    } else {
        currentFilter = 2;
        var twentyFourHoursAgo = moment()
            .utcOffset('-06:00')
            .add(-24, 'hours')
            .unix();
        addMarkers(allSeisms.filter(function(seism, index, arr) {
            return moment(seism['origin_time'].replace('Z', '+06:00'))
                    .unix() >= twentyFourHoursAgo;
        }));
    }
}

$this.addClass('active');
});

$('#reset_button').on('click', function(){
$('#filter_form')[0].reset();
$('.loader').css('display', 'block');
usingFilters = false;
if(!isShowing1524hr){
    $('.filter').show();
    isShowing1524hr = true;
}
getSeisms();
});

getSeisms();

function getSeisms(){
$.get(url).then(function(result) {
        allSeisms = result.seisms;
        if (currentFilter === 1) {
            addMarkers(allSeisms);
        }else{
            var twentyFourHoursAgo = moment()
                .utcOffset('-06:00')
                .add(-24, 'hours')
                .unix();
            addMarkers(allSeisms.filter(function(seism, index, arr) {
                return moment(seism['origin_time'].replace('Z', '+06:00'))
                        .unix() >= twentyFourHoursAgo;
            }));
        }
}, function(error) {
    console.error(error);
});
}

function areDifferentByAnything(a, b) {
if (a.length !== b.length) {
    return true;
}
var key = 0;
while(key < a.length){
    var aB = a[key];
    var bB = b[key];

    var c = aB.magnitude;
    var d = bB.magnitude;

    var e = aB.depth;
    var f = bB.depth;

    var g = aB.lat;
    var h = bB.lat;

    var i = aB.lon;
    var j = bB.lon;


    if(c !== d){
        key === 1000000000;
        console.log('2. val: '+c+' val: '+d);
        return true;
    }

    if(e !== f){
        key === 1000000000;
        console.log('3. val: '+e+' val: '+f);
        return true;
    }

    if(g !== h){
        key === 1000000000;
        console.log('4. val: '+g+' val: '+h);
        return true;
    }

    if(i !== j){
        key === 1000000000;
        console.log('5. val: '+i+' val: '+j);
        return true;
    }

    key++;
}
return false;
}