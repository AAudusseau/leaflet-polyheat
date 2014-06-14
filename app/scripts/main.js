var map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer.provider('OpenStreetMap.BlackAndWhite').addTo(map);

$.getJSON('../data/polygons.json', function(polygons) {
  L.geoJson(polygons).addTo(map);
});
