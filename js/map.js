"use strict"
var map;
var infowindow = new google.maps.InfoWindow;
var marker;

//revealing module pattern
var Coffee_shops = ko.observableArray([
    //var location = function (koTitle, title,latitude,longitude,streetAddress,website)
    new Location("Salt Lake Roasting Co", "Salt Lake Roasting Co", 40.7603327, -111.8817539, "320 E 400 S", "http://www.roasting.com/"),
    new Location("Blue Copper Coffee Room", "Blue Copper Coffee Room", 40.7497675, -111.8999455, "179 W 900 S", "http://bluecopperslc.com/"),
    new Location("Publik Coffee Roasters", "Publik Coffee Roasters", 40.747846,-111.893512, "975 S W Temple", "https://www.publikcoffee.com/"),
    new Location("Alchemy Coffee", "Alchemy Coffee", 40.733139,-111.879873, "390 E 1700 S", "http://www.alchemycoffee.com/"),
    new Location("Nostalgia", "Nostalgia", 40.766796,-111.883631,  " 248 E 100 S", "http://nostalgiacoffee.com/"),
    new Location("Millcreek Coffee Roasters", "Millcreek Coffee Roasters", 40.754951,-111.890677, "657 Main St", "http://www.millcreekcoffee.com/"),
    new Location("The Rose Establishment", "The Rose Establishment",  40.764005,-111.902221, "235 400 W", "http://www.theroseestb.com/")
]);

//display or hide list
function toggleList() {
  var listDisplay = document.getElementById("search");
  listDisplay.style.display = (listDisplay.style.display != "none" ? "none" : "" );
  var hideList_Message = document.getElementById("hideList");
  hideList_Message.innerHTML = (hideList_Message.innerHTML != "Hide List" ? "Hide List" : "Show List");
};

document.getElementById("hideList").addEventListener("click", toggleList);

//var filtCoffee_shops = ko.observableArray([]);

var viewModel = function vmInit() {
    "use strict";

    var searchTerm = ko.observable("");

    var filteredCoffee_shops = ko.computed(function () {
        var filter = searchTerm().toLowerCase();
        if (!filter) {
          makeMarkers(Coffee_shops());
            return Coffee_shops();
        } else {

        }
        //filter data
        var filtered = ko.utils.arrayFilter(Coffee_shops(), function (item) {
            var fields = ["koTitle"]; //we can filter several properties if needed
            var i = fields.length;
            while (i--) {
                var prop = fields[i];
                var strProp = ko.unwrap(item[prop]).toLowerCase();
                if (strProp.indexOf(filter) !== -1) {
                    return true;
                }
            }
            return false;
        });
        makeMarkers(filtered);
        return filtered;
    });


    return {
        searchTerm: searchTerm,
        Coffee_shops: filteredCoffee_shops,
    };
};

ko.applyBindings(viewModel);
  Coffee_shops.allMarkers = [];
  var Coffee_shops_allMarkers = Coffee_shops.allMarkers;
//map markers
function makeMarkers(filtered) {
  if (Coffee_shops_allMarkers) {
    Coffee_shops_allMarkers.forEach(function(marker){
    marker.setVisible(false)
  })

  Coffee_shops_allMarkers = [];
  if (!filtered) {
    filtered = Coffee_shops();
  }
  console.log('Coffee_shops().length :'+ filtered.length);
  for(var i = 0; i < filtered.length; i++) {
    marker = new google.maps.Marker({
    position: {lat: filtered[i].latitude(), lng: filtered[i].longitude()},
    map: map,
    animation: null,
    title: filtered[i].title,
  });

  Coffee_shops_allMarkers.push(marker); //push markers because Google Maps does not support this feature

  google.maps.event.addListener(Coffee_shops_allMarkers[i], "click", (function(Coffee_shops_allMarkers, i) {
    return function() {
      var contentString = "<h3>" + filtered[i].title + "</h3>" + "<h3>" + filtered[i].streetAddress + "</h3>" + "<img src='" +  + "'>" + "<h4>" + "website:" + "</h4>" + "<a href=" + "\"" +filtered[i].website + "\"" + "target=" + "\"" + "_blank" + "\"" + ">" + filtered[i].website + "</a>";
      infowindow.setContent(contentString);
      infowindow.open(map, Coffee_shops_allMarkers[i]);

      if (Coffee_shops_allMarkers[i].getAnimation() !== null) {
       Coffee_shops_allMarkers[i].setAnimation(null);
       infowindow.close(map, Coffee_shops_allMarkers[i]);
      } else  {
        Coffee_shops_allMarkers[i].setAnimation(google.maps.Animation.BOUNCE);
      }

      }
    })(Coffee_shops_allMarkers, i));
  };
  }

};

  function initMap() {

    var mapOptions = {
      zoom: 14,
      center: {lat: 40.75193, lng: -111.888198},
      disableDefaultUI: true,
      zoomControl: true,
      panControl: true,
      scaleControl: true,
      streetViewControl: true,
      overviewMapControl: true
    };
    map = new google.maps.Map(document.getElementById("mapDiv"), mapOptions);
    var initialCenter = mapOptions.center;
    var initialZoom = mapOptions.zoom;

    makeMarkers();

  }
  google.maps.event.addDomListener(window, "load", initMap);