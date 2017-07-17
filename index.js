'use strict';

var mymap = L.map('mapid').setView([12.9716, 77.5946], 12);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiYWJoaW5hdnJhaSIsImEiOiJjajU3YTduZjMwdjA5MnlwaHU0bnoweDNrIn0.b43RguKtcWbMVJP6jilW6w'
}).addTo(mymap);

var nextPos = function (k){
    if (Math.random()>0.5)
      return k+(Math.random()/100);
    else return k-(Math.random()/100);
 // return k+0.01;

}
var bikeIcon = L.icon({
    iconUrl: 'motorbike.svg',
    iconSize: [15, 30], // size of the icon
});


const balancingFactor = 140/450;

var total_drivers = 5;
var trails = 10000;

var driver = {
  id: null,
  curLat: null,
  curLng: null,
  lines: [],
  onRide: null,
  requests: 0,
  sumRides: 0,
  interval: null,
  nextPingTime: null,
  flag: 0,
  isOnMap: false,
  getRideStatus: function(){
    if (Math.random() > 0.3){
      this.onRide = true;
    }
    else this.onRide = false;
    return this.onRide;
  },
  changeLat: function(){
    this.curLat = nextPos(this.curLat);
  },
  changeLng: function(){
    this.curLng = nextPos(this.curLng);
  },
  changeState: function(){
    var scope = this;
    scope.interval = setInterval(function(){
      scope.isOnMap = true;
      if (scope.lines.length >= trails){
        let lineToRemove = scope.lines[0];
        scope.lines.shift();
        lineToRemove.remove();
      }
      scope.requests += 1;
      let prevLatLng = new L.LatLng(scope.curLat,scope.curLng);
      scope.changeLat();
      scope.changeLng();
      let newLatLng = new L.LatLng(scope.curLat,scope.curLng);
      let color;
      if (scope.onRide){
        color="#00FFFF";}
      else {
        color="#9D00FF";
      }
      scope.flag += 1;
      if (scope.flag > 7){
        scope.flag = 0;
        if (scope.getRideStatus()){
          color="#00FFFF";
          scope.sumRides+=8;
        }
        else color = "#9D00FF";
      }
      var line = new L.polyline([prevLatLng,newLatLng],{snakingSpeed: balancingFactor * scope.nextPingTime });
      line.setStyle({
        color: color,
        opacity: 0.5,
        weight: 2
      });
      var marker = L.Marker.movingMarker(line.getLatLngs(),[scope.nextPingTime],{
        icon: bikeIcon
      }).addTo(mymap);

      marker.start();
      line.addTo(mymap).snakeIn();
      scope.lines.push(line);
      marker.on('end', function() {
        marker.remove();
      });
    },scope.nextPingTime)
  },
  set: function(id,curLat,curLng,onRide,nextPingTime){
    this.id = id;
    this.curLat = curLat;
    this.curLng = curLng;
    this.onRide = onRide;
    this.nextPingTime = nextPingTime;
  }
};

var drivers = [];

for (var i=0;i<total_drivers;i++){
  var obj = $.extend(true, {}, driver);
  obj.set(i,nextPos(12.9716),nextPos(77.5946),false,500*Math.ceil((Math.random()*10)));
  drivers.push(obj);
}

for (var i=0;i<total_drivers;i++){
  drivers[i].changeState();
}
var dataShowInterval = setInterval(function(){showData();},500);

var showData = function(){
  let activeOnMap = 0;
  let driversOnRide = 0;
  let percentActive = 0;
  for(var i=0;i<total_drivers;i++){
    if(drivers[i].onRide){
      driversOnRide+=1;
    }
    if (drivers[i].isOnMap){
      activeOnMap += 1;
    }
    percentActive += (drivers[i].sumRides/drivers[i].requests);
  }
  document.getElementById('total_drivers').innerHTML = activeOnMap;
  document.getElementById('onRide_drivers').innerHTML = driversOnRide;
  document.getElementById('percentActive').innerHTML = (percentActive/total_drivers)*100;
}




