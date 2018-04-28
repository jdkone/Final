mapboxgl.accessToken = 'pk.eyJ1IjoianVrb25lIiwiYSI6ImNqZmQ3NHJoMTFpYjQycW1zNjRtaDk4cncifQ.vW4XKi58xHwWOSJIqCs_9Q';
var map = new mapboxgl.Map({
    container: 'map',
    style: {
        "version": 8,
        "sources": {
            "simple-tiles": {
                "type": "raster",
                "tiles": [
                    "http://a.tile.stamen.com/toner/{z}/{x}/{y}.png",
                    "http://b.tile.stamen.com/toner/{z}/{x}/{y}.png",
                    "http://c.tile.stamen.com/toner/{z}/{x}/{y}.png",
                    "http://d.tile.stamen.com/toner/{z}/{x}/{y}.png"
                ],
                "tileSize": 256
            }
        },
        "layers": [{
            "id": "simple-tiles",
            "type": "raster",
            "source": "simple-tiles",
            "minzoom": 0,
            "maxzoom": 19
        }]
    },
    zoom: 9,
    center: [-104.597717, 39.728894]
});

map.on('load', function() {
  map.addLayer({
    "id": "drugCrime",
    "type": "heatmap",
    "source": {
      "type": "vector",
      "tiles": ["https://s3.amazonaws.com/cpln-nathan/{z}/{x}/{y}.pbf"],
      "minzoom": 0,
      "maxzoom": 19
    },
    "source-layer": "drugCrime",
    "paint": {
      "heatmap-color": [
          "interpolate",
          ["linear"],
          ["heatmap-density"],
          0, "#F28CD3",
          0.2, "#D762A6",
          0.4, "#BE4483",
          0.6, "#9A3F73",
          0.8, "#753962",
          1, "#562B51"
      ],
      "heatmap-opacity": 0.75,
  }
});

  const data = "https://raw.githubusercontent.com/jdkone/Final/master/marijuana_licenses_geo.geojson?token=AhvfewGC5LM0zCRbfX5ACbE8ZYibPjWLks5a7L-_wA%3D%3D";

  map.addSource("sourcey", {
     		"type": "geojson",
      	"data": data
    });

	map.loadImage("https://raw.githubusercontent.com/jdkone/Final/master/pot_leaf.png?token=Ahvfe5Ezbo7_gHtUOaKef_pgoMUGDziOks5a7hVAwA%3D%3D", (error, data) => {
    if(error){
      alert("wellllllll well well");
    }

    map.addImage("icon", data);

    map.addLayer({
      id: 'iconLayer',
      type: "symbol",
      source: 'sourcey',
      layout: {
        'icon-image': 'icon',
        'icon-allow-overlap': true,
        'icon-ignore-placement': true,
        'icon-size': 0.1
      }
    });
  });
});

map.addControl(new mapboxgl.NavigationControl());


/*map.on('load', function() {

  map.addSource('drugcrime'{
    "type": "vector",
    "data": {
      "type": "vector",
      "tiles": ["https://s3.amazonaws.com/cpln-nathan/{z}/{x}/{y}.pbf"],
      "minzoom": 0,
      "maxzoom": 19
      }
    });
//FOR HEATMAP, COPY NATHANS CODE AGAIN, THEN CHANGE TYPE TO HEATMAP AND REMOVE COLOR
    map.addLayer({
        "id": "drugcrime-heat",
        "type": "heatmap",
        "source": "drugcrime",
        "maxzoom": 9,
        "paint": {
            // Increase the heatmap weight based on frequency and property magnitude
            "heatmap-weight": [
                "interpolate",
                ["linear"],
                ["get", "mag"],
                0, 0,
                6, 1
            ],
            // Increase the heatmap color weight weight by zoom level
            // heatmap-intensity is a multiplier on top of heatmap-weight
            "heatmap-intensity": [
                "interpolate",
                ["linear"],
                ["zoom"],
                0, 1,
                9, 3
            ],
            // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
            // Begin color ramp at 0-stop with a 0-transparancy color
            // to create a blur-like effect.
            "heatmap-color": [
                "interpolate",
                ["linear"],
                ["heatmap-density"],
                0, "#F28CD3",
                0.2, "#D762A6",
                0.4, "#BE4483",
                0.6, "#9A3F73",
                0.8, "#753962",
                1, "#562B51"
            ],
            // Adjust the heatmap radius by zoom level
            "heatmap-radius": [
                "interpolate",
                ["linear"],
                ["zoom"],
                0, 2,
                9, 20
            ],
            // Transition from heatmap to circle layer by zoom level
            "heatmap-opacity": [
                "interpolate",
                ["linear"],
                ["zoom"],
                7, 1,
                9, 0
            ],
        }
    }, 'waterway-label');

    map.addLayer({
        "id": "drugcrime-point",
        "type": "circle",
        "source": "drugcrime",
        "minzoom": 7,
        "paint": {
            // Size circle radius by earthquake magnitude and zoom level
            "circle-radius": [
                "interpolate",
                ["linear"],
                ["zoom"],
                7, [
                    "interpolate",
                    ["linear"],
                    ["get", "mag"],
                    1, 1,
                    6, 4
                ],
                16, [
                    "interpolate",
                    ["linear"],
                    ["get", "mag"],
                    1, 5,
                    6, 50
                ]
            ],
            // Color circle by earthquake magnitude
            "circle-color": [
                "interpolate",
                ["linear"],
                ["get", "mag"],
                1, "#F28CD3",
                2, "#D762A6",
                3, "#BE4483",
                4, "#9A3F73",
                5, "#753962",
                6, "#562B51"
            ],
            //"circle-stroke-color": "white",
            //"circle-stroke-width": 1,
            // Transition from heatmap to circle layer by zoom level
            "circle-opacity": [
                "interpolate",
                ["linear"],
                ["zoom"],
                7, 0,
                8, 1
            ]
        }
    }, 'waterway-label');
});

*/









/*var customIcon = L.icon({
    iconUrl: 'pot_leaf.png',
    shadowUrl: null,
    iconSize:     [95, 95], // size of the icon
    shadowSize:   null, // size of the shadow
    iconAnchor:   [22, 22], // point of the icon which will correspond to marker's location
    shadowAnchor: null,  // the same for the shadow
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});

var markerOptions = { icon: customIcon };  // An options object

var map = L.map('map', {
  center: [39.738662, -104.836606],
  zoom: 7
});
var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

var pointData = 'https://raw.githubusercontent.com/jdkone/OST4GIS-Midterm/master/marijuana_licenses_geo1.geojson';
var parsedPoints;
var markerArray = [];

var slide1 = function(parsedPoints) { return false; };
var slide2 = function(parsedPoints) {
  _.each(parsedPoints, function(item) { if (item.properties.Year === "2010"|"2011"|"2012"|"2013"|"2014") {
     markerArray.push(L.marker([item.geometry.coordinates[1] , item.geometry.coordinates[0]], markerOptions));
  }});
  _.each(markerArray, function(mark) {
    mark.addTo(map, {
      setZoom: 11 });
    });
};
var slide3 = function(parsedPoints) {
  _.each(parsedPoints, function(item) { if (item.properties.Year === "2010"|"2011"|"2012"|"2013"|"2014"|"2015") {
     markerArray.push(L.marker([item.geometry.coordinates[1] , item.geometry.coordinates[0]], markerOptions));
  }});
  _.each(markerArray, function(mark) {
    mark.addTo(map);
  });
};
var slide4 = function(parsedPoints) {
  _.each(parsedPoints, function(item) { if (item.properties.Year === "2010"|"2011"|"2012"|"2013"|"2014"|"2015"|"2016") {
     markerArray.push(L.marker([item.geometry.coordinates[1] , item.geometry.coordinates[0]], markerOptions));
  }});
  _.each(markerArray, function(mark) {
    mark.addTo(map);
  });
};
var slide5 = function(parsedPoints) {
  _.each(parsedPoints, function(item) { if (item.properties.Year === "2010"|"2011"|"2012"|"2013"|"2014"|"2015"|"2016"|"2017") {
     markerArray.push(L.marker([item.geometry.coordinates[1] , item.geometry.coordinates[0]], markerOptions));
  }});
  _.each(markerArray, function(mark) {
    mark.addTo(map);
  });
};

downloadData = $.ajax(pointData);
downloadData.done(function(points) {
  parsedPoints = JSON.parse(points);

      var slide1 = function(parsedPoints) { return false; };
     var slide2 = function(parsedPoints) {_.each(parsedPoints, function(item) { if (item.properties.Year === "2010"|"2011"|"2012"|"2013"|"2014") {
           markerArray.push(L.marker([item.geometry.coordinates[1] , item.geometry.coordinates[0]], markerOptions));
           var plotMarkers = function(markerArray) {
             _.each(markerArray, function(mark) {
              mark.addTo(map);
            });
          };
         }
       });
     };

      var slide3 = function(parsedPoints) {_.each(parsedPoints, function(item) { if (item.properties.Year === "2010"|"2011"|"2012"|"2013"|"2014"|"2015") {
          markerArray.push(L.marker([item.geometry.coordinates[1] , item.geometry.coordinates[0]], markerOptions));
          var plotMarkers = function(array) {
            _.each(array, function(mark) {
             mark.addTo(map);
           });
         };
        }
      });
    };

      var slide4 = function(parsedPoints) {_.each(parsedPoints, function(item) { if (item.properties.Year === "2010"|"2011"|"2012"|"2013"|"2014"|"2015"|"2016") {
          markerArray.push(L.marker([item.geometry.coordinates[1] , item.geometry.coordinates[0]], markerOptions));
          var plotMarkers = function(array) {
            _.each(array, function(mark) {
             mark.addTo(map);
           });
         };
        }
      });
    };
      var slide5 = function(parsedPoints) {_.each(parsedPoints, function(item) { if (item.properties.Year === "2010"|"2011"|"2012"|"2013"|"2014"|"2015"|"2016"|"2017") {
          markerArray.push(L.marker([item.geometry.coordinates[1] , item.geometry.coordinates[0]], markerOptions));
          var plotMarkers = function(array) {
            _.each(array, function(mark) {
             mark.addTo(map);
           });
         };
        }
      });
    };


var slideDeck = [slide1, slide2, slide3, slide4, slide5];

var i = 0;
showSlide(0);
slide1();
$('#slide1').show();
$('#slide2').hide();
$('#slide3').hide();
$('#slide4').hide();
$('#slide5').hide();

$('#prev').click(function(){
    i--;
    showSlide(i);
    switch (i) {
      case 0:
        $('#slide2').hide();
        $('#slide1').show();
        slide1(parsedPoints);
        break;
      case 1:
        $('#slide3').hide();
        $('#slide2').show();
        slide2(parsedPoints);
        break;
      case 2:
        $('#slide4').hide();
        $('#slide3').show();
        slide3(parsedPoints);
        break;
      case 3:
        $('#slide5').hide();
        $('#slide4').show();
        slide4(parsedPoints);
        break;
      case 4:
        $('#slide5').show();
        slide5(parsedPoints);
        break;
     default:
       $('#slide5').show();
       slide5(parsedPoints);
  }
});

$('#next').click(function(){
    i++;
    showSlide(i);
    switch (i) {
      case 0:
        $('#slide1').show();
        slide1(parsedPoints);
        break;
      case 1:
        $('#slide1').hide();
        $('#slide2').show();
        slide2(parsedPoints);
        break;
      case 2:
        $('#slide2').hide();
        $('#slide3').show();
        slide3(parsedPoints);
        break;
      case 3:
        $('#slide3').hide();
        $('#slide4').show();
        slide4(parsedPoints);
        break;
      case 4:
        $('#slide4').hide();
        $('#slide5').show();
        slide5(parsedPoints);
        break;
     default:
       $('#slide1').show();
       slide1(parsedPoints);
  }
});

function showSlide(i) {
    $('#slide_holder').empty();
    $('#slide_holder').append(slideDeck[i]);

    if(i == 0)
        $('#prev').hide();
    else
        $('#prev').show();

    if(i == slideDeck.length-1)
        $('#next').hide();
    else
        $('#next').show();
}
});
*/
