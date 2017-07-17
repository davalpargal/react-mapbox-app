var mymap = L.map('mapid').setView([12.9716, 77.5946], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiYWJoaW5hdnJhaSIsImEiOiJjajU3YTduZjMwdjA5MnlwaHU0bnoweDNrIn0.b43RguKtcWbMVJP6jilW6w'
}).addTo(mymap);

var pointA = new L.LatLng(12.9604, 77.64163);
var pointB = new L.LatLng(12.93838, 77.63263);
var pointC = new L.LatLng(12.8604, 77.66163)
var pointList = [pointA, pointB];
pointList.push(pointC);
console.log(L.Polyline);

var line = new L.polyline(pointList,{snakingSpeed: 200});
line.addTo(mymap).snakeIn();


