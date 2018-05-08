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
    center: [-105.297717, 39.728894]
});

map.addControl(new mapboxgl.NavigationControl());

$(document).ready(function(){
  $('#sidebar').show();
  $('.dropdown-menu').hide();
  $('#dropdownMenuButton').on('click', function() {
    $('.dropdown-menu').show();
  });
  $('#crime').on('click', function() {
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
});
$('#mhv').on('click', function() {
  map.removeLayer("drugCrime");
  map.addSource("mhv", {
        "type": "geojson",
        "data": "https://s3.us-east-2.amazonaws.com/jdkonefinal/mhv.geojson"
    });
  map.addLayer({
    "id": "mhv",
    "type": "fill",
    "source": "mhv",
    "paint": {
      'fill-color': [
                'interpolate',
                ['linear'],
                ['get', 'mhv'],
                111000, '#F28CD3',
                196100, '#D762A6',
                261400, '#BE4483',
                331800, '#9A3F73',
                2500000, '#753962',
                4000000, '#562B51'
            ],
            'fill-opacity': 0.75
  }
});
});
  $('#cannabis').on('click', function() {
    const data = "https://raw.githubusercontent.com/jdkone/Final/master/marijuana_licenses_geo.geojson?token=AhvfewGC5LM0zCRbfX5ACbE8ZYibPjWLks5a7L-_wA%3D%3D";
    map.addSource("sourcey", {
       		"type": "geojson",
        	"data": data
      });
  	map.loadImage("https://raw.githubusercontent.com/jdkone/Final/master/pot_leaf.png?token=Ahvfe0moSQvjXT2GmB7kCLS340VLH51sks5a7hZOwA%3D%3D", (error, data) => {
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
          'icon-size': 0.02
        }
      });
    });
  });
});
