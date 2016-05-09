var map;
var infowindow = new google.maps.InfoWindow;
var marker;
  var locations = [{
      "title": "Idaho Central Credit Union - HQ",
      "lat": 42.914059,
      "lng": -112.462819,
      "streetAddress": "4400 Central Way",
      "website": "https://www.iccu.com/"
      },
      {
      "title": "DL Evans Bank",
      "lat": 42.907624,
      "lng": -112.465672,
      "streetAddress": "4080 Yellowstone Ave",
      "website": "https://www.dlevans.com/"
      },
      {
      "title": "Wells Fargo",
      "lat": 42.909370,
      "lng": -112.466802,
      "streetAddress": "4195 Yellowstone Ave",
      "website": "https://www.wellsfargo.com/"
      },
      {
      "title": "Idaho Central Credit Union - Chubbuck Branch",
      "lat": 42.915882,
      "lng": -112.466823,
      "streetAddress": "4537 Yellowstone Ave",
      "website": "https://www.iccu.com/"
      },
      {
      "title": "Mountain America Credit Union",
      "lat": 42.911453,
      "lng": -112.464667,
      "streetAddress": "152 Bullock St",
      "cityAddress": "Washington, DC 20500",
      "website": "https://www.macu.com"
      },
      {
      "title": "Idaho State University Credit Union",
      "lat": 42.9227200,
      "lng": -112.4658335,
      "streetAddress": "4914 Yellowstone Ave",
      "website": "https://www.isucu.org/"
      },
      {
      "title": "Advantage Plus Credit Union",
      "lat": 42.920881,
      "lng": -112.468284,
      "streetAddress": "150 W Chubbuck Rd",
      "website": "https://advantagepluscreditunion.com"
      },
      {
      "title": "Pocatello Railroad Federal Credit",
      "lat": 42.918957,
      "lng": -112.465726,
      "streetAddress": "4708 Yellowstone Ave",
      "website": "https://railswestcu.org"
      }];

var PlaceConstructor = function(dataObj){
  this.name = ko.observable(dataObj.title);
  var banks = ko.oservableArray(

  )
}

var viewModel = function vmInit() {
    "use strict";

    var banks = ko.observableArray([
        //var location = function (title,latitude,longitude,streetAddress,website)
        new Location("Idaho Central Credit Union - HQ", 42.914059, -112.462819, "4400 Central Way", "https://www.iccu.com/"),
        new Location("DL Evans Bank", 42.907624, -112.465672, "4080 Yellowstone Ave", "https://www.dlevans.com/"),
        new Location("Wells Fargo", 42.909370, -112.466802, "4195 Yellowstone Ave", "https://www.wellsfargo.com/"),
        new Location("Idaho Central Credit Union - Chubbuck Branch", 42.915882, -112.466823, "4537 Yellowstone Ave", "https://www.iccu.com/"),
        new Location("Mountain America Credit Union", 42.911453, -112.464667,  "152 Bullock St", "https://www.macu.com"),
        new Location("Idaho State University Credit Union", 42.9227200, -112.4658335, "4914 Yellowstone Ave", "https://www.isucu.org/"),
        new Location("Advantage Plus Credit Union", 42.920881, -112.468284, "150 W Chubbuck Rd", "https://advantagepluscreditunion.com"),
        new Location("Pocatello Railroad Federal Credit", 42.918957, -112.465726, "4708 Yellowstone Ave", "https://railswestcu.org")
    ]);

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
            var fields = ["title"]; //we can filter several properties if needed
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

  function makeMarkers() {
      for(var i = 0; i < banks.length; i++) {
            marker = new google.maps.Marker({
            position: {lat: banks[i].lat, lng: banks[i].lng},
            map: map,
            title: banks[i].title,
          });

      google.maps.event.addListener(marker, "click", (function(marker, i) {
            return function() {
              contentString = "<h3>" + banks[i].title + "<h3>" + "<h4>" + banks[i].streetAddress + "</h4>" + "<a href=" + "\"" +locations[i].website + "\"" + "target=" + "\"" + "_blank" + "\"" + ">" + locations[i].website + "</a>";
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