'use strict';

var mymap = L.map('mapid').setView([12.9716, 77.5946], 12);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    maxZoom: 18,
    id: 'mapbox.dark',
    accessToken: 'pk.eyJ1IjoiYWJoaW5hdnJhaSIsImEiOiJjajU3YTduZjMwdjA5MnlwaHU0bnoweDNrIn0.b43RguKtcWbMVJP6jilW6w'
}).addTo(mymap);

//var pointA = new L.LatLng(12.9604, 77.64163);
//var pointB = new L.LatLng(12.93838, 77.63263);
//var pointC = new L.LatLng(12.8604, 77.66163)
//var pointList = [pointA, pointB];

//pointList.push(pointC);
//console.log(L.Polyline);

//var line = new L.polyline(pointList,{snakingSpeed: 200});
//line.addTo(mymap).snakeIn();

var nextPos = function (k){
    if (Math.random()>0.5)
      return k+(Math.random()/1000);
    else return k-(Math.random()/1000);

}

var driver = {
  id: null,
  curLat: null,
  curLng: null,
  lines: [],
  onRide: null,
  nextPingTime: null,
  getRideStatus: function(){
    if (Math.random() > 0.5){
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
    setInterval(function(){
      //if (scope.lines.length > 4){
        //let lineToRemove = scope.lines[0];
        //scope.lines.shift();
        //lineToRemove.remove();
      //}
      console.log(scope.id);
      let prevLatLng = new L.LatLng(scope.curLat,scope.curLng);
      scope.changeLat();
      scope.changeLng();
      let newLatLng = new L.LatLng(scope.curLat,scope.curLng);
      let color;
      if (scope.getRideStatus()){
        color="#00FFFF";
      }
      else color = "#9D00FF";
      var line = new L.polyline([prevLatLng,newLatLng],{snakingSpeed: 140});
      line.setStyle({
        color: color
      });
      line.addTo(mymap).snakeIn();
      scope.lines.push(line);
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

for (var i=0;i<1;i++){
  var obj = $.extend(true, {}, driver);
  obj.set(i,12.9716,77.5946,false,2000);
  drivers.push(obj);
}

for (var i=0;i<1;i++){
  drivers[i].changeState();
}


