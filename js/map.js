var map;
var infowindow = new google.maps.InfoWindow;
var marker;

var banks = ko.observableArray([
    //var location = function (ko.title, title,latitude,longitude,streetAddress,website)
    new Location("Idaho Central Credit Union - HQ", "Idaho Central Credit Union - HQ", 42.914059, -112.462819, "4400 Central Way", "https://www.iccu.com/"),
    new Location("DL Evans Bank", "DL Evans Bank", 42.907624, -112.465672, "4080 Yellowstone Ave", "https://www.dlevans.com/"),
    new Location("Wells Fargo", "Wells Fargo", 42.909370, -112.466802, "4195 Yellowstone Ave", "https://www.wellsfargo.com/"),
    new Location("Idaho Central Credit Union - Chubbuck Branch", "Idaho Central Credit Union - Chubbuck Branch", 42.915882, -112.466823, "4537 Yellowstone Ave", "https://www.iccu.com/"),
    new Location("Mountain America Credit Union", "Mountain America Credit Union", 42.911453, -112.464667,  "152 Bullock St", "https://www.macu.com"),
    new Location("Idaho State University Credit Union", "Idaho State University Credit Union", 42.9227200, -112.4658335, "4914 Yellowstone Ave", "https://www.isucu.org/"),
    new Location("Advantage Plus Credit Union", "Advantage Plus Credit Union", 42.920881, -112.468284, "150 W Chubbuck Rd", "https://advantagepluscreditunion.com"),
    new Location("Pocatello Railroad Federal Credit", "Pocatello Railroad Federal Credit", 42.918957, -112.465726, "4708 Yellowstone Ave", "https://railswestcu.org")
]);

function makeMarkers() {
    for(var i = 0; i < banks().length; i++) {
          marker = new google.maps.Marker({
          position: {lat: banks()[i].latitude, lng: banks()[i].longitude},
          map: map,
          title: banks()[i].title,
        });

    google.maps.event.addListener(marker, "click", (function(marker, i) {
          return function() {
            contentString = "<h3>" + banks()[i].title + "<h3>" + "<h4>" + banks()[i].streetAddress + "</h4>" + "<a href=" + "\"" +banks()[i].website + "\"" + "target=" + "\"" + "_blank" + "\"" + ">" + banks()[i].website + "</a>";
              infowindow.setContent(contentString);
              infowindow.open(map, marker);

        if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
        infowindow.close(map, marker);
        } else  {
          marker.setAnimation(google.maps.Animation.BOUNCE);
        }

        }
      })(marker, i));
    }
};

var viewModel = function vmInit() {
    "use strict";


    var searchTerm = ko.observable("");

    var filteredBanks = ko.computed(function () {
        //if banks is empty return empty array
        if (!banks()) {
            return [];
        }
        var filter = searchTerm().toLowerCase();
        //if filter is empty return all the catalog
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