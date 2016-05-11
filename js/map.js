var map;
var infowindow = new google.maps.InfoWindow;
var marker;

//revealing module pattern
var banks = ko.observableArray([
    //var location = function (koTitle, title,latitude,longitude,streetAddress,website, setVisible)
    new Location("Idaho Central Credit Union - HQ", "Idaho Central Credit Union - HQ", 42.914059, -112.462819, "4400 Central Way", "https://www.iccu.com/", true),
    new Location("DL Evans Bank", "DL Evans Bank", 42.907624, -112.465672, "4080 Yellowstone Ave", "https://www.dlevans.com/"),
    new Location("Wells Fargo", "Wells Fargo", 42.909370, -112.466802, "4195 Yellowstone Ave", "https://www.wellsfargo.com/"),
    new Location("Idaho Central Credit Union - Chubbuck Branch", "Idaho Central Credit Union - Chubbuck Branch", 42.915882, -112.466823, "4537 Yellowstone Ave", "https://www.iccu.com/", true),
    new Location("Mountain America Credit Union", "Mountain America Credit Union", 42.911453, -112.464667,  "152 Bullock St", "https://www.macu.com", true),
    new Location("Idaho State University Credit Union", "Idaho State University Credit Union", 42.9227200, -112.4658335, "4914 Yellowstone Ave", "https://www.isucu.org/", true),
    new Location("Advantage Plus Credit Union", "Advantage Plus Credit Union", 42.920881, -112.468284, "150 W Chubbuck Rd", "https://advantagepluscreditunion.com", true),
    new Location("Pocatello Railroad Federal Credit", "Pocatello Railroad Federal Credit", 42.918957, -112.465726, "4708 Yellowstone Ave", "https://railswestcu.org", true)
]);

//display or hide list
function toggleList() {
  var listDisplay = document.getElementById("search");
  listDisplay.style.display = (listDisplay.style.display != "none" ? "none" : "" );
  var hideList_Message = document.getElementById("hideList");
  hideList_Message.innerHTML = (hideList_Message.innerHTML != "Hide List" ? "Hide List" : "Show List");
};

document.getElementById("hideList").addEventListener("click", toggleList);

//var filtBanks = ko.observableArray([]);

var viewModel = function vmInit() {
    "use strict";

    var searchTerm = ko.observable("");

    var filteredBanks = ko.computed(function () {
        var filter = searchTerm().toLowerCase();
        if (!filter) {
          makeMarkers(banks());
            return banks();
        } else {

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
        makeMarkers(filtered);
        return filtered;
    });


    return {
        searchTerm: searchTerm,
        banks: filteredBanks,
    };
};

ko.applyBindings(viewModel);
  banks.allMarkers = [];
  var banks_allMarkers = banks.allMarkers;
//map markers
function makeMarkers(filtered) {
  if (banks_allMarkers) {
    banks_allMarkers.forEach(function(marker){
    marker.setVisible(false)
  })

  banks_allMarkers = [];
  if (!filtered) {
    filtered = banks();
  }
  console.log('banks().length :'+ filtered.length);
  for(var i = 0; i < filtered.length; i++) {
    marker = new google.maps.Marker({
    position: {lat: filtered[i].latitude(), lng: filtered[i].longitude()},
    map: map,
    title: filtered[i].title,
  });

  banks_allMarkers.push(marker); //push markers because Google Maps does not support this feature

  google.maps.event.addListener(banks_allMarkers[i], "click", (function(banks_allMarkers, i) {
    return function() {
      contentString = "<h3>" + filtered[i].title + "<h3>" + "<h4>" + filtered[i].streetAddress + "</h4>" + "<a href=" + "\"" +filtered[i].website + "\"" + "target=" + "\"" + "_blank" + "\"" + ">" + filtered[i].website + "</a>";
      infowindow.setContent(contentString);
      infowindow.open(map, banks_allMarkers[i]);

      if (banks_allMarkers[i].getAnimation() !== null) {
       banks_allMarkers[i].setAnimation(null);
       infowindow.close(map, banks_allMarkers[i]);
      } else  {
        banks_allMarkers[i].setAnimation(google.maps.Animation.BOUNCE);
      }

      }
    })(banks_allMarkers, i));
  };
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