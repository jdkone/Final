/* =====================
 Leaflet setup - feel free to ignore this
===================== */

var customIcon = L.icon({
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

      /* var slide1 = function(parsedPoints) { return false; };
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
*/

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
