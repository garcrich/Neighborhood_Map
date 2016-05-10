var map;
var infowindow = new google.maps.InfoWindow;
var marker;


var banks = ko.observableArray([
    //var location = function (ko.title, title,latitude,longitude,streetAddress,website, setVisible)
    new Location("Idaho Central Credit Union - HQ", "Idaho Central Credit Union - HQ", 42.914059, -112.462819, "4400 Central Way", "https://www.iccu.com/", true),
    new Location("DL Evans Bank", "DL Evans Bank", 42.907624, -112.465672, "4080 Yellowstone Ave", "https://www.dlevans.com/"),
    new Location("Wells Fargo", "Wells Fargo", 42.909370, -112.466802, "4195 Yellowstone Ave", "https://www.wellsfargo.com/"),
    new Location("Idaho Central Credit Union - Chubbuck Branch", "Idaho Central Credit Union - Chubbuck Branch", 42.915882, -112.466823, "4537 Yellowstone Ave", "https://www.iccu.com/", true),
    new Location("Mountain America Credit Union", "Mountain America Credit Union", 42.911453, -112.464667,  "152 Bullock St", "https://www.macu.com", true),
    new Location("Idaho State University Credit Union", "Idaho State University Credit Union", 42.9227200, -112.4658335, "4914 Yellowstone Ave", "https://www.isucu.org/", true),
    new Location("Advantage Plus Credit Union", "Advantage Plus Credit Union", 42.920881, -112.468284, "150 W Chubbuck Rd", "https://advantagepluscreditunion.com", true),
    new Location("Pocatello Railroad Federal Credit", "Pocatello Railroad Federal Credit", 42.918957, -112.465726, "4708 Yellowstone Ave", "https://railswestcu.org", true)
]);

var viewModel = function vmInit() {
    "use strict";

    var searchTerm = ko.observable("");

    var filteredBanks = ko.computed(function () {
        var filter = searchTerm().toLowerCase();
        if (!filter) {
            return banks();
        }
        //filter data
        var filtered = ko.utils.arrayFilter(banks(), function (item) {
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
        return filtered;
    });


    return {
        searchTerm: searchTerm,
        banks: filteredBanks,
    };
};

ko.applyBindings(viewModel);

var allMarkers = [];
//map markers
function makeMarkers() {
  for(var i = 0; i < banks().length; i++) {
    marker = new google.maps.Marker({
    position: {lat: banks()[i].latitude(), lng: banks()[i].longitude()},
    map: map,
    title: banks()[i].title,
  });

  allMarkers.push(marker); //push markers because Google Maps does not support this feature

  google.maps.event.addListener(allMarkers[i], "click", (function(allMarkers, i) {
    return function() {
      contentString = "<h3>" + banks()[i].title + "<h3>" + "<h4>" + banks()[i].streetAddress + "</h4>" + "<a href=" + "\"" +banks()[i].website + "\"" + "target=" + "\"" + "_blank" + "\"" + ">" + banks()[i].website + "</a>";
      infowindow.setContent(contentString);
      infowindow.open(map, allMarkers[i]);

      if (allMarkers[i].getAnimation() !== null) {
       allMarkers[i].setAnimation(null);
       infowindow.close(map, allMarkers[i]);
      } else  {
        allMarkers[i].setAnimation(google.maps.Animation.BOUNCE);
      }

      }
    })(allMarkers, i));
  };
};

  function initMap() {

    var mapOptions = {
      zoom: 15,
      center: {lat: 42.91255, lng: -112.466269},
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