var map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer.provider('OpenStreetMap.BlackAndWhite').addTo(map);

$.getJSON('../data/polygons.json', function(polygons) {
  L.geoJson(polygons).addTo(map);
});

// depends also of the map size element
var step = 10;

var heatmap = new L.TileLayer.WebGLHeatMap({
  size: 1000,
  autoresize: true
});

map.addLayer(heatmap);

map.on('moveend', function () {

  heatmap.clearData();

  var bounds = map.getBounds();
  var northEast = bounds.getNorthEast();
  var northWest = bounds.getNorthWest();
  var southEast = bounds.getSouthEast();

  var xDist = Math.abs(northEast.lng - northWest.lng);
  var yDist = Math.abs(northEast.lat - southEast.lat);
  console.log('dim:', xDist, yDist);

  var xStep = xDist / step;
  var yStep = yDist / step;
  console.log('steps:', xStep, yStep);

  var minLng, minLat, maxLng, maxLat;

  if ((northEast.lng - northWest.lng) > 0) {
    minLng = northWest.lng;
    maxLng = northEast.lng;
  }
  else {
    minLng = northEast.lng;
    maxLng = northWest.lng;
  }

  if ((northEast.lat - southEast.lat) > 0) {
    minLat = southEast.lat;
    maxLat = northEast.lat;
  }
  else {
    minLat = northEast.lat;
    maxLat = southEast.lat;
  }

  console.log(minLng, maxLng);
  console.log(minLat, maxLat);

  heatmap.options.size = xStep * 100000; 

  for (var x = minLng; x <= maxLng; x += xStep) {
    for (var y = minLat; y <= maxLat; y += yStep) {
      heatmap.addDataPoint(y, x, 100);
      heatmap.update();
    }
  }

});
