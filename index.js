var mymap = L.map('mapid').setView([12.9716, 77.5946], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiYWJoaW5hdnJhaSIsImEiOiJjajU3YTduZjMwdjA5MnlwaHU0bnoweDNrIn0.b43RguKtcWbMVJP6jilW6w'
}).addTo(mymap);

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}

mymap.on('click', onMapClick);

var pointA = new L.LatLng(12.9604, 77.64163);
var pointB = new L.LatLng(12.93838, 77.63263);
var pointList = [pointA, pointB];

//var firstpolyline = new L.Polyline(pointList, {
    //color: 'red',
    //weight: 3,
    //opacity: 0.5,
    //smoothFactor: 1
//});
//firstpolyline.addTo(mymap);

var line = new L.polyline(pointList, {snakingPause: 200});
line.addTo(mymap).snakeIn();

d3.select(firstpolyline._path).transition().duration(10000)

